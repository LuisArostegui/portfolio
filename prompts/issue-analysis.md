# Issue Analysis Prompt

Use this with Explorer before implementation starts.

```text
Analyze this repository for issue: <ISSUE_ID_OR_TITLE>

Context:
<PASTE_ISSUE_CONTEXT>

Deliver:
- Current behavior and likely relevant files.
- Project conventions that matter.
- Risks and unknowns.
- Suggested implementation path.
- Suggested tests.

Constraints:
- Do not modify files.
- Ground claims in file references.
- Keep the answer concise and actionable.
```
