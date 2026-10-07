# Shaba collaboration

- Check open GitHub PRs before starting new work. Account for their branches and overlapping files; keep dependent PRs explicit.
- Commit on feature branches and push those branches to create a PR for each completed task. Do not push directly to main or merge PRs; the user reviews and merges them.

# Design work

For Shaba visual changes, read `docs/design-system.md` and `styles/shaba-tokens.css`. Use the `shaba-design-system` skill when available; the versioned source is `skills/shaba-design-system/SKILL.md`.

Use the installed frontend-design skill for composition, web-design-guidelines for interface review, and Playwright or the environment's browser tools to inspect rendered results. Preserve admin authentication and published/draft behavior during design changes. Treat the documented palette and typography as the initial working direction and evolve them consistently through review.
