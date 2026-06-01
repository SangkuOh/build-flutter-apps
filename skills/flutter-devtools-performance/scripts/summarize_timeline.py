#!/usr/bin/env python3
"""Summarize long-duration events in exported Flutter or Dart timeline JSON."""

import argparse
import json
from pathlib import Path
from typing import Any, Dict, List, Optional


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Summarize long-duration events in exported Flutter or Dart timeline JSON."
    )
    parser.add_argument("timeline", type=Path, help="Path to an exported timeline JSON file.")
    parser.add_argument("--top", type=int, default=20, help="Number of events to print.")
    return parser.parse_args()


def find_trace_events(payload: Any) -> Optional[List[Dict[str, Any]]]:
    if not isinstance(payload, dict):
        return None

    events = payload.get("traceEvents")
    if isinstance(events, list):
        return [event for event in events if isinstance(event, dict)]

    for key in ("timeline", "data", "result"):
        found = find_trace_events(payload.get(key))
        if found is not None:
            return found

    return None


def duration_us(event: Dict[str, Any]) -> float:
    value = event.get("dur", 0)
    return float(value) if isinstance(value, (int, float)) else 0.0


def main() -> int:
    args = parse_args()
    payload = json.loads(args.timeline.read_text(encoding="utf-8"))
    events = find_trace_events(payload)
    if events is None:
        raise SystemExit("error: traceEvents array not found")

    duration_events = [event for event in events if duration_us(event) > 0]
    duration_events.sort(key=duration_us, reverse=True)

    print(f"events: {len(events)}")
    print(f"duration_events: {len(duration_events)}")
    print("\ntop_duration_events:")
    for event in duration_events[: args.top]:
        name = str(event.get("name", "<unnamed>"))
        category = str(event.get("cat", ""))
        print(f"{duration_us(event) / 1000.0:10.3f} ms  {name}  [{category}]")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
