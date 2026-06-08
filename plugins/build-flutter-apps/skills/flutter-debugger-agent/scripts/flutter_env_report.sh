#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat >&2 <<'USAGE'
Usage: flutter_env_report.sh [--help]

Prints Flutter SDK, doctor, devices, and emulator discovery output.
USAGE
}

case "${1:-}" in
  -h|--help)
    usage
    exit 0
    ;;
  "")
    ;;
  *)
    echo "Unknown argument: $1" >&2
    usage
    exit 2
    ;;
esac

if ! command -v flutter >/dev/null 2>&1; then
  echo "flutter is not installed or not on PATH." >&2
  echo "Check repo tooling such as FVM before assuming a global SDK." >&2
  exit 1
fi

printf '### flutter --version ###\n'
flutter --version
printf '\n### flutter doctor -v ###\n'
flutter doctor -v || true
printf '\n### flutter devices ###\n'
flutter devices || true
printf '\n### flutter emulators ###\n'
flutter emulators || true
