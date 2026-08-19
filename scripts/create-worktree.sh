#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'USAGE'
Usage:
  scripts/create-worktree.sh <branch-name> [base-branch] [worktrees-dir]

Examples:
  scripts/create-worktree.sh PT-65
  scripts/create-worktree.sh PT-65 main ../worktrees

Creates a git worktree for a feature branch without switching the current checkout.
USAGE
}

if [[ "${1:-}" == "-h" || "${1:-}" == "--help" ]]; then
  usage
  exit 0
fi

branch="${1:-}"
base_branch="${2:-main}"
worktrees_dir="${3:-../worktrees}"

if [[ -z "$branch" ]]; then
  usage >&2
  exit 2
fi

if ! git rev-parse --show-toplevel >/dev/null 2>&1; then
  echo "error: run this script inside a git repository" >&2
  exit 1
fi

repo_root="$(git rev-parse --show-toplevel)"
cd "$repo_root"

target_dir="$worktrees_dir/$branch"
mkdir -p "$worktrees_dir"

if git show-ref --verify --quiet "refs/heads/$branch"; then
  git worktree add "$target_dir" "$branch"
else
  git worktree add -b "$branch" "$target_dir" "$base_branch"
fi

printf 'created worktree: %s\n' "$target_dir"
