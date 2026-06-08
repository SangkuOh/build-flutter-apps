# Platform Channels And Pigeon

## Selection

| Need | Default |
| --- | --- |
| One narrow stable call | `MethodChannel` can be sufficient |
| Multiple calls or evolving payloads | Prefer Pigeon |
| Reusable capability across apps | Create or extend a plugin package |
| Independent platform implementations | Consider a federated plugin |

## Pigeon

Prefer Pigeon when type safety matters. It generates readable host and Dart APIs and avoids
matching method-name strings and dynamic payload shapes manually.

## Thread And Isolate Rules

- Invoke platform-to-Flutter channel calls on the platform main thread where required.
- Execute platform handlers asynchronously or on a background task queue when the native API
  allows it.
- Use channels from root isolates or properly registered background isolates.
- Do not block user-visible UI threads with slow native work.

## Error Handling

- Preserve native error code, message, and actionable detail.
- Validate payloads at the boundary.
- Version schemas deliberately when published plugin consumers may lag.

Official docs:

- Platform-specific code: `https://docs.flutter.dev/platform-integration/platform-channels`
- Pigeon package: `https://pub.dev/packages/pigeon`
