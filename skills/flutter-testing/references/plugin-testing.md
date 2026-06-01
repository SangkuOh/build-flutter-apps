# Plugin Testing

Flutter plugin packages cross Dart and native platform boundaries. Test both
the Dart API and each supported platform implementation.

## Layers

- Test Dart-facing validation and state behavior with unit tests.
- Mock platform calls only for focused Dart tests.
- Exercise the real plugin through the package example app.
- Run host-platform tests for Kotlin, Swift, or other native code.
- Validate missing-platform and unsupported-operation behavior explicitly.

## Matrix

Record supported targets from `pubspec.yaml` and test the package example on
each target affected by the change. For federated plugins, verify the app-facing
package, platform interface package, and changed platform implementation
together.

Avoid treating a mocked MethodChannel test as proof that native registration,
serialization, lifecycle handling, or host configuration works.
