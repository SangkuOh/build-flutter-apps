---
name: flutter-devtools-performance
description: Capture and interpret Flutter profile-mode runtime performance evidence with DevTools Performance view, frame charts, timeline events, CPU profiler, app-size analysis, and exported timeline JSON. Use when profiling jank, slow frames, startup, animations, rendering, CPU-heavy stacks, app size, before-after optimizations, or Impeller-related behavior.
---

# Flutter DevTools Performance

## Overview

Profile one focused user-visible flow at a time. Use profile mode on a physical mobile device for representative results. Use DevTools frame and timeline evidence to separate UI work from raster work.

Pair with `../flutter-debugger-agent/SKILL.md` for target launch and `../flutter-performance-audit/SKILL.md` for code-first review.

Read:

- `references/devtools-capture.md` for collection steps.
- `references/rendering-and-impeller.md` for rendering investigations.

## Core Workflow

1. Define one flow with exact start and stop points.
2. Record target, OS, Flutter SDK, mode, renderer, and run count.
3. Launch in profile mode:

```bash
flutter run --profile -d <device-id>
```

4. Open DevTools and record only the focused flow.
5. Export the performance snapshot when the UI supports it.
6. Use the CPU profiler when background or Dart work is the question.
7. Apply the smallest justified fix and repeat the same flow.

## Timeline Summary Helper

For exported timeline JSON containing `traceEvents`:

```bash
SKILL_DIR="<absolute path to this loaded skill folder>"
python3 "$SKILL_DIR/scripts/summarize_timeline.py" \
  /path/to/timeline.json \
  --top 20
```

Treat the helper as a fast first pass. Inspect the DevTools timeline directly for frame context.

## Evidence Rules

- Use Flutter Frames chart to find slow UI and raster frames.
- Use Frame Analysis and Timeline Events for the selected late frame.
- Enable widget-build, layout, and paint tracking only when needed because tracing adds overhead.
- Use CPU profiler for Dart CPU hotspots not explained by a single frame.
- Use App Size tool for binary growth investigations.

## Report

Include flow, target, mode, renderer, run count, artifact paths, late-frame or CPU evidence, caveats, and comparable before-after deltas.

Do not report debug timings as representative. Do not infer raster cause from UI-thread cost alone.
