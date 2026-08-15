# ProGuard & R8 Optimization Rules for HearEng (Capacitor + AdMob)

# Preserve Javascript Interfaces & WebKit
-keepattributes JavascriptInterface
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

# Preserve Capacitor Native Plugins & Bridge
-keep class com.getcapacitor.** { *; }
-keep class com.capacitor.** { *; }
-keep class * extends com.getcapacitor.Plugin { *; }

# Preserve Google AdMob Play Services
-keep class com.google.android.gms.ads.** { *; }
-keep class com.google.ads.** { *; }

# Preserve Native TTS & Foreground Audio Service
-keep class android.speech.tts.** { *; }
-keep class com.heareng.radio.audiobook.HearEngRadioService { *; }

# Keep Line Numbers for Crash Reporting
-keepattributes SourceFile,LineNumberTable
-renamesourcefileattribute SourceFile
