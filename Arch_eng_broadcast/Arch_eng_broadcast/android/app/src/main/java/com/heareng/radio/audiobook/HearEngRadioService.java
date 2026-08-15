package com.heareng.radio.audiobook;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.content.pm.ServiceInfo;
import android.graphics.BitmapFactory;
import android.media.AudioAttributes;
import android.media.AudioFormat;
import android.media.AudioFocusRequest;
import android.media.AudioManager;
import android.media.AudioTrack;
import android.os.Build;
import android.os.Bundle;
import android.os.IBinder;
import android.os.PowerManager;
import android.speech.tts.TextToSpeech;
import android.speech.tts.UtteranceProgressListener;
import android.support.v4.media.MediaMetadataCompat;
import android.support.v4.media.session.MediaSessionCompat;
import android.support.v4.media.session.PlaybackStateCompat;
import androidx.core.app.NotificationCompat;
import androidx.media.app.NotificationCompat.MediaStyle;
import org.json.JSONArray;
import org.json.JSONObject;
import java.util.Locale;

public class HearEngRadioService extends Service {
    public static final String CHANNEL_ID = "HearEngRadioMediaChannel";
    public static final int NOTIFICATION_ID = 888;
    private static HearEngRadioService instance;

    public static HearEngRadioService getInstance() { return instance; }
    public int getCurrentServiceIndex() { return currentCardIndex; }
    public boolean isServicePlaying() { return isServicePlaying; }
    public void setServiceCardIndex(int index) {
        if (nativePlaylist != null && index >= 0 && index < nativePlaylist.length()) {
            this.currentCardIndex = index;
            this.currentRepeatStep = 0;
        }
    }

    private TextToSpeech serviceTts;
    private boolean isServiceTtsReady = false;
    private JSONArray nativePlaylist = new JSONArray();
    private int currentCardIndex = 0;
    private int currentRepeatStep = 0;
    private int targetRepeats = 3;
    private int expRepeats = 1;
    private boolean isServicePlaying = false;
    private android.os.Handler serviceHandler = new android.os.Handler(android.os.Looper.getMainLooper());
    private PowerManager.WakeLock serviceWakeLock;
    private Runnable ttsWatchdogRunnable;
    private MediaSessionCompat mediaSession;
    private AudioTrack silentAudioTrack;
    private boolean isSilentTrackRunning = false;
    private Thread audioTrackThread;

    @Override public IBinder onBind(Intent intent) { return null; }

    @Override
    public void onCreate() {
        super.onCreate();
        instance = this;
        try {
            PowerManager pm = (PowerManager) getSystemService(Context.POWER_SERVICE);
            if (pm != null) {
                serviceWakeLock = pm.newWakeLock(PowerManager.PARTIAL_WAKE_LOCK, "HearEngRadio::WakeLock");
                serviceWakeLock.acquire();
            }
        } catch (Exception e) { e.printStackTrace(); }
        createNotificationChannel();
        initMediaSession();
        requestPhysicalAudioFocus();
        updateMediaMetadata("Hear Eng Radio", "24시간 영어 학습 방송 준비 중...", 0, 100);
        startSilentAudioKeepAlive();
        initServiceTts();
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        updateMediaMetadata("Hear Eng Radio", "24시간 영어 학습 방송 중", 0, 100);
        return START_STICKY;
    }

    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel ch = new NotificationChannel(CHANNEL_ID, "Hear Eng 24시간 라디오", NotificationManager.IMPORTANCE_MIN);
            ch.setSound(null, null);
            ch.enableVibration(false);
            NotificationManager m = getSystemService(NotificationManager.class);
            if (m != null) m.createNotificationChannel(ch);
        }
    }

    private void initMediaSession() {
        mediaSession = new MediaSessionCompat(this, "HearEngMediaSession");
        mediaSession.setFlags(MediaSessionCompat.FLAG_HANDLES_MEDIA_BUTTONS | MediaSessionCompat.FLAG_HANDLES_TRANSPORT_CONTROLS);
        mediaSession.setPlaybackState(new PlaybackStateCompat.Builder()
            .setActions(PlaybackStateCompat.ACTION_PLAY | PlaybackStateCompat.ACTION_PAUSE |
                PlaybackStateCompat.ACTION_SKIP_TO_NEXT | PlaybackStateCompat.ACTION_SKIP_TO_PREVIOUS |
                PlaybackStateCompat.ACTION_PLAY_PAUSE)
            .setState(PlaybackStateCompat.STATE_PLAYING, 0, 1.0f).build());
        mediaSession.setCallback(new MediaSessionCompat.Callback() {
            @Override public void onPlay() { resumeServicePlaylist(); }
            @Override public void onPause() { pauseServicePlaylist(); }
            @Override public void onSkipToNext() { advanceServiceCard(); }
            @Override public void onSkipToPrevious() { prevServiceCard(); }
        });
        mediaSession.setActive(true);
    }

    private void initServiceTts() {
        if (serviceTts != null) return;
        serviceTts = new TextToSpeech(this, new TextToSpeech.OnInitListener() {
            @Override
            public void onInit(int status) {
                if (status == TextToSpeech.SUCCESS) {
                    isServiceTtsReady = true;
                    serviceTts.setLanguage(Locale.US);
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
                        AudioAttributes aa = new AudioAttributes.Builder()
                            .setUsage(AudioAttributes.USAGE_MEDIA)
                            .setContentType(AudioAttributes.CONTENT_TYPE_SPEECH)
                            .build();
                        serviceTts.setAudioAttributes(aa);
                    }
                    serviceTts.setOnUtteranceProgressListener(new UtteranceProgressListener() {
                        @Override public void onStart(String uid) {}
                        @Override
                        public void onDone(String uid) {
                            if (ttsWatchdogRunnable != null) serviceHandler.removeCallbacks(ttsWatchdogRunnable);
                            if (isServicePlaying) {
                                serviceHandler.post(new Runnable() {
                                    @Override public void run() { handleServiceSpeechFinished(); }
                                });
                            }
                        }
                        @Override
                        public void onError(String uid) {
                            if (ttsWatchdogRunnable != null) serviceHandler.removeCallbacks(ttsWatchdogRunnable);
                            serviceHandler.postDelayed(new Runnable() {
                                @Override public void run() {
                                    if (isServicePlaying) playCurrentServiceStep();
                                }
                            }, 300);
                        }
                    });
                    if (isServicePlaying && nativePlaylist != null && nativePlaylist.length() > 0) {
                        serviceHandler.postDelayed(new Runnable() {
                            @Override public void run() { playCurrentServiceStep(); }
                        }, 200);
                    }
                }
            }
        });
    }

    private void startSilentAudioKeepAlive() {
        if (isSilentTrackRunning) return;
        isSilentTrackRunning = true;
        audioTrackThread = new Thread(new Runnable() {
            @Override public void run() {
                try {
                    int sRate = 44100;
                    int minBuf = AudioTrack.getMinBufferSize(sRate, AudioFormat.CHANNEL_OUT_STEREO, AudioFormat.ENCODING_PCM_16BIT);
                    int bufSize = Math.max(minBuf, 4096);
                    AudioAttributes attrs = new AudioAttributes.Builder()
                        .setUsage(AudioAttributes.USAGE_MEDIA)
                        .setContentType(AudioAttributes.CONTENT_TYPE_MUSIC).build();
                    AudioFormat fmt = new AudioFormat.Builder()
                        .setEncoding(AudioFormat.ENCODING_PCM_16BIT)
                        .setSampleRate(sRate)
                        .setChannelMask(AudioFormat.CHANNEL_OUT_STEREO).build();
                    silentAudioTrack = new AudioTrack(attrs, fmt, bufSize, AudioTrack.MODE_STREAM, AudioManager.AUDIO_SESSION_ID_GENERATE);
                    silentAudioTrack.play();
                    byte[] buf = new byte[bufSize];
                    while (isSilentTrackRunning) { silentAudioTrack.write(buf, 0, buf.length); Thread.sleep(100); }
                } catch (Exception e) { e.printStackTrace(); }
            }
        });
        audioTrackThread.setDaemon(true);
        audioTrackThread.start();
    }

    public void startNativePlaylistQueue(String playlistJsonStr, int startIndex, int tRepeats, int eRepeats) {
        try {
            nativePlaylist = new JSONArray(playlistJsonStr);
            currentCardIndex = (startIndex >= 0 && startIndex < nativePlaylist.length()) ? startIndex : 0;
            targetRepeats = tRepeats > 0 ? tRepeats : 3;
            expRepeats = eRepeats >= 0 ? eRepeats : 1;
            isServicePlaying = true;
            currentRepeatStep = 0;
            if (serviceHandler != null) serviceHandler.removeCallbacksAndMessages(null);
            playCurrentServiceStep();
        } catch (Exception e) { e.printStackTrace(); }
    }

    private void requestPhysicalAudioFocus() {
        try {
            AudioManager am = (AudioManager) getSystemService(Context.AUDIO_SERVICE);
            if (am == null) return;
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                am.requestAudioFocus(new AudioFocusRequest.Builder(AudioManager.AUDIOFOCUS_GAIN)
                    .setAudioAttributes(new AudioAttributes.Builder()
                        .setUsage(AudioAttributes.USAGE_MEDIA)
                        .setContentType(AudioAttributes.CONTENT_TYPE_MUSIC).build())
                    .setAcceptsDelayedFocusGain(true)
                    .setWillPauseWhenDucked(false)
                    .setOnAudioFocusChangeListener(new AudioManager.OnAudioFocusChangeListener() {
                        @Override public void onAudioFocusChange(int f) {}
                    }).build());
            } else {
                am.requestAudioFocus(null, AudioManager.STREAM_MUSIC, AudioManager.AUDIOFOCUS_GAIN);
            }
        } catch (Exception e) { e.printStackTrace(); }
    }

    private String cleanTextForTts(String text) {
        if (text == null) return "";
        String cleaned = text.replace("~", " 뭐뭐 ");
        cleaned = cleaned.replaceAll("[:;\\^\\*#@_]", " ");
        cleaned = cleaned.replaceAll("\\s+", " ").trim();
        return cleaned;
    }

    public void playCurrentServiceStep() {
        requestPhysicalAudioFocus();
        if (!isServicePlaying || nativePlaylist == null || nativePlaylist.length() == 0) return;
        try {
            if (currentCardIndex >= nativePlaylist.length()) currentCardIndex = 0;
            if (currentCardIndex < 0) currentCardIndex = 0;
            JSONObject card = nativePlaylist.getJSONObject(currentCardIndex);
            String target = card.optString("target", "");
            String translation = card.optString("translation", "");
            boolean isTargetTurn = (currentRepeatStep < targetRepeats);
            String rawText = isTargetTurn ? target : translation;
            String textToSpeak = cleanTextForTts(rawText);
            if (textToSpeak == null || textToSpeak.trim().isEmpty()) { handleServiceSpeechFinished(); return; }

            String notifyTitle = "[" + (currentCardIndex + 1) + " / " + nativePlaylist.length() + "] " + target;
            String notifySub = (translation != null && !translation.isEmpty()) ? translation : "Hear Eng Radio";
            updateMediaMetadata(notifyTitle, notifySub,
                (long)(currentCardIndex + 1) * 1000L, (long)nativePlaylist.length() * 1000L);
            
            // Sync Webview Card UI Text immediately
            final int idx = currentCardIndex;
            MainActivity main = MainActivity.getInstance();
            if (main != null && main.getBridge() != null && main.getBridge().getWebView() != null) {
                main.getBridge().getWebView().post(new Runnable() {
                    @Override public void run() {
                        main.getBridge().getWebView().evaluateJavascript(
                            "if(typeof window.onNativeCardIndexChanged === 'function') window.onNativeCardIndexChanged(" + idx + ");" +
                            "else if(typeof window.forceSyncMainCard === 'function') window.forceSyncMainCard(" + idx + ");", null);
                    }
                });
            }

            if (serviceTts != null && isServiceTtsReady) {
                if (isTargetTurn) {
                    int res = serviceTts.setLanguage(Locale.US);
                    if (res == TextToSpeech.LANG_MISSING_DATA || res == TextToSpeech.LANG_NOT_SUPPORTED) {
                        serviceTts.setLanguage(Locale.ENGLISH);
                    }
                } else {
                    int res = serviceTts.setLanguage(Locale.KOREA);
                    if (res == TextToSpeech.LANG_MISSING_DATA || res == TextToSpeech.LANG_NOT_SUPPORTED) {
                        serviceTts.setLanguage(Locale.KOREAN);
                    }
                }

                serviceTts.setPitch(1.0f);
                serviceTts.setSpeechRate(0.95f);

                Bundle params = new Bundle();
                params.putFloat(TextToSpeech.Engine.KEY_PARAM_VOLUME, 1.0f);
                params.putInt(TextToSpeech.Engine.KEY_PARAM_STREAM, AudioManager.STREAM_MUSIC);

                // Watchdog Timer in case TTS engine callback stalls
                long speechEstMs = Math.max(2200L, textToSpeak.length() * 140L);
                if (ttsWatchdogRunnable != null) serviceHandler.removeCallbacks(ttsWatchdogRunnable);
                ttsWatchdogRunnable = new Runnable() {
                    @Override public void run() {
                        if (isServicePlaying) {
                            handleServiceSpeechFinished();
                        }
                    }
                };
                serviceHandler.postDelayed(ttsWatchdogRunnable, speechEstMs);

                int result = serviceTts.speak(textToSpeak, TextToSpeech.QUEUE_FLUSH, params,
                    "HearEngServiceTTS_" + System.currentTimeMillis());

                if (result != TextToSpeech.SUCCESS) {
                    if (ttsWatchdogRunnable != null) serviceHandler.removeCallbacks(ttsWatchdogRunnable);
                    serviceHandler.postDelayed(new Runnable() {
                        @Override public void run() { if (isServicePlaying) handleServiceSpeechFinished(); }
                    }, 500);
                }
            } else {
                initServiceTts();
                serviceHandler.postDelayed(new Runnable() {
                    @Override public void run() { if (isServicePlaying) playCurrentServiceStep(); }
                }, 300);
            }
        } catch (Exception e) { e.printStackTrace(); }
    }

    private void handleServiceSpeechFinished() {
        if (!isServicePlaying) return;
        currentRepeatStep++;
        int totalSteps = targetRepeats + expRepeats;
        try {
            String tr = nativePlaylist.getJSONObject(currentCardIndex).optString("translation", "");
            if (tr == null || tr.trim().isEmpty()) totalSteps = targetRepeats;
        } catch (Exception e) {}
        if (currentRepeatStep < totalSteps) {
            serviceHandler.postDelayed(new Runnable() {
                @Override public void run() { if (isServicePlaying) playCurrentServiceStep(); }
            }, 400);
        } else {
            serviceHandler.postDelayed(new Runnable() {
                @Override public void run() { if (isServicePlaying) advanceServiceCard(); }
            }, 800);
        }
    }

    public void advanceServiceCard() {
        if (!isServicePlaying) return;
        currentRepeatStep = 0;
        currentCardIndex++;
        if (currentCardIndex >= nativePlaylist.length()) {
            currentCardIndex = 0;
            MainActivity main = MainActivity.getInstance();
            if (main != null && main.getBridge() != null && main.getBridge().getWebView() != null) {
                main.getBridge().getWebView().post(new Runnable() {
                    @Override public void run() {
                        main.getBridge().getWebView().evaluateJavascript(
                            "if(typeof window.onNativePlaylistEnded === 'function') window.onNativePlaylistEnded();", null);
                    }
                });
            }
        }
        playCurrentServiceStep();
    }

    public void prevServiceCard() {
        currentRepeatStep = 0;
        currentCardIndex--;
        if (currentCardIndex < 0 && nativePlaylist != null && nativePlaylist.length() > 0)
            currentCardIndex = nativePlaylist.length() - 1;
        playCurrentServiceStep();
    }

    public void pauseServicePlaylist() {
        isServicePlaying = false;
        if (ttsWatchdogRunnable != null) serviceHandler.removeCallbacks(ttsWatchdogRunnable);
        if (serviceHandler != null) {
            serviceHandler.removeCallbacksAndMessages(null);
        }
        if (serviceTts != null) {
            try { serviceTts.stop(); } catch (Exception e) {}
        }
        if (mediaSession != null) {
            mediaSession.setPlaybackState(new PlaybackStateCompat.Builder()
                .setActions(PlaybackStateCompat.ACTION_PLAY | PlaybackStateCompat.ACTION_PAUSE |
                    PlaybackStateCompat.ACTION_SKIP_TO_NEXT | PlaybackStateCompat.ACTION_SKIP_TO_PREVIOUS |
                    PlaybackStateCompat.ACTION_PLAY_PAUSE)
                .setState(PlaybackStateCompat.STATE_PAUSED, 0, 1.0f).build());
        }
        stopForeground(true);
    }

    public void resumeServicePlaylist() {
        isServicePlaying = true;
        if (mediaSession != null) {
            mediaSession.setActive(true);
            mediaSession.setPlaybackState(new PlaybackStateCompat.Builder()
                .setActions(PlaybackStateCompat.ACTION_PLAY | PlaybackStateCompat.ACTION_PAUSE |
                    PlaybackStateCompat.ACTION_SKIP_TO_NEXT | PlaybackStateCompat.ACTION_SKIP_TO_PREVIOUS |
                    PlaybackStateCompat.ACTION_PLAY_PAUSE)
                .setState(PlaybackStateCompat.STATE_PLAYING, 0, 1.0f).build());
        }
        playCurrentServiceStep();
    }

    public static void startRadioService(Context ctx, String title, String sub) {
        try {
            Intent intent = new Intent(ctx, HearEngRadioService.class);
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                ctx.startForegroundService(intent);
            } else {
                ctx.startService(intent);
            }
        } catch (Exception e) { e.printStackTrace(); }
    }

    private void updateMediaMetadata(String title, String subtitle, long currentMs, long totalMs) {
        if (mediaSession == null) return;
        try {
            mediaSession.setMetadata(new MediaMetadataCompat.Builder()
                .putString(MediaMetadataCompat.METADATA_KEY_TITLE, title)
                .putString(MediaMetadataCompat.METADATA_KEY_ARTIST, subtitle)
                .putString(MediaMetadataCompat.METADATA_KEY_ALBUM, "HearEng 24시간 라디오 방송")
                .putBitmap(MediaMetadataCompat.METADATA_KEY_ALBUM_ART,
                    BitmapFactory.decodeResource(getResources(), R.mipmap.ic_launcher))
                .putLong(MediaMetadataCompat.METADATA_KEY_DURATION, totalMs)
                .build());

            mediaSession.setPlaybackState(new PlaybackStateCompat.Builder()
                .setActions(PlaybackStateCompat.ACTION_PLAY | PlaybackStateCompat.ACTION_PAUSE |
                    PlaybackStateCompat.ACTION_SKIP_TO_NEXT | PlaybackStateCompat.ACTION_SKIP_TO_PREVIOUS |
                    PlaybackStateCompat.ACTION_PLAY_PAUSE)
                .setState(PlaybackStateCompat.STATE_PLAYING, currentMs, 1.0f).build());

            Intent intent = new Intent(this, MainActivity.class);
            intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP | Intent.FLAG_ACTIVITY_CLEAR_TOP);
            PendingIntent pi = PendingIntent.getActivity(this, 0, intent,
                PendingIntent.FLAG_UPDATE_CURRENT | (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M ? PendingIntent.FLAG_IMMUTABLE : 0));

            Notification n = new NotificationCompat.Builder(this, CHANNEL_ID)
                .setSmallIcon(R.mipmap.ic_launcher)
                .setLargeIcon(BitmapFactory.decodeResource(getResources(), R.mipmap.ic_launcher))
                .setContentTitle(title)
                .setContentText(subtitle)
                .setContentIntent(pi)
                .setOngoing(true)
                .setVisibility(NotificationCompat.VISIBILITY_PUBLIC)
                .setStyle(new MediaStyle()
                    .setMediaSession(mediaSession.getSessionToken())
                    .setShowActionsInCompactView(0, 1, 2))
                .setPriority(NotificationCompat.PRIORITY_MAX)
                .setCategory(NotificationCompat.CATEGORY_SERVICE)
                .build();

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                startForeground(NOTIFICATION_ID, n, ServiceInfo.FOREGROUND_SERVICE_TYPE_MEDIA_PLAYBACK);
            } else {
                startForeground(NOTIFICATION_ID, n);
            }
        } catch (Exception e) { e.printStackTrace(); }
    }

    @Override
    public void onDestroy() {
        isServicePlaying = false;
        isSilentTrackRunning = false;
        if (ttsWatchdogRunnable != null) serviceHandler.removeCallbacks(ttsWatchdogRunnable);
        if (serviceHandler != null) serviceHandler.removeCallbacksAndMessages(null);
        if (silentAudioTrack != null) {
            try { silentAudioTrack.stop(); silentAudioTrack.release(); } catch (Exception e) {}
        }
        if (serviceTts != null) {
            try { serviceTts.stop(); serviceTts.shutdown(); } catch (Exception e) {}
        }
        if (mediaSession != null) {
            try { mediaSession.setActive(false); mediaSession.release(); } catch (Exception e) {}
        }
        if (serviceWakeLock != null && serviceWakeLock.isHeld()) {
            try { serviceWakeLock.release(); } catch (Exception e) {}
        }
        super.onDestroy();
    }
}
