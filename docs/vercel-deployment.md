# Vercel deployment policy

Automatic Git deployments are enabled only for `main`. `vercel.json` disables all other branches using `**`, which also covers names containing slashes such as `codex/google-admin-editor`. Vercel permits a deployment if any matching rule is true, so the exact `main` rule overrides the disabled wildcard.

Merging a PR into `main` triggers its deployment. Pushing to a PR branch does not create an automatic preview when that branch contains this configuration. The production branch must be `main` in Vercel's Project Settings → Environments → Production → Branch Tracking.

This is a branch policy, not a check that a commit came from a PR. A direct push to main would also deploy; the team workflow leaves merging to the user. Manual CLI/dashboard deployments and deploy hooks are outside the Git branch rule.

## Existing branches and project setup

Repository configuration is read from the branch being deployed. Merge the deployment-policy PR first, then update existing PR branches from main before further pushes. Older branches without `vercel.json` may still trigger previews.

To skip builds for all existing branches immediately, set Vercel's project-level **Ignored Build Step** to a custom command:

```sh
if [ "$VERCEL_GIT_COMMIT_REF" = "main" ]; then exit 1; else exit 0; fi
```

Vercel's exit-code convention is intentional: `0` skips the build; `1` allows the build to proceed. Enable **Automatically Expose System Environment Variables** so the branch variable is available. This setting can mark a deployment as skipped/canceled; it does not remove previous deployments or cancel an already-running build.

The repository allowlist prevents automatic deployments for branches containing the configuration. The project setting protects older branches independently of their files. Setting changes require access to the Vercel project; committing this file alone does not change dashboard settings.

Sources: [Vercel Git configuration](https://vercel.com/docs/project-configuration/git-configuration), [Ignored Build Step](https://vercel.com/kb/guide/how-do-i-use-the-ignored-build-step-field-on-vercel), [production branch configuration](https://vercel.com/docs/git#production-branch).
