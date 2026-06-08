#!/usr/bin/env python3
"""Rank allocation changes between exported memory snapshot CSV files."""

import argparse
import csv
from pathlib import Path
from typing import Dict, Iterable, List, Optional, Tuple

CLASS_COLUMNS = ("Class", "Class Name", "class", "className", "Name")
INSTANCE_COLUMNS = ("Instances", "Instance Count", "instances", "count", "Count")
BYTES_COLUMNS = ("Shallow Size", "Retained Size", "Bytes", "bytes", "Size", "size")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Rank class allocation growth between two exported memory CSV snapshots."
    )
    parser.add_argument("before", type=Path, help="Baseline allocation CSV file.")
    parser.add_argument("after", type=Path, help="Later allocation CSV file.")
    parser.add_argument("--top", type=int, default=20, help="Number of classes to print.")
    return parser.parse_args()


def find_column(fieldnames: Iterable[str], candidates: Iterable[str]) -> Optional[str]:
    available = set(fieldnames)
    return next((candidate for candidate in candidates if candidate in available), None)


def parse_number(value: str) -> int:
    normalized = value.replace(",", "").replace("_", "").strip()
    return int(float(normalized)) if normalized else 0


def load_snapshot(path: Path) -> Tuple[Dict[str, Tuple[int, int]], bool, bool]:
    with path.open(newline="", encoding="utf-8-sig") as handle:
        reader = csv.DictReader(handle)
        fieldnames = reader.fieldnames or []
        class_column = find_column(fieldnames, CLASS_COLUMNS)
        instance_column = find_column(fieldnames, INSTANCE_COLUMNS)
        bytes_column = find_column(fieldnames, BYTES_COLUMNS)

        if class_column is None:
            raise ValueError(f"{path}: class column not found")
        if instance_column is None and bytes_column is None:
            raise ValueError(f"{path}: allocation count or size column not found")

        snapshot: Dict[str, Tuple[int, int]] = {}
        for row in reader:
            class_name = row.get(class_column, "").strip()
            if not class_name:
                continue
            instances = parse_number(row.get(instance_column, "")) if instance_column else 0
            byte_count = parse_number(row.get(bytes_column, "")) if bytes_column else 0
            previous_instances, previous_bytes = snapshot.get(class_name, (0, 0))
            snapshot[class_name] = (
                previous_instances + instances,
                previous_bytes + byte_count,
            )

        return snapshot, instance_column is not None, bytes_column is not None


def main() -> int:
    args = parse_args()
    before, before_instances, before_bytes = load_snapshot(args.before)
    after, after_instances, after_bytes = load_snapshot(args.after)
    use_bytes = before_bytes and after_bytes
    use_instances = before_instances and after_instances

    classes = set(before) | set(after)
    growth: List[Tuple[int, int, str]] = []
    for class_name in classes:
        before_instance_count, before_byte_count = before.get(class_name, (0, 0))
        after_instance_count, after_byte_count = after.get(class_name, (0, 0))
        growth.append(
            (
                after_byte_count - before_byte_count,
                after_instance_count - before_instance_count,
                class_name,
            )
        )

    growth.sort(key=lambda item: (item[0] if use_bytes else item[1], item[1]), reverse=True)
    print(f"classes: {len(classes)}")
    print(f"ranked_by: {'bytes' if use_bytes else 'instances'}")
    print("\ntop_growth:")
    for byte_delta, instance_delta, class_name in growth[: args.top]:
        byte_text = f"{byte_delta:12d} bytes" if use_bytes else "           - bytes"
        instance_text = (
            f"{instance_delta:10d} instances" if use_instances else "         - instances"
        )
        print(f"{byte_text}  {instance_text}  {class_name}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
