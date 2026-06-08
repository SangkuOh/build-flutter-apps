# Flutter Deep Links

## Routing Choice

- Use `Navigator` for small apps without complex deep-link requirements.
- Use `Router` or a routing package when deep links, browser URL synchronization, or nested
  navigation require declarative routing.
- Keep URI parsing in one typed routing layer.

## Validation

- Test cold start and warm start.
- Test malformed and missing parameters.
- Test Android App Links, iOS Universal Links, and web URL behavior independently.
- Confirm back-stack behavior after inbound navigation.
- Use DevTools deep-link validation for Android and iOS setup where available.

## Platform Notes

- Android requires intent filters and App Link verification for owned HTTPS domains.
- iOS requires Universal Link associated-domain configuration for owned HTTPS domains.
- If a custom plugin handles deep links, account for Flutter's default deep-link handler.

Official docs:

- Deep linking: `https://docs.flutter.dev/ui/navigation/deep-linking`
- Navigation and routing: `https://docs.flutter.dev/ui/navigation`
- DevTools deep-link validator: `https://docs.flutter.dev/tools/devtools/deep-links`
