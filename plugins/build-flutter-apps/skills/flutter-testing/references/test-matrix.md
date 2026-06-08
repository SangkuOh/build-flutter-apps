# Test Matrix

Choose the smallest layer that proves the behavior and add broader coverage
when platform boundaries or full flows are involved.

| Layer | Use for | Typical command |
| --- | --- | --- |
| Unit | View models, repositories, services, parsers, domain logic | `flutter test test/path_test.dart` |
| Widget | Rendering, interaction, validation, navigation state | `flutter test test/widget_test.dart` |
| Golden | Stable visual contracts with controlled fonts and dimensions | `flutter test --update-goldens` only when intentionally updating |
| Integration | Complete app flows on a selected target | `flutter test integration_test -d <device-id>` |
| Native | Android, iOS, desktop, or web host behavior | Run the host platform's own test tool |

## Verification Order

1. Format changed Dart files.
2. Run static analysis.
3. Run focused unit and widget tests.
4. Run relevant integration tests on selected Flutter targets.
5. Run native host tests when platform integration changed.
6. Record target devices and skipped coverage.
