# TellME7 Android

The Android app opens the bundled simulator in a fullscreen WebView. It works offline and has no network permission.

Set `sdk.dir` in `local.properties` (or `ANDROID_HOME`) and use a JDK compatible with the Android Gradle plugin. From this directory:

```sh
./gradlew assembleDebug
```

The installable APK is `app/build/outputs/apk/debug/app-debug.apk`. Each build copies the current root `index.html`, `css/`, `js/`, `images/`, and `audio/` into the APK. Install with `adb install -r app/build/outputs/apk/debug/app-debug.apk`.

A ready-to-install debug build is also committed as `TellME7-ATM.apk` in this directory.
