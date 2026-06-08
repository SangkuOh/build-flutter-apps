---
name: flutter-ui-patterns
description: Build and refactor Flutter UI with practical widget composition, immutable state, unidirectional data flow, MVVM boundaries, navigation, async loading, forms, lists, accessibility, and dependency injection. Use when shaping Flutter screens, widget trees, app architecture, state ownership, routes, or user interaction behavior.
---

# Flutter UI Patterns

## Overview

Build Flutter views as small widget compositions over immutable state. Keep data and business logic outside views. Follow the existing repository architecture where it is coherent.

Read:

- `references/state-and-architecture.md` for recommended ownership and MVVM boundaries.
- `references/navigation-and-effects.md` for routing, async work, and lifecycle behavior.
- `references/components-index.md` for common widget families.

## Workflow For A New Feature

1. Define immutable UI state, user commands, routes, and platform assumptions.
2. Put feature logic in a view model when the state depends on repositories or services.
3. Keep ephemeral element state local to the smallest stateful widget.
4. Pass plain data and callbacks into reusable widgets.
5. Represent loading, empty, content, and error states explicitly.
6. Add semantics, keyboard behavior, and keys where they serve accessibility or tests.
7. Add focused unit, widget, and integration tests according to the behavior.
8. Run format, analysis, and tests before broad call-site edits.

## Strong Defaults

- Treat UI as a function of immutable state.
- Use repositories as sources of truth for application data.
- Keep services stateless and focused on external APIs or platform access.
- Use a domain layer only when logic is reused or too complex for one view model.
- Keep widgets small and composable.
- Use lazy list builders for large collections.
- Keep dependency injection at app wiring boundaries.

## Anti-Patterns

- Calling network clients or platform channels directly from `build`.
- Hiding business logic in button callbacks inside widget trees.
- Adding a global state container for state used by one widget.
- Passing an entire dependency container into leaf widgets.
- Creating all list children eagerly for large collections.
- Mixing layout, persistence, routing, and service calls in one screen file.

Use official Flutter docs when architecture or widget APIs may have changed.
