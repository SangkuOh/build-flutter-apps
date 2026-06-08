# Flutter Adaptive UI Checklist

## Layout

- Decide from available constraints, not hardware category.
- Use `MediaQuery`, `LayoutBuilder`, and `SafeArea` deliberately.
- Abstract shared content before switching shell layouts.
- Consider `NavigationBar` to `NavigationRail` changes for wider windows.
- Avoid stretching readable content across the entire expanded window.
- Preserve navigation and list state across resize.

## Input And Accessibility

- Test touch, keyboard, mouse, hover, scroll wheel, and focus traversal where relevant.
- Keep semantics meaningful for assistive technologies.
- Preserve visible focus indication.
- Use shortcuts and actions deliberately for desktop-class workflows.
- Adjust visual density when target inputs justify it.

## Platform Fit

- Use Material and Cupertino behavior intentionally.
- Do not lock orientation without a product requirement.
- Do not assume physical screen size equals app-window size.
- Consider foldables, split screen, desktop resize, and browser resize.

Official docs:

- Adaptive and responsive design: `https://docs.flutter.dev/ui/adaptive-responsive`
- Best practices: `https://docs.flutter.dev/ui/adaptive-responsive/best-practices`
- Input and accessibility: `https://docs.flutter.dev/ui/adaptive-responsive/input`
