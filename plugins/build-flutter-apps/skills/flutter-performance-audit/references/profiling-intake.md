# Flutter Profiling Intake

Collect:

- exact flow and start-stop points
- target device or emulator, OS version, and refresh rate
- Flutter SDK version
- debug, profile, or release mode
- renderer where relevant
- reproduction frequency
- affected platforms
- recent changes
- existing DevTools exports, screenshots, or logs

## Choose Evidence

| Symptom | First evidence |
| --- | --- |
| Janky animation or scrolling | DevTools Flutter Frames and Timeline in profile mode |
| Dart CPU spike | DevTools CPU profiler |
| Large binary | DevTools App Size tool |
| Widget layout issue | Flutter Inspector |
| Memory growth | DevTools Memory view and memory-leaks skill |
| Flutter web performance | Browser performance tools and Flutter web guidance |

Almost all representative mobile performance work should use profile mode on a physical device.
