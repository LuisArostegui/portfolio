#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'USAGE'
Usage:
  scripts/cleanup-worktrees.sh [--dry-run] [worktrees-dir]

Examples:
  scripts/cleanup-worktrees.sh --dry-run
  scripts/cleanup-worktrees.sh ../worktrees

Removes git worktrees under the chosen directory only when their working tree is clean.
USAGE
}

dry_run=false
worktrees_dir="../worktrees"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --dry-run)
      dry_run=true
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      worktrees_dir="$1"
      shift
      ;;
  esac
done

if ! git rev-parse --show-toplevel >/dev/null 2>&1; then
  echo "error: run this script inside a git repository" >&2
  exit 1
fi

repo_root="$(git rev-parse --show-toplevel)"
cd "$repo_root"

if [[ ! -d "$worktrees_dir" ]]; then
  printf 'no worktrees directory found: %s\n' "$worktrees_dir"
  exit 0
fi

while IFS= read -r -d '' path; do
  if [[ ! -d "$path/.git" && ! -f "$path/.git" ]]; then
    continue
  fi

  if [[ -n "$(git -C "$path" status --short)" ]]; then
    printf 'skip dirty worktree: %s\n' "$path" >&2
    continue
  fi

  if [[ "$dry_run" == true ]]; then
    printf 'would remove: %s\n' "$path"
  else
    git worktree remove "$path"
    printf 'removed: %s\n' "$path"
  fi
done < <(find "$worktrees_dir" -mindepth 1 -maxdepth 1 -type d -print0)

git worktree prune
