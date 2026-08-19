# PR Description Prompt

Use this with Writer after final verification.

```text
Draft a PR description from the current diff and verification output.

Include:
- Summary.
- Changes.
- Tests and verification.
- Risks or follow-up work.

Inputs:
- Issue: <ISSUE_LINK_OR_TEXT>
- Diff summary: <DIFF_SUMMARY>
- Verification output: <TEST_OUTPUT>

Keep it concise and factual. Do not invent changes.
```

