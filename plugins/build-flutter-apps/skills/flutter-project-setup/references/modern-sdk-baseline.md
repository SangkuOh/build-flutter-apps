# Modern Flutter SDK Baseline

Use this as a checked snapshot, not as a substitute for current official documentation.
The values below were verified against official sources on 2026-06-01.

## Verified Snapshot

| Layer | Verified stable baseline | Notes |
| --- | --- | --- |
| Flutter SDK | `3.44.0` | Stable release dated 2026-05-18 in the official archive. |
| Dart SDK | `3.12.0` | Included with Flutter `3.44.0`. |
| DevTools | Bundled with Flutter SDK | Upgrade Flutter to receive the current stable DevTools version. |

Re-check before creating or upgrading a project:

- Flutter SDK archive: `https://docs.flutter.dev/install/archive`
- Flutter release notes: `https://docs.flutter.dev/release/release-notes`
- Dart changelog: `https://dart.dev/resources/dart-3-migration`
- DevTools: `https://docs.flutter.dev/tools/devtools`

## Project Types

```bash
flutter create my_app
flutter create --template=package my_package
flutter create --template=plugin --platforms=android,ios my_plugin
```

Enable only intended platforms. For an existing app:

```bash
flutter create --platforms=android,ios,web .
```

Review generated diffs before keeping platform changes.

## Package Discipline

```bash
flutter pub add <package>
flutter pub outdated
flutter pub get
```

- Inspect package maintenance, supported platforms, release stability, and transitive changes.
- Preserve `pubspec.lock` for applications.
- Treat broad major-version upgrades as a separate task.
- Keep code-generation commands deterministic and checked into repo documentation.

## Baseline Gates

```bash
dart format --output=none --set-exit-if-changed .
flutter analyze
flutter test
```

Add platform builds and integration tests according to the changed surface.
