# Review Prompt

Use this with Reviewer after implementation and tests.

```text
Review the current diff.

Focus:
- Bugs and regressions.
- Architecture and maintainability.
- Accessibility.
- Performance.
- Missing or weak tests.

Output:
- Findings first, ordered by severity.
- File and line references when possible.
- Open questions or assumptions.
- Brief summary only after findings.

Do not implement changes.
```
