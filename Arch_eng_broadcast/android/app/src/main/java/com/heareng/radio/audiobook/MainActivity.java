package com.heareng.radio.audiobook;

import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.webkit.JavascriptInterface;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    private static MainActivity instance;
    private Handler mainHandler = new Handler(Looper.getMainLooper());

    public static MainActivity getInstance() { return instance; }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        instance = this;

        if (this.bridge != null && this.bridge.getWebView() != null) {
            try {
                this.bridge.getWebView().getSettings().setMediaPlaybackRequiresUserGesture(false);
                // cache preserved for instant 0ms startup
            } catch(Exception e) {}
            this.bridge.getWebView().addJavascriptInterface(this, "AndroidNativeTTS");
        }

        HearEngRadioService.startRadioService(this, "Hear Eng Radio", "24시간 영어 방송");
    }

    @JavascriptInterface
    public int getCurrentServiceIndex() {
        HearEngRadioService svc = HearEngRadioService.getInstance();
        if (svc != null) {
            return svc.getCurrentServiceIndex();
        }
        return -1;
    }

    @JavascriptInterface
    public int getNativeServiceIndex() {
        return getCurrentServiceIndex();
    }

    @JavascriptInterface
    public void setNativeServiceIndex(final int index) {
        mainHandler.post(new Runnable() {
            @Override
            public void run() {
                HearEngRadioService svc = HearEngRadioService.getInstance();
                if (svc != null) {
                    svc.setServiceCardIndex(index);
                }
            }
        });
    }

    @JavascriptInterface
    public void startNativePlaylist(final String playlistJsonStr, final int startIndex, final int tRepeats, final int eRepeats) {
        mainHandler.post(new Runnable() {
            @Override
            public void run() {
                HearEngRadioService svc = HearEngRadioService.getInstance();
                if (svc != null) {
                    svc.startNativePlaylistQueue(playlistJsonStr, startIndex, tRepeats, eRepeats);
                } else {
                    HearEngRadioService.startRadioService(MainActivity.this, "Hear Eng Radio", "24시간 영어 방송");
                    mainHandler.postDelayed(new Runnable() {
                        @Override
                        public void run() {
                            HearEngRadioService s2 = HearEngRadioService.getInstance();
                            if (s2 != null) s2.startNativePlaylistQueue(playlistJsonStr, startIndex, tRepeats, eRepeats);
                        }
                    }, 300);
                }
            }
        });
    }

    @JavascriptInterface
    public void pauseNativePlaylist() {
        pauseNativePlaylistQueue();
    }

    @JavascriptInterface
    public void pauseNativePlaylistQueue() {
        mainHandler.post(new Runnable() {
            @Override
            public void run() {
                HearEngRadioService svc = HearEngRadioService.getInstance();
                if (svc != null) svc.pauseServicePlaylist();
            }
        });
    }

    @JavascriptInterface
    public void stopNativePlaylist() {
        pauseNativePlaylistQueue();
    }

    @JavascriptInterface
    public void stop() {
        pauseNativePlaylistQueue();
    }

    @JavascriptInterface
    public void resumeNativePlaylist() {
        resumeNativePlaylistQueue();
    }

    @JavascriptInterface
    public void resumeNativePlaylistQueue() {
        mainHandler.post(new Runnable() {
            @Override
            public void run() {
                HearEngRadioService svc = HearEngRadioService.getInstance();
                if (svc != null) svc.resumeServicePlaylist();
            }
        });
    }

    @Override
    public void onResume() {
        super.onResume();
        syncNativeStateToWebView();
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        if (hasFocus) {
            syncNativeStateToWebView();
        }
    }

        private void syncNativeStateToWebView() {
        if (this.bridge != null && this.bridge.getWebView() != null) {
            this.bridge.getWebView().post(new Runnable() {
                @Override
                public void run() {
                    HearEngRadioService svc = HearEngRadioService.getInstance();
                    if (svc != null) {
                        int idx = svc.getCurrentServiceIndex();
                        if (idx >= 0) {
                            bridge.getWebView().evaluateJavascript(
                                "if(typeof window.forceSyncMainCard === 'function') window.forceSyncMainCard(" + idx + ");", null);
                        }
                    }
                }
            });
        }
    }
}
