---
name: flutter-performance-audit
description: Audit Flutter runtime performance from code first, then guide focused DevTools profiling. Use when diagnosing janky frames, slow scrolling, excessive widget rebuilds, layout thrash, repaint cost, saveLayer usage, opacity or clipping overhead, large images, shader or raster issues, startup delays, or CPU-heavy work.
---

# Flutter Performance Audit

## Overview

Inspect code and state flow first. Capture profile-mode DevTools evidence when review alone cannot establish the cause. Pair with `../flutter-devtools-performance/SKILL.md` for runtime traces.

Read:

- `references/code-smells.md` for the review catalog.
- `references/profiling-intake.md` before collecting runtime evidence.
- `references/report-template.md` when presenting findings.

## Workflow

1. Classify the symptom: UI-thread frame, raster frame, scrolling, startup, CPU, image pressure, memory, or platform-bound work.
2. Inspect the affected widgets, state owners, list builders, layout, paint effects, and async paths.
3. Separate code-backed findings from runtime hypotheses.
4. Apply narrow fixes when the cause is clear.
5. Capture the same focused flow in profile mode on a physical device when timing proof matters.
6. Compare before and after with equivalent target, mode, and interaction.

## Review Focus

- broad rebuild scope and missing `const` opportunities
- expensive work inside `build`
- eager list or grid children
- intrinsic layout passes
- unnecessary `saveLayer`, `Opacity`, clipping, shadows, or paint effects
- oversized image decode and raster-cache pressure
- avoidable rebuilds during animation
- synchronous work on UI paths
- platform channel work that blocks user-visible progress

## Verification

Report the exact flow, target, Flutter mode, frame or CPU evidence, artifact path, applied fix, before-after delta, and remaining uncertainty.

Do not use debug-mode frame timings as release-performance evidence.
