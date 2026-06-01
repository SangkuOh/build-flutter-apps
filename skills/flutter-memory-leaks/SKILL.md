---
name: flutter-memory-leaks
description: Capture and inspect Flutter and Dart memory evidence with DevTools Memory view, heap snapshots, diff snapshots, trace instances, retaining paths, allocation CSV exports, and before-after comparison. Use when debugging retained widgets, state objects, controllers, subscriptions, closures, images, caches, native memory growth, memory bloat, or unexplained RSS increases.
---

# Flutter Memory Leaks

## Overview

Prove memory issues from a focused reproduction. Use DevTools Memory view for Dart heap evidence and platform tools only when native allocation behavior is the real question.

Pair with `../flutter-debugger-agent/SKILL.md` for launch and `../flutter-devtools-performance/SKILL.md` for raster-cache or frame investigations.

Read `references/memory-evidence.md` before interpreting snapshots.

## Core Workflow

1. Launch the exact app in profile or debug mode according to the investigation.
2. Reproduce one flow that should release objects.
3. Return to a stable idle point and trigger GC from DevTools when appropriate.
4. Capture baseline and after-flow heap snapshots.
5. Use Diff Snapshots and Trace Instances for suspected classes.
6. Inspect retaining paths for app-owned objects.
7. Patch the smallest retaining edge and repeat the same flow.

## CSV Comparison Helper

When DevTools Profile Memory CSV exports are available:

```bash
SKILL_DIR="<absolute path to this loaded skill folder>"
python3 "$SKILL_DIR/scripts/compare_allocation_csv.py" \
  before.csv after.csv \
  --top 20
```

Use the helper for prioritization. Prove a leak with retaining-path evidence or repeatable accumulation.

## Common Retainers

- controllers, focus nodes, animation controllers, and stream subscriptions not disposed
- callbacks and closures retained by longer-lived owners
- caches without bounded lifetime
- images or raster-cache pressure mistaken for Dart heap retention
- plugin or platform resources not released on the native side

## Root-Cause Rules

- Treat one RSS increase as a lead, not proof.
- Separate Dart heap, external memory, raster cache, and native memory.
- Do not claim a fix because total memory dropped.
- Confirm the specific class, retaining path, or accumulation pattern disappeared.

## Report

Include the flow, target, Flutter mode, snapshot paths, retained app-owned classes, retaining path evidence, smallest fix, before-after comparison, and remaining native-memory caveats.
