# DevTools Capture Workflow

Use profile mode for performance evidence. Debug mode includes development
overhead and is not representative of release behavior.

## Capture

1. Select a physical mobile device when validating mobile performance.
2. Start the app with `flutter run --profile -d <device-id>`.
3. Open DevTools with the URL printed by `flutter run`, or run
   `dart devtools` when the Dart SDK is available.
4. In the Performance view, record a short reproduction that isolates one
   launch, navigation, animation, or scrolling interaction.
5. Inspect Frames first, then Timeline events and CPU samples for the slow
   interval.
6. Export the timeline JSON when comparing before and after traces.

## Report

Record:

- target device and OS
- Flutter version and build mode
- exact reproduction steps
- frame or interaction under investigation
- timeline evidence and suspected expensive work
- before and after measurements when a change is made

Use `scripts/summarize_timeline.py` to list long-duration events from an
exported timeline JSON file. Treat the output as a pointer for manual trace
inspection, not as a complete performance diagnosis.
