#!/usr/bin/env bash
set -euo pipefail

required_paths=(
  "AGENTS.md"
  "README.md"
  "config.example.toml"
  "agents/architect.toml"
  "agents/explorer.toml"
  "agents/frontend.toml"
  "agents/qa.toml"
  "agents/reviewer.toml"
  "agents/writer.toml"
  "prompts/issue-analysis.md"
  "prompts/implement.md"
  "prompts/review.md"
  "prompts/pr-description.md"
  "scripts/create-worktree.sh"
  "scripts/cleanup-worktrees.sh"
)

missing=0

for path in "${required_paths[@]}"; do
  if [[ ! -e "$path" ]]; then
    printf 'missing: %s\n' "$path" >&2
    missing=1
  fi
done

for script in scripts/*.sh; do
  bash -n "$script"
done

if grep -R -nE 'model = "gpt-|^reasoning_effort = ' agents config.example.toml; then
  printf 'legacy or concrete model configuration found\n' >&2
  missing=1
fi

if grep -nE '^\[features\]|^max_threads = |^max_depth = ' config.example.toml; then
  printf 'legacy agent configuration found in config.example.toml\n' >&2
  missing=1
fi

for name in architect explorer frontend qa reviewer writer; do
  if ! grep -q "\\[agents\\.$name\\]" config.example.toml; then
    printf 'missing config section: [agents.%s]\n' "$name" >&2
    missing=1
  fi

  if ! awk "/\\[agents\\.$name\\]/{flag=1; next} /^\\[agents\\./{flag=0} flag && /^description = \".+\"/{found=1} END{exit !found}" config.example.toml; then
    printf 'missing description for agent: %s\n' "$name" >&2
    missing=1
  fi

  if ! grep -q "config_file = \"agents/$name.toml\"" config.example.toml; then
    printf 'missing config_file for agent: %s\n' "$name" >&2
    missing=1
  fi

  if ! grep -qE 'model_reasoning_effort = "(minimal|low|medium|high|xhigh)"' "agents/$name.toml"; then
    printf 'missing model_reasoning_effort for agent: %s\n' "$name" >&2
    missing=1
  fi
done

if [[ "$missing" -eq 0 ]]; then
  printf 'Template structure OK\n'
fi

exit "$missing"
