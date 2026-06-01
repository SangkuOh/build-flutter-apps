# Flutter View Refactor Checklist

## Before Editing

- Run or record the current build and test state.
- Identify widgets, view models, repositories, services, routes, and lifecycle resources.
- Read nearby code to preserve the local architecture and naming.

## Refactor Pass

- Keep business logic out of `build`.
- Extract meaningful widgets with narrow inputs.
- Add `const` constructors where valid.
- Keep ephemeral state local.
- Move application state to the existing feature state owner.
- Create and dispose controllers in the correct lifecycle.
- Use lazy builders for large collections.
- Add keys when identity or tests require them.
- Keep router and service dependencies out of leaf widgets.

## Verification

- Run `dart format --output=none --set-exit-if-changed .`.
- Run `flutter analyze`.
- Run the smallest relevant tests.
- Exercise the same target flow when UI behavior changed.
- Compare screenshots when layout should remain unchanged.

Stop and surface the tradeoff before changing navigation behavior, state-management framework,
platform support, or product semantics.
