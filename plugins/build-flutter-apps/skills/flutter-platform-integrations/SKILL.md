---
name: flutter-platform-integrations
description: Design Flutter deep links, App Links, Universal Links, platform channels, Pigeon APIs, plugin packages, federated plugins, and native handoff paths. Use when exposing app destinations externally, calling Android or iOS APIs from Dart, receiving native callbacks, creating or repairing a Flutter plugin, or coordinating platform-specific capabilities across Flutter targets.
---

# Flutter Platform Integrations

## Overview

Keep the Dart-facing surface small and typed. Reuse one routing or domain-command path across Flutter UI and native entry points. Prefer an existing maintained package before writing custom native code.

Read:

- `references/deep-links.md` for external routing.
- `references/platform-channels-and-pigeon.md` for native API boundaries.
- `references/plugin-packages.md` for reusable and federated plugins.

## Workflow

1. Identify the smallest required capability and supported targets.
2. Check whether a maintained package already provides it.
3. Keep platform behavior behind a Dart service boundary.
4. Use Flutter routing for external destinations and validate cold-start plus warm-start behavior.
5. Prefer Pigeon for structured cross-platform APIs with multiple methods or non-trivial payloads.
6. Use direct `MethodChannel` only for narrow integrations where a stringly typed boundary is acceptable.
7. Add Dart tests, native tests, and integration coverage according to the boundary touched.

## Deep-Link Rules

- Route inbound URIs through one typed destination parser.
- Validate parameters and reject malformed input.
- Test Android App Links, iOS Universal Links, and web URL behavior separately when supported.
- Use DevTools deep-link validation where it applies.

## Native Boundary Rules

- Keep native API details out of widgets and view models.
- Keep channel names and schemas stable.
- Send platform-to-Flutter callbacks on the platform main thread where required.
- Handle background isolate requirements explicitly.
- Preserve native error details across the boundary.

## Anti-Patterns

- Duplicating navigation logic in Android, iOS, and Dart.
- Adding native code before checking maintained packages.
- Encoding large evolving APIs as unstructured `Map<String, dynamic>` payloads.
- Claiming cross-platform support after testing only one host platform.
