---
name: flutter-project-setup
description: Set up or modernize Flutter and Dart projects with current stable SDK guidance, pubspec dependencies, linting, code generation, flavors, platform targets, and package or plugin structure. Use when creating a Flutter app, package, or plugin, upgrading SDK constraints, repairing toolchain issues, configuring assets or fonts, selecting supported platforms, or organizing multi-platform build setup.
---

# Flutter Project Setup

## Overview

Inspect the existing project before editing. Preserve local conventions and change only the layers required by the request. Re-check official Flutter and Dart documentation before changing version-sensitive SDK guidance.

Read `references/modern-sdk-baseline.md` before creating a project or changing Flutter, Dart, package, plugin, platform, or code-generation configuration.

## Workflow

1. Inspect `pubspec.yaml`, `pubspec.lock`, `analysis_options.yaml`, `lib/`, `test/`, `integration_test/`, and enabled platform directories.
2. Run `flutter --version`, `flutter doctor -v`, and `flutter devices` when the SDK is available.
3. Classify the task: fresh project, package addition, platform enablement, dependency repair, or SDK migration.
4. Preserve the checked-in package manager state. Run `flutter pub get` after dependency edits.
5. Add only the platform directories the product intends to support.
6. Keep generated code deterministic and document the repo's existing generator command.
7. Run analysis and the narrowest relevant test or build.

## Strong Defaults

- Use stable Flutter for production unless the requested API requires beta or main.
- Keep SDK constraints explicit in `pubspec.yaml`.
- Use `flutter pub add` when introducing a package and inspect the resulting constraint.
- Use `flutter pub outdated` to understand drift before broad upgrades.
- Prefer packages with maintained platform support and a clear reason to add them.
- Use `dart format`, `flutter analyze`, and tests as the baseline gates.
- Keep platform-specific code behind plugin, channel, or service boundaries.

## Verification

```bash
flutter pub get
dart format --output=none --set-exit-if-changed .
flutter analyze
flutter test
```

Add target-specific builds only when relevant:

```bash
flutter build apk --debug
flutter build ios --simulator
flutter build macos --debug
flutter build web
```

## Guardrails

- Do not upgrade Flutter, Dart constraints, and unrelated packages in one feature patch.
- Do not delete platform folders unless the user explicitly removes support.
- Do not treat `flutter pub upgrade --major-versions` as a routine first step.
- Do not claim a version is current without checking official docs during the active task.
