# Flutter State And Architecture

## Recommended Layers

| Layer | Responsibility |
| --- | --- |
| View | Render state and forward user events |
| View model | Convert repository data into UI state and expose commands |
| Repository | Source of truth for application data, caching, error handling, refresh |
| Service | Stateless wrapper around external APIs, files, or platform plugins |
| Optional domain layer | Reused or complex logic spanning repositories |

Treat the recommendation as a strong default, not a requirement to rewrite a coherent existing
architecture.

## State Placement

| State kind | Default owner |
| --- | --- |
| Ephemeral state used by one widget | Local `State` |
| Feature UI state derived from application data | View model |
| Shared session or application data | Repository |
| Persistent storage or remote API access | Service behind repository |

## Data Flow

- Keep UI as a function of immutable state.
- Send user events upward as explicit commands.
- Update the source of truth before rendering new application state.
- Keep widgets free of repository and service details.
- Inject dependencies through constructors or app wiring boundaries.

Official docs:

- Architecture guide: `https://docs.flutter.dev/app-architecture/guide`
- Architecture concepts: `https://docs.flutter.dev/app-architecture/concepts`
- Ephemeral versus app state: `https://docs.flutter.dev/data-and-backend/state-mgmt/ephemeral-vs-app`
