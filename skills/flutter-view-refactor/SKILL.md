---
name: flutter-view-refactor
description: Refactor large Flutter widget files into stable, testable views with explicit state and command flow. Use when splitting oversized widget trees, removing business logic from build methods, tightening view-model boundaries, extracting reusable widgets, stabilizing list item identity, or cleaning lifecycle ownership without changing behavior.
---

# Flutter View Refactor

## Overview

Refactor toward small views, explicit dependencies, and predictable lifetimes. Keep user-visible behavior intact unless the task requests a product change.

Read `references/refactor-checklist.md` before editing a large screen.

## Core Guidelines

### 1. Separate wiring from rendering

- Keep repository and service construction in app wiring.
- Keep feature commands and data transformation in view models.
- Pass immutable render state and callbacks into views.
- Keep reusable leaf widgets unaware of global dependencies.

### 2. Extract meaningful widgets

- Split long `build` methods by visual section or reuse boundary.
- Use dedicated widgets when a section has state, branching, semantics, or independent tests.
- Pass only the values and callbacks a child needs.
- Prefer `const` constructors where inputs allow them.

### 3. Move work out of build

- Move I/O, platform calls, sorting, parsing, and expensive mapping outside `build`.
- Avoid creating controllers, subscriptions, and futures repeatedly during rebuild.
- Dispose controllers, focus nodes, animation controllers, and subscriptions in the owning lifecycle.

### 4. Preserve stable identity

- Use keys where list reordering, state preservation, or tests require identity.
- Use lazy builders for large lists.
- Avoid rebuilding broad trees for narrowly changing state.

## Workflow

1. Build or record the existing failure.
2. Identify state owners, view models, services, routes, and lifecycle resources.
3. Extract app wiring from view rendering.
4. Move non-trivial callbacks and transformations out of widget trees.
5. Split meaningful sections and narrow parameters.
6. Verify keys and lifecycle disposal.
7. Run format, analysis, tests, and the same target flow.

## Guardrails

- Do not add an architecture layer solely to shorten a file.
- Do not change route semantics during a layout-only refactor.
- Do not promote local state to app state without a sharing or lifetime reason.
- Do not claim a performance improvement without measuring when performance is the goal.
