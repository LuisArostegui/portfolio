$ErrorActionPreference = "Stop"

$requiredPaths = @(
  "AGENTS.md",
  "README.md",
  "config.example.toml",
  "agents/architect.toml",
  "agents/explorer.toml",
  "agents/frontend.toml",
  "agents/qa.toml",
  "agents/reviewer.toml",
  "agents/writer.toml",
  "prompts/issue-analysis.md",
  "prompts/implement.md",
  "prompts/review.md",
  "prompts/pr-description.md",
  "scripts/create-worktree.sh",
  "scripts/cleanup-worktrees.sh"
)

$missing = @()

foreach ($path in $requiredPaths) {
  if (-not (Test-Path -LiteralPath $path)) {
    $missing += $path
  }
}

if ($missing.Count -gt 0) {
  foreach ($path in $missing) {
    Write-Error "missing: $path"
  }

  exit 1
}

$agentFiles = Get-ChildItem -LiteralPath "agents" -Filter "*.toml"

foreach ($file in $agentFiles) {
  $content = Get-Content -Raw -LiteralPath $file.FullName

  if ($content -match 'model\s*=\s*"gpt-') {
    Write-Error "agent uses a concrete model instead of a placeholder: $($file.Name)"
    exit 1
  }

  if ($content -notmatch 'model\s*=\s*"<(MAIN|FAST|REVIEW)_MODEL>"') {
    Write-Error "agent is missing an approved model placeholder: $($file.Name)"
    exit 1
  }

  if ($content -match '(?m)^reasoning_effort\s*=') {
    Write-Error "agent uses legacy reasoning_effort instead of model_reasoning_effort: $($file.Name)"
    exit 1
  }

  if ($content -notmatch 'model_reasoning_effort\s*=\s*"(minimal|low|medium|high|xhigh)"') {
    Write-Error "agent is missing model_reasoning_effort: $($file.Name)"
    exit 1
  }

  if ($content -notmatch 'developer_instructions\s*=\s*"""') {
    Write-Error "agent is missing developer_instructions: $($file.Name)"
    exit 1
  }
}

$config = Get-Content -Raw -LiteralPath "config.example.toml"

if ($config -match '\[features\]') {
  Write-Error "config.example.toml should not use the legacy [features] multi_agent block"
  exit 1
}

if ($config -match '(?m)^max_threads\s*=|^max_depth\s*=') {
  Write-Error "config.example.toml should not use legacy max_threads or max_depth keys"
  exit 1
}

if ($config -notmatch 'enabled\s*=\s*true') {
  Write-Error "config.example.toml must enable agents"
  exit 1
}

if ($config -notmatch 'max_concurrent_threads_per_session\s*=\s*4') {
  Write-Error "config.example.toml must set max_concurrent_threads_per_session"
  exit 1
}

if ($config -notmatch 'default_subagent_model\s*=\s*"<FAST_MODEL>"') {
  Write-Error "config.example.toml must use <FAST_MODEL> as the default subagent placeholder"
  exit 1
}

foreach ($name in @("architect", "explorer", "frontend", "qa", "reviewer", "writer")) {
  if ($config -notmatch "\[agents\.$name\]") {
    Write-Error "config.example.toml is missing [agents.$name]"
    exit 1
  }

  if ($config -notmatch "(?s)\[agents\.$name\].*?description\s*=\s*""[^""]+""") {
    Write-Error "config.example.toml is missing description for $name"
    exit 1
  }

  if ($config -notmatch "config_file\s*=\s*""agents/$name\.toml""") {
    Write-Error "config.example.toml is missing config_file for $name"
    exit 1
  }
}

Write-Host "Template structure OK"
