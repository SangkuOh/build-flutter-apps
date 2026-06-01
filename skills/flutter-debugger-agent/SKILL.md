---
name: flutter-debugger-agent
description: Build, run, inspect, and debug Flutter apps on mobile simulators, emulators, connected devices, desktop targets, or web with Flutter CLI, Dart VM Service, DevTools, logs, screenshots, and hot reload. Use when launching an app, selecting a target, reproducing UI behavior, collecting logs, checking widget layout, validating a flow, or diagnosing runtime failures.
---

# Flutter Debugger Agent

## Overview

Use Flutter CLI to prove behavior on an explicit target. Prefer debug mode for functional work and profile mode only when collecting performance evidence.

Pair with `../flutter-devtools-performance/SKILL.md` for profiling, `../flutter-memory-leaks/SKILL.md` for memory investigations, and `../flutter-testing/SKILL.md` for automated verification.

Read `references/cli-cheatsheet.md` for additional commands.

## Core Workflow

### 1. Check the environment

```bash
SKILL_DIR="<absolute path to this loaded skill folder>"
"$SKILL_DIR/scripts/flutter_env_report.sh"
```

If Flutter is missing, report the blocker and locate the expected SDK from repo tooling such as FVM before assuming a global install.

### 2. Select one target

```bash
flutter devices
flutter emulators
flutter emulators --launch <emulator-id>
```

Pass `-d <device-id>` on run and test commands when multiple targets exist.

### 3. Resolve packages and analyze

```bash
flutter pub get
flutter analyze
```

Fix analysis or build failures before attempting UI interaction.

### 4. Launch

```bash
flutter run -d <device-id>
```

Use the interactive session for hot reload (`r`), hot restart (`R`), widget inspector (`i`), performance overlay (`P`), and detach (`d`) when appropriate.

### 5. Inspect and reproduce

- Use Flutter Inspector and DevTools for widget-tree and constraint problems.
- Capture the exact flow, target, SDK mode, and log excerpt.
- Use native target tools only where Flutter CLI or DevTools does not expose enough evidence.
- Re-run the same flow after a patch.

### 6. Capture logs

Use the active `flutter run` output first. Add platform logs when needed:

```bash
adb -s <serial> logcat
xcrun simctl spawn <udid> log stream --level debug
```

## Troubleshooting

- If no device appears, run `flutter doctor -v` and fix the target toolchain.
- If the wrong target launches, pass `-d <device-id>`.
- If a package resolution failure occurs, inspect `pubspec.yaml`, SDK constraints, and the first solver conflict.
- If hot reload does not apply a structural change, use hot restart.
- If platform behavior differs, reproduce on the affected platform instead of assuming a shared Dart cause.
