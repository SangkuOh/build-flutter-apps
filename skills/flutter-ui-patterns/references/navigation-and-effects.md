# Navigation And Lifecycle Work

## Navigation

- Keep route ownership close to the app shell.
- Use typed destinations or a centralized parser for inbound URIs.
- Pass callbacks to leaf widgets instead of giving them the whole router.
- Verify back behavior for normal navigation and inbound deep links.
- Prefer `Router` or a routing package when deep links, nested flows, or web URL synchronization
  make imperative navigation difficult to reason about.

## Async Work

- Start I/O from view models, repositories, or lifecycle-aware orchestration.
- Avoid creating a new `Future` during every `build` unless repeated execution is intended.
- Cancel subscriptions and release controllers in the owning lifecycle.
- Keep loading, content, empty, and error states explicit.

## Controllers And Focus

- Create controllers in the owner lifecycle.
- Dispose `TextEditingController`, `AnimationController`, `FocusNode`, stream subscriptions, and
  other disposable resources.
- Pass small callbacks to children rather than exposing broad mutable owners.

Official docs:

- Navigation: `https://docs.flutter.dev/ui/navigation`
- Deep linking: `https://docs.flutter.dev/ui/navigation/deep-linking`
