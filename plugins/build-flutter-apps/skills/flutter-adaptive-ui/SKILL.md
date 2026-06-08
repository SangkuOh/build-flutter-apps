---
name: flutter-adaptive-ui
description: Implement and review adaptive, responsive, accessible Flutter UI across mobile, tablet, foldable, desktop, and web targets. Use when building layouts that respond to available window size, switching navigation patterns, handling SafeArea and MediaQuery data, supporting keyboard or pointer input, restoring state across resize, or refining platform-aware Material and Cupertino behavior.
---

# Flutter Adaptive UI

## Overview

Build UI for the current window and input model, not for guessed device categories. Responsive UI fits the available space; adaptive UI remains usable in that space.

Read `references/adaptive-checklist.md` before implementing a new shell or reviewing a layout issue.

## Workflow

1. List the intended platforms, window ranges, and input methods.
2. Abstract shared content from the widgets that change layout.
3. Use `MediaQuery`, `LayoutBuilder`, `SafeArea`, and constraints deliberately.
4. Switch navigation or pane composition when the available window makes a different interaction model useful.
5. Verify resize, rotation, text scale, keyboard traversal, pointer hover, scroll wheel, and restoration behavior where relevant.

## Strong Defaults

- Avoid checks such as `isTablet` or platform model names for layout decisions.
- Use `NavigationBar` for compact layouts and `NavigationRail` or wider navigation patterns when space permits.
- Keep text lines readable instead of stretching content across the full window.
- Preserve list and navigation state during layout changes.
- Use Material and Cupertino behavior deliberately when platform conventions differ.
- Keep accessibility semantics, focus traversal, and touch-target sizing intact.

## Review Checklist

- Content is not obscured by system UI or unsafe areas.
- Layout responds to the actual window.
- Expanded layouts add useful structure instead of only whitespace.
- Mouse, keyboard, touch, and assistive-technology paths remain coherent.
- State survives resize, rotation, and navigation changes.
