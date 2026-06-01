# Flutter CLI Cheatsheet

## Environment

```bash
flutter --version
flutter doctor -v
flutter devices
flutter emulators
flutter config --list
```

## Dependencies And Analysis

```bash
flutter pub get
flutter pub outdated
dart format --output=none --set-exit-if-changed .
flutter analyze
flutter test
```

## Run Modes

```bash
flutter run -d <device-id>
flutter run --profile -d <device-id>
flutter run --release -d <device-id>
```

Use debug for functional iteration, profile for performance collection, and release for final
release-like smoke checks where the target supports it.

## Interactive flutter run Keys

| Key | Action |
| --- | --- |
| `r` | Hot reload |
| `R` | Hot restart |
| `i` | Toggle widget inspector |
| `P` | Toggle performance overlay |
| `d` | Detach and leave app running |
| `q` | Quit |

## Builds

```bash
flutter build apk
flutter build appbundle
flutter build ios --simulator
flutter build ipa
flutter build macos
flutter build web
```

## Native Logs

```bash
adb devices -l
adb -s <serial> logcat
xcrun simctl list devices
xcrun simctl spawn <udid> log stream --level debug
```

Use native logs only when active `flutter run` output and DevTools are insufficient.
