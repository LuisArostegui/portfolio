# Repository labels

Labels classify issues and pull requests across independent dimensions. Their prefixes make the backlog predictable to filter and prevent labels with overlapping meanings.

## Usage rules

- Apply exactly one `type:` label to describe the kind of work.
- Apply zero or more `area:` labels to identify the affected parts of the project.
- Apply one `priority:` label to planned work. A priority may be omitted while an item is still being triaged.
- Apply zero or one `status:` label only when it communicates information beyond GitHub's open or closed state.
- Reassess labels when the scope or readiness of an item changes.

## Type labels

| Label                  | Color     | Description                                                           |
| ---------------------- | --------- | --------------------------------------------------------------------- |
| `type: feature`        | `#1D76DB` | User-visible functionality or product capability.                     |
| `type: bug`            | `#D73A4A` | Incorrect or unexpected behavior that requires a fix.                 |
| `type: technical-task` | `#5319E7` | Configuration, maintenance, or other technical work.                  |
| `type: decision`       | `#8250DF` | Evaluation and documentation of an architectural or product decision. |
| `type: documentation`  | `#0075CA` | Documentation-only work or documentation improvements.                |
| `type: refactor`       | `#0E8A16` | Internal code improvement without changing expected behavior.         |
| `type: testing`        | `#BFD4F2` | Test coverage, test tooling, or quality verification work.            |

## Area labels

| Label                  | Color     | Description                                                    |
| ---------------------- | --------- | -------------------------------------------------------------- |
| `area: frontend`       | `#006B75` | Frontend application structure, behavior, or implementation.   |
| `area: design`         | `#C5DEF5` | Visual design, interaction design, or design-system work.      |
| `area: content`        | `#FBCA04` | Portfolio copy, media, localization, or content structure.     |
| `area: accessibility`  | `#D4C5F9` | Accessibility requirements, audits, or improvements.           |
| `area: infrastructure` | `#545454` | Repository configuration, tooling, and project infrastructure. |
| `area: ci-cd`          | `#0052CC` | Continuous integration and delivery workflows.                 |
| `area: hosting`        | `#008672` | Deployment environments, domains, or hosting platforms.        |

## Priority labels

| Label              | Color     | Description                                                |
| ------------------ | --------- | ---------------------------------------------------------- |
| `priority: high`   | `#B60205` | Urgent work with high impact or a near-term deadline.      |
| `priority: medium` | `#D93F0B` | Important planned work without immediate urgency.          |
| `priority: low`    | `#FEF2C0` | Useful work that can be scheduled after higher priorities. |

## Status labels

| Label                    | Color     | Description                                                   |
| ------------------------ | --------- | ------------------------------------------------------------- |
| `status: blocked`        | `#000000` | Cannot progress until a dependency or impediment is resolved. |
| `status: ready`          | `#2DA44E` | Defined and ready to be implemented.                          |
| `status: needs-decision` | `#A371F7` | Requires a decision before implementation can continue.       |

## Automatic labels

GitHub Issue Forms apply the appropriate type label automatically:

| Issue form             | Applied label          |
| ---------------------- | ---------------------- |
| Feature                | `type: feature`        |
| Technical task         | `type: technical-task` |
| Architectural decision | `type: decision`       |
| Bug report             | `type: bug`            |

Area, priority, and status labels are assigned during triage because they depend on the issue's context and current workflow state.
