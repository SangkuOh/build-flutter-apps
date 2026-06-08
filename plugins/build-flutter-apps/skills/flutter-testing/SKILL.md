---
name: flutter-testing
description: Design, add, run, and triage Flutter and Dart tests across unit, widget, golden, integration_test, web, desktop, mobile-device, plugin, and native-host layers. Use when validating Flutter behavior, adding regression coverage, choosing the smallest test layer, testing plugins or platform channels, running integration flows, or diagnosing test failures.
---

# Flutter Testing

## Overview

Use the lowest test layer that proves the behavior. Add broader integration coverage when rendering, navigation, platform channels, or native UI boundaries require it.

Read:

- `references/test-matrix.md` to choose a layer.
- `references/plugin-testing.md` for plugin packages and native boundaries.

## Workflow

1. Classify the contract: pure Dart, widget behavior, visual output, Flutter integration flow, or native-host interaction.
2. Preserve existing test conventions and helpers.
3. Add the narrowest regression test.
4. Run the smallest command first, then broaden when shared behavior changed.
5. Report the target, command, result, and any untested native boundary.

## Commands

```bash
dart test
flutter test
flutter test test/path/to/widget_test.dart
flutter test integration_test/app_test.dart -d <device-id>
```

Use `flutter drive` where required by web integration tests or performance-driving workflows.

## Strong Defaults

- Use Dart unit tests for pure logic.
- Use widget tests for rendering, semantics, gestures, and local navigation behavior.
- Use golden tests only when the repo already controls rendering stability or the visual contract justifies the maintenance cost.
- Use `integration_test` for app flows on devices, emulators, simulators, desktop, or web.
- Use native test frameworks or Patrol when native dialogs, notifications, or platform views must be interacted with.
- Test plugin Dart code, native code, and cross-boundary behavior separately.

## Guardrails

- Do not use an end-to-end test for logic a fast unit test can prove.
- Do not claim native UI coverage from `integration_test` alone.
- Do not update goldens blindly; inspect the visual difference.
- Do not skip a failing test without identifying whether it is setup, flakiness, or regression.
