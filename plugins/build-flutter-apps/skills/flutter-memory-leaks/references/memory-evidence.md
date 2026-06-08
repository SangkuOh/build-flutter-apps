# Memory Evidence

## Capture Discipline

Capture evidence around a repeatable flow:

1. Launch the app and reach an idle baseline.
2. Take a memory snapshot.
3. Perform the suspect navigation, scrolling, image, or platform operation.
4. Return to the original state and allow disposal and garbage collection.
5. Take another snapshot and compare retained instances.
6. Repeat the flow to distinguish one-time caching from unbounded growth.

## Common Retention Sources

- controllers, focus nodes, animation controllers, and stream subscriptions
  that are not disposed
- listeners registered on long-lived services
- closures that retain widget state or a build context
- image caches and decoded image pressure
- platform channel callbacks and native resources
- static collections, service locators, and global caches

## DevTools Workflow

Use the Memory view to inspect snapshots, diffs, trace instances, and retaining
paths. A growing class count is a lead, not proof. Confirm why instances remain
reachable and whether growth repeats after the same user flow.

Use `scripts/compare_allocation_csv.py` for exported CSV snapshots when a quick
before-after ranking is useful.
