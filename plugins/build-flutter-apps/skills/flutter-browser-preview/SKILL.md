---
name: flutter-browser-preview
description: Preview Flutter apps inside the visible Codex side-panel browser with a browser-first Flutter web-server workflow, falling back to Android or iOS runtime mirrors only when platform-specific behavior is explicitly required. Use when a user wants browser-visible Flutter proof, live UI iteration in Codex, or an interactive in-app browser preview while using hot reload.
---

# Flutter Browser Preview

## Overview

Use this skill with `../flutter-debugger-agent/SKILL.md` and the Browser
plugin's `control-in-app-browser` skill. For a generic "preview inside Codex"
request, do not launch an iOS Simulator, Android emulator, or desktop runner.
Use the Flutter web-server path so the preview itself is the visible Codex
side-panel browser tab.

Choose the preview path from the user's target requirement:

| User requirement | Browser preview path |
| --- | --- |
| General Flutter UI preview, layout work, state flow, routing, visual iteration | Run the bundled `flutter-web-preview.mjs` helper and open its printed URL in the Codex in-app browser. |
| Android-specific plugin, permission, platform-channel, native-view, or rendering behavior | Run `flutter run -d <adb-serial>`, then mirror the same adb target with the Android emulator browser bridge. |
| iOS-specific plugin, permission, platform-channel, native-view, Cupertino, or rendering behavior | Run `flutter run -d <simulator-udid>`, then mirror the same simulator with `serve-sim`. |

If the user says "Codex 내부", "side panel", "사이드패널", "in-app browser",
"preview", "프리뷰를 보고 인터렉션", or similar without naming Android or iOS
platform behavior, choose Flutter web. This matches the desired Codex-internal
interaction loop and avoids opening a separate Simulator window.

## Flutter Web Workflow

Use web by default for Codex-internal preview work. It is the only Flutter path
where the app itself runs in the Codex browser surface rather than being mirrored
from a platform runtime.

1. Inspect the Flutter environment and choose the web-server target:

   ```bash
   flutter --version
   flutter devices
   flutter pub get
   ```

2. Start the bundled web preview helper in a long-running terminal from the
   Flutter project root:

   ```bash
   node <skill-root>/scripts/flutter-web-preview.mjs --project "$PWD"
   ```

   The helper runs `flutter run -d web-server` on `127.0.0.1`, chooses a local
   port when one is not supplied, and prints the exact preview URL.

3. Open the printed URL in the visible Codex side-panel browser. This is a
   required handoff, not an optional convenience:

   - Load the Browser plugin's `control-in-app-browser` skill.
   - Use the in-app browser API, select or create a tab, call the browser
     visibility capability with `set(true)`, and navigate that tab to the exact
     local URL printed by the helper.
   - Do not use macOS `open`, a separate desktop browser, or standalone
     headless browser automation as a substitute for the user-visible side
     panel.
   - Do not report "Codex internal preview" success until the side panel is
     visible on the Flutter URL.

4. Verify that the actual Flutter app rendered and that browser clicks or text
   input affect the UI. A successful HTTP response is not enough proof.

Useful options:

```bash
node <skill-root>/scripts/flutter-web-preview.mjs \
  --project /absolute/path/to/app \
  --target lib/main_preview.dart \
  --port 3278 \
  --dart-define FEATURE_PREVIEW=true \
  -- --track-widget-creation
```

Keep the terminal alive while previewing so the user can keep interacting with
the side panel. Use the active `flutter run` terminal for hot reload, hot
restart, and logs. This should be the first workflow used for Codex-internal
preview unless the user explicitly asks for Android or iOS runtime behavior.

If the Browser plugin is unavailable or cannot control the side panel, keep the
Flutter web preview server running, report the exact URL, and clearly state that
the side-panel handoff is blocked. Do not silently replace that step with a
headless-browser-only verification.

## Android Workflow

Use Android only when the task depends on Android platform behavior, plugins,
permissions, native views, platform channels, or Android rendering. Do not use
this workflow for a generic Codex-internal Flutter preview.

1. Load `flutter-debugger-agent` and select one adb target:

   ```bash
   flutter devices
   adb devices -l
   ```

2. Launch Flutter on that exact target:

   ```bash
   flutter run -d "<adb-serial>"
   ```

3. In a separate long-running terminal, load the Android emulator browser skill
   from the Build AndroidOS Apps plugin and start its bridge for the same
   serial:

   ```bash
   node <android-emulator-browser-skill-root>/scripts/android-emulator-browser.mjs \
     --serial "<adb-serial>"
   ```

4. Open the bridge URL in the Codex in-app browser and verify a real Android
   frame. Use the `flutter run` terminal for hot reload.

## iOS Simulator Workflow

Use iOS Simulator only when the task depends on Cupertino behavior, iOS plugins,
permissions, native views, platform channels, or iOS rendering. Do not use this
workflow for a generic Codex-internal Flutter preview.

1. Load `flutter-debugger-agent` and select one Simulator UDID:

   ```bash
   flutter devices
   xcrun simctl list devices available
   ```

2. Launch Flutter on that exact simulator:

   ```bash
   flutter run -d "<simulator-udid>"
   ```

3. In a separate long-running terminal, mirror the same simulator with
   `serve-sim`:

   ```bash
   SIM="<simulator-udid>"
   cleanup_serve_sim() {
     npx --yes serve-sim@latest --kill "$SIM" >/dev/null 2>&1 || true
   }
   trap cleanup_serve_sim EXIT INT TERM HUP
   cleanup_serve_sim
   npx --yes serve-sim@latest "$SIM"
   ```

4. Open the URL printed by `serve-sim` in the Codex in-app browser and verify a
   real iOS frame. Use the `flutter run` terminal for hot reload.

`serve-sim` may bring the macOS Simulator app forward while establishing the
stream. That is acceptable only for iOS-specific runtime verification. It is not
the default path for a user who simply wants to preview and interact with a
Flutter UI inside Codex.

## Support Boundary

- Flutter web preview in the visible side-panel browser is the default
  Codex-internal interaction path, but it is not proof of Android or iOS
  platform behavior.
- Android and iOS previews are visual mirrors of a running Flutter app. Keep
  `flutter run` open for logs, VM Service, hot reload, and hot restart.
- A separate Simulator or emulator appearing is a signal that the workflow has
  moved from Codex-internal Flutter preview to platform-runtime verification.
- Use a physical device when representative performance, sensors, camera,
  Bluetooth, biometric, OEM, or hardware-specific behavior matters.
- Do not claim success from a loaded preview URL alone. Capture side-panel
  browser-visible evidence that the Flutter UI rendered and accepts interaction.

## Proof

For preview QA, report the target, device id or URL, launch command, and the
browser-visible evidence. When the task involved interaction, also report the
flow replayed after opening the preview.
