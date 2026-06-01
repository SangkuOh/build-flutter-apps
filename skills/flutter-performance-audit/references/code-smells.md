# Flutter Performance Code Smells

## Build And Rebuild

- Expensive parsing, sorting, filtering, or allocation in `build`.
- Broad rebuild scope for narrowly changing state.
- Rebuilding static subtrees that could use `const`.
- Creating futures, streams, controllers, or subscriptions during rebuild.

## Lists And Layout

- Eager children for long lists or grids instead of builder APIs.
- Intrinsic layout passes in hot scrolling paths.
- Deep nested layout work for repeated list items.
- Unbounded constraints or repeated measurement work.

## Paint And Raster

- Unnecessary `saveLayer`.
- Large parent-level `Opacity`, clipping, shadows, or filters.
- Missing `RepaintBoundary` around an expensive subtree that can be cached.
- Adding `RepaintBoundary` everywhere without measuring raster-cache cost.

## Images

- Decoding full-resolution images for small display regions.
- Missing cache sizing.
- Large images retained longer than needed.

## Investigation Order

1. Narrow rebuild scope and move work out of `build`.
2. Use lazy lists and remove unnecessary intrinsic passes.
3. Inspect late UI frames and raster frames separately.
4. Inspect paint effects and images.
5. Capture CPU profile for remaining Dart work.

Official docs:

- Best practices: `https://docs.flutter.dev/perf/best-practices`
- UI profiling: `https://docs.flutter.dev/perf/ui-performance`
