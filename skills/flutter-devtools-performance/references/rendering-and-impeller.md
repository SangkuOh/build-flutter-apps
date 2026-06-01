# Rendering And Impeller

## Rendering Review

Check the Flutter frame pipeline before optimizing:

- Is the UI thread late because Dart work is expensive?
- Is raster work late because paint, clipping, effects, or image decoding is
  expensive?
- Are both threads healthy while an external platform operation is slow?

Use the Performance view and frame chart to distinguish these cases.

## Impeller

Impeller is Flutter's rendering engine on supported platforms. Do not assume a
rendering issue is caused by the engine. First capture a profile trace and
identify whether the slow work is in build, layout, paint, rasterization, image
decoding, or platform integration.

When an engine-specific regression is plausible:

1. Record the Flutter SDK version, platform, OS version, and hardware.
2. Capture a minimal reproduction and profile trace.
3. Compare only with a documented Flutter run flag supported by the installed
   SDK.
4. Keep engine toggles out of production configuration unless the Flutter
   documentation explicitly requires them.
