# Commit writing guide

Use short, clear messages that explain **why** the change exists, not a file-by-file list of what changed.

## Format

```
<type>: <summary>
```

Optional body after a blank line when the why is not obvious from the summary.

```
<type>: <summary>

<why this change is needed>
```

## Types

| Type | Use when |
| --- | --- |
| `feat` | Add a new capability |
| `fix` | Correct a bug |
| `docs` | Change documentation only |
| `refactor` | Change structure without changing behavior |
| `style` | Formatting or naming with no logic change |
| `chore` | Tooling, deps, or project setup |
| `test` | Add or update tests |
| `perf` | Improve performance |

## Summary rules

- Use the imperative mood: "add", "fix", "update" — not "added" or "fixes"
- Keep the first line around 50–72 characters
- Do not end the summary with a period
- Say the intent, not the files: "add login route" not "update routes.js"

## Scope (optional)

Add a scope when it helps locate the change:

```
feat(auth): add JWT login endpoint
fix(ui): correct job card overflow
```

Use `backend`, `frontend`, or a feature name (`auth`, `jobs`, `candidates`).

## Examples

**Good**

```
feat(jobs): add job listing endpoint
```

```
fix(frontend): restore empty state on candidates page
```

```
chore: add backend and frontend project folders
```

```
docs: add commit writing guide
```

**Avoid**

```
update
```

```
fixed stuff
```

```
WIP
```

```
changes to App.jsx and app.js
```

## Pull requests

When a PR covers several commits, keep each commit focused on one idea. Do not mix unrelated refactors with feature work in the same commit.
