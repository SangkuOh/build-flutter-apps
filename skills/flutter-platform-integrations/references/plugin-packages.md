# Flutter Plugin Packages

## When To Extract A Plugin

- The native capability is reused across multiple Flutter apps.
- The host implementation deserves its own test matrix and version lifecycle.
- Multiple platforms need separate implementations.

## Structure

```bash
flutter create --template=plugin --platforms=android,ios my_plugin
```

Use federated plugin structure when the app-facing interface, platform implementations, and
platform interface need independent ownership.

## Testing Layers

- Dart unit and widget tests for the Dart-facing API.
- Integration tests from the example app for Dart-to-host behavior.
- Native unit tests for host implementation logic.
- Native UI frameworks or Patrol when dialogs, platform views, or notifications must be driven.

Official docs:

- Packages and plugins: `https://docs.flutter.dev/packages-and-plugins/using-packages`
- Developing plugin packages: `https://docs.flutter.dev/packages-and-plugins/developing-packages`
- Testing plugins: `https://docs.flutter.dev/testing/testing-plugins`
