# Build Flutter Apps

`Build Flutter Apps` is a Codex plugin for modern Flutter and Dart application
development. It packages focused workflows for project setup, adaptive UI,
widget architecture, native integrations, testing, runtime debugging, DevTools
profiling, and memory investigation.

The plugin is modeled after the role-based workflow design of the curated
`Build iOS Apps` plugin. It does not translate iOS APIs literally. Instead, it
maps each development responsibility to the Flutter tools and conventions that
fit a multi-platform Dart application.

## What This Plugin Is

This repository is a Codex plugin, not a Flutter application template and not a
replacement for the Flutter SDK.

When a request matches one or more included skills, Codex loads the relevant
workflow instructions and applies them to the current repository. The plugin is
designed to help Codex:

- inspect an existing Flutter project before editing it
- choose the smallest workflow that fits the task
- preserve local architecture and package conventions
- use Flutter CLI, Dart VM Service, DevTools, and native platform tools
- prefer code-first diagnosis before collecting expensive runtime evidence
- validate changes with the narrowest useful tests and builds
- distinguish measured evidence from hypotheses

The plugin intentionally does not require a third-party Flutter MCP server.
Device work uses the standard Flutter and platform toolchains already expected
by Flutter projects.

## How It Works

The plugin uses progressive skill loading.

1. Codex reads the request and matches it against the descriptions of the
   included skills.
2. It loads only the relevant `SKILL.md` files.
3. A selected skill may load a short reference document or helper script when
   the task needs more detail.
4. Codex inspects the target repository and follows its existing conventions.
5. It implements the smallest justified change.
6. It runs focused verification, then broadens checks when the blast radius
   requires it.
7. For runtime bugs, it reproduces the same flow after the patch and reports
   the target, mode, evidence, and remaining caveats.

A single task can activate more than one skill. For example:

- a new adaptive settings screen can use `flutter-ui-patterns`,
  `flutter-adaptive-ui`, and `flutter-testing`
- a janky scrolling issue can use `flutter-performance-audit`,
  `flutter-devtools-performance`, and `flutter-debugger-agent`
- a custom native capability can use `flutter-platform-integrations`,
  `flutter-testing`, and a platform-specific toolchain

## Relationship To Build iOS Apps

The Flutter plugin mirrors the development roles covered by `Build iOS Apps`
while using Flutter-native tooling and cross-platform boundaries.

| Build iOS Apps role | Build Flutter Apps skill | Flutter adaptation |
| --- | --- | --- |
| `ios-debugger-agent` | `flutter-debugger-agent` | Uses Flutter CLI, Dart VM Service, DevTools, hot reload, target logs, and explicit device selection |
| `ios-ettrace-performance` | `flutter-devtools-performance` | Uses Flutter profile mode, DevTools Frames, Timeline Events, CPU profiler, app-size analysis, and exported timeline JSON |
| `ios-memgraph-leaks` | `flutter-memory-leaks` | Uses DevTools Memory view, heap snapshots, diffs, trace instances, retaining paths, and platform tools when native memory is involved |
| `swiftui-performance-audit` | `flutter-performance-audit` | Reviews rebuild scope, widget construction, layout, paint effects, images, synchronous work, and platform-channel cost before profiling |
| `swiftui-ui-patterns` | `flutter-ui-patterns` | Applies immutable UI state, unidirectional data flow, MVVM boundaries, navigation, async states, accessibility, and dependency injection |
| `swiftui-view-refactor` | `flutter-view-refactor` | Splits large widget trees, moves work out of `build`, narrows dependencies, stabilizes identity, and fixes lifecycle ownership |
| `swiftui-liquid-glass` | `flutter-adaptive-ui` | Covers modern adaptive UI across phone, tablet, foldable, desktop, and web window sizes rather than a single Apple visual language |
| `ios-app-intents` | `flutter-platform-integrations` | Covers deep links, App Links, Universal Links, platform channels, Pigeon APIs, plugins, and native handoff paths |

Flutter also needs two explicit workflows that are broader than the iOS plugin's
surface:

| Additional Flutter skill | Why it exists |
| --- | --- |
| `flutter-project-setup` | Flutter projects frequently need SDK, package, code-generation, flavor, and target-platform configuration work |
| `flutter-testing` | Flutter has distinct unit, widget, golden, integration, plugin, and native-host test layers that should be selected deliberately |

## Included Skills

### `flutter-project-setup`

Set up or modernize Flutter apps, packages, and plugins.

Use it for:

- new Flutter apps, packages, or plugin packages
- `pubspec.yaml`, assets, fonts, SDK constraints, and dependency changes
- linting and `analysis_options.yaml`
- code generation and repository-specific generator commands
- flavor configuration and supported-platform decisions
- Flutter or Dart migration planning
- package solver and toolchain repair

Strong defaults:

- inspect `pubspec.yaml`, lockfiles, source layout, tests, and platform folders
  before editing
- use the stable Flutter channel for production unless the task requires
  otherwise
- check official Flutter and Dart documentation before making
  version-sensitive claims
- avoid broad dependency upgrades during an unrelated feature patch

### `flutter-debugger-agent`

Build, launch, inspect, and debug Flutter applications on an explicit target.

Use it for:

- selecting an emulator, simulator, device, desktop target, or web target
- reproducing a UI bug
- reading `flutter run` output
- using hot reload or hot restart
- collecting Android or iOS platform logs when Flutter output is insufficient
- validating that a runtime fix works on the affected platform

The workflow starts with environment discovery:

```bash
flutter --version
flutter doctor -v
flutter devices
flutter emulators
```

It then runs the app with an explicit target when multiple devices exist:

```bash
flutter run -d <device-id>
```

### `flutter-platform-integrations`

Design external entry points and Dart-to-native boundaries.

Use it for:

- deep links and typed destination parsing
- Android App Links, iOS Universal Links, and web URL routing
- native API access from Dart
- platform-to-Flutter callbacks
- `MethodChannel` integrations
- Pigeon-generated type-safe APIs
- reusable plugin packages and federated plugins

Strong defaults:

- check for an actively maintained package before adding custom native code
- keep native API details behind a Dart service boundary
- prefer Pigeon for structured APIs with multiple methods or non-trivial
  payloads
- validate cold-start and warm-start routing independently
- test each supported host platform affected by the change

### `flutter-adaptive-ui`

Build responsive, adaptive, and accessible interfaces for multiple window
sizes and input models.

Use it for:

- phone, tablet, foldable, desktop, web, and multi-window layouts
- `MediaQuery`, `LayoutBuilder`, constraints, and `SafeArea`
- compact and expanded navigation patterns
- keyboard traversal, pointer input, hover, scroll wheel, and touch
- resize and rotation behavior
- text scale and accessibility review
- deliberate Material and Cupertino behavior

The skill treats responsive and adaptive behavior separately:

- responsive UI fits the available space
- adaptive UI remains useful and coherent in that space

It avoids device-name checks such as `isTablet` when a decision should depend
on the actual window constraints.

### `flutter-ui-patterns`

Build and refactor widget trees with explicit state and dependency ownership.

Use it for:

- new screens and reusable widgets
- immutable render state
- unidirectional event flow
- MVVM boundaries
- repositories, services, and optional domain layers
- navigation and async UI states
- forms, lazy lists, semantics, and dependency injection

Strong defaults:

- keep ephemeral element state local to the smallest owning widget
- keep application data in repositories
- keep external API access in focused services
- use a view model when feature state depends on repositories or services
- avoid network requests and platform calls inside `build`
- use lazy builders for large collections

### `flutter-view-refactor`

Refactor large widget files without changing user-visible behavior.

Use it for:

- oversized `build` methods
- inline business logic in widget trees
- repeated controller, future, or subscription creation
- unclear view-model boundaries
- broad rebuilds
- unstable list identity
- missing lifecycle cleanup

The workflow extracts meaningful widgets, moves expensive work out of
`build`, preserves stable identity, and verifies controller and subscription
disposal.

### `flutter-performance-audit`

Audit Flutter performance from code before reaching for profiling tools.

Use it for:

- janky scrolling
- late frames
- broad widget rebuilds
- expensive work in `build`
- eager list or grid construction
- intrinsic layout passes
- `saveLayer`, opacity, clipping, shadow, and paint cost
- oversized images and raster-cache pressure
- synchronous work on user-visible paths
- platform-channel delays

This skill distinguishes code-backed findings from runtime hypotheses. When
timing proof matters, it hands off to `flutter-devtools-performance`.

### `flutter-devtools-performance`

Capture and interpret profile-mode runtime performance evidence.

Use it for:

- UI-thread and raster-thread frame analysis
- animation, scrolling, startup, and rendering investigations
- CPU-heavy Dart work
- before-and-after optimization comparisons
- app-size investigations
- Impeller-related rendering questions

The workflow profiles one focused user-visible interaction at a time:

```bash
flutter run --profile -d <device-id>
```

For representative mobile performance results, prefer a physical device.
Debug-mode frame timing is development feedback, not release-performance
evidence.

### `flutter-memory-leaks`

Investigate retained Dart objects and native memory growth with repeatable
evidence.

Use it for:

- retained widgets, state objects, controllers, and focus nodes
- stream subscriptions and listeners
- callback and closure retention
- image or cache pressure
- native plugin resources
- unexplained RSS increases
- before-and-after heap comparisons

The workflow separates:

- Dart heap retention
- external memory
- image and raster-cache pressure
- native platform memory

It does not claim a leak from one RSS increase. A credible diagnosis identifies
the class, retaining path, or repeatable accumulation pattern and verifies the
same flow after the fix.

### `flutter-testing`

Choose, add, run, and triage the smallest useful test layer.

Use it for:

- pure Dart unit tests
- widget tests
- golden tests
- `integration_test` flows
- mobile, desktop, and web validation
- plugin package testing
- native-host tests for Kotlin, Swift, or other platform code

The default test selection is:

| Contract | Preferred layer |
| --- | --- |
| Pure Dart logic | Unit test |
| Rendering, semantics, gestures, or local navigation | Widget test |
| Stable visual contract | Golden test when the maintenance cost is justified |
| Complete Flutter application flow | `integration_test` |
| Native registration, serialization, lifecycle, or platform UI | Host-platform test plus integration coverage |

## Common Workflows

### Create Or Modernize A Project

Example prompt:

```text
Create a Flutter app with Material 3, strict analysis, Android and iOS targets,
and a repository layer for API access.
```

Expected workflow:

1. Load `flutter-project-setup` and `flutter-ui-patterns`.
2. Inspect existing repository state or scaffold the requested project.
3. Keep platform support explicit.
4. Resolve packages.
5. Run formatting, analysis, tests, and relevant target builds.

### Build An Adaptive Screen

Example prompt:

```text
Refactor this settings screen so it works on phones, tablets, and desktop
windows with keyboard navigation.
```

Expected workflow:

1. Load `flutter-adaptive-ui`, `flutter-ui-patterns`, and possibly
   `flutter-view-refactor`.
2. Separate shared content from layout-specific widgets.
3. Make layout decisions from available constraints.
4. Verify resize, rotation, text scale, focus traversal, and pointer behavior.
5. Add focused widget tests.

### Debug A Runtime Problem

Example prompt:

```text
Launch the app on the Android emulator, reproduce the login failure, and inspect
the logs.
```

Expected workflow:

1. Load `flutter-debugger-agent`.
2. Check Flutter environment and available targets.
3. Run analysis before interaction.
4. Launch the selected target.
5. Reproduce the exact flow and collect Flutter logs.
6. Add `adb logcat` or native tools only when needed.
7. Re-run the flow after the patch.

### Profile Jank

Example prompt:

```text
The product list drops frames while scrolling. Find the cause and prove the
improvement.
```

Expected workflow:

1. Load `flutter-performance-audit`.
2. Inspect list construction, rebuild scope, images, layout, and paint cost.
3. Apply a narrow code fix when the cause is clear.
4. Load `flutter-devtools-performance` when trace evidence is required.
5. Capture the same profile-mode flow before and after the patch.

### Investigate Memory Growth

Example prompt:

```text
Memory keeps increasing after opening and closing the image viewer. Find the
retaining path.
```

Expected workflow:

1. Load `flutter-memory-leaks` and `flutter-debugger-agent`.
2. Capture an idle baseline.
3. Repeat the suspect flow and return to the original state.
4. Trigger GC when appropriate.
5. Compare snapshots and inspect retaining paths.
6. Patch the smallest retaining edge and repeat the same flow.

### Add A Native Capability

Example prompt:

```text
Expose a typed battery-status API to Dart and support Android and iOS.
```

Expected workflow:

1. Load `flutter-platform-integrations` and `flutter-testing`.
2. Check whether a maintained package already satisfies the requirement.
3. Define a small Dart-facing service boundary.
4. Use Pigeon when the API shape benefits from generated types.
5. Implement and test each affected host platform.

## Helper Scripts

The plugin includes small helpers for repeatable diagnostics. They use standard
shell or Python tooling and do not replace direct DevTools inspection.

### Flutter Environment Report

```bash
skills/flutter-debugger-agent/scripts/flutter_env_report.sh
```

Prints Flutter SDK, doctor, device, and emulator discovery output. When Flutter
is not globally available, inspect repository tooling such as FVM before
assuming the SDK is missing entirely.

### Timeline Summary

```bash
python3 skills/flutter-devtools-performance/scripts/summarize_timeline.py \
  /path/to/timeline.json \
  --top 20
```

Lists long-duration events from an exported Flutter or Dart timeline JSON file.
Use the result as a pointer for manual frame and timeline inspection.

### Allocation CSV Comparison

```bash
python3 skills/flutter-memory-leaks/scripts/compare_allocation_csv.py \
  before.csv \
  after.csv \
  --top 20
```

Ranks class allocation growth between two exported memory snapshot CSV files.
Growth is a lead, not proof of a leak.

## Requirements

Install the Flutter SDK and the platform toolchains required by the targets you
intend to build or debug.

Baseline checks:

```bash
flutter --version
flutter doctor -v
flutter devices
```

Target-specific tooling:

| Target | Typical requirements |
| --- | --- |
| Android | Android Studio or Android SDK command-line tools, platform-tools, an emulator or connected device |
| iOS | macOS, Xcode, CocoaPods when required by the project, and an iOS Simulator or connected device |
| macOS | macOS and Xcode command-line tools |
| Web | A supported browser and the Flutter web toolchain |
| Windows | Windows and Visual Studio desktop development tooling |
| Linux | Linux desktop development packages required by Flutter |

Repository-specific SDK managers such as FVM are supported. Follow the target
repository's existing tooling before assuming a globally installed Flutter
binary.

## Install From This Repository

Clone the plugin into a local Codex plugin source directory:

```bash
mkdir -p ~/plugins
git clone https://github.com/SangkuOh/build-flutter-apps.git \
  ~/plugins/build-flutter-apps
```

Expose the source through your personal Codex marketplace at
`~/.agents/plugins/marketplace.json`. If the file already exists, merge the
following entry into its `plugins` array instead of replacing unrelated
entries:

```json
{
  "name": "build-flutter-apps",
  "source": {
    "source": "local",
    "path": "./plugins/build-flutter-apps"
  },
  "policy": {
    "installation": "AVAILABLE",
    "authentication": "ON_INSTALL"
  },
  "category": "Developer Tools"
}
```

Install the plugin from the configured personal marketplace:

```bash
codex plugin add build-flutter-apps@personal
codex plugin list
```

Start a new Codex thread after installation so the new plugin skills are
available to the conversation.

## Repository Layout

```text
.
|-- .codex-plugin/
|   `-- plugin.json
|-- agents/
|   `-- openai.yaml
|-- assets/
|   `-- build-flutter-apps.svg
|-- skills/
|   |-- flutter-project-setup/
|   |-- flutter-debugger-agent/
|   |-- flutter-platform-integrations/
|   |-- flutter-adaptive-ui/
|   |-- flutter-ui-patterns/
|   |-- flutter-view-refactor/
|   |-- flutter-performance-audit/
|   |-- flutter-devtools-performance/
|   |-- flutter-memory-leaks/
|   `-- flutter-testing/
|-- LICENSE
`-- README.md
```

Each skill contains a `SKILL.md`. Larger workflows load focused material from
their own `references/` directory. Diagnostic helpers live under the relevant
skill's `scripts/` directory.

## Verification Principles

The plugin is intentionally conservative about claiming success.

- Build and analysis failures are fixed before UI interaction.
- Functional debugging uses an explicit target.
- Performance claims use comparable profile-mode evidence.
- Mobile performance measurement prefers physical devices.
- Memory conclusions distinguish Dart heap, external memory, raster cache, and
  native allocation behavior.
- A lower total memory number alone is not treated as proof of a leak fix.
- Platform integrations are tested on each affected host platform.
- Golden files are not updated blindly.
- Native UI coverage is not inferred from mocked Dart tests.

## Official Flutter References

Use current official Flutter documentation for version-sensitive decisions:

- [Flutter SDK archive](https://docs.flutter.dev/install/archive)
- [App architecture guide](https://docs.flutter.dev/app-architecture/guide)
- [Adaptive and responsive design](https://docs.flutter.dev/ui/adaptive-responsive)
- [Platform channels](https://docs.flutter.dev/platform-integration/platform-channels)
- [Integration testing](https://docs.flutter.dev/testing/integration-tests)
- [DevTools Performance view](https://docs.flutter.dev/tools/devtools/performance)
- [DevTools Memory view](https://docs.flutter.dev/tools/devtools/memory)

## License

MIT. See [LICENSE](LICENSE).
