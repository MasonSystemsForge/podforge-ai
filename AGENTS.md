# AGENTS.md

Guidance for AI agents working in this repository.

## Project overview

**Podforge AI** is an early-stage AI podcast video studio. The `main` branch currently contains only a placeholder README. Runnable application code lives on feature branches:

| Branch | Contents |
|--------|----------|
| `origin/cursor/duration-selector-d93b` | Episode duration selector UI (1–30 min) + tests |
| `origin/cursor/podcast-topic-entry-b925` | Podcast topic entry UI + tests |
| `origin/cursor/add-master-prompt-b636` | `MASTER_PROMPT.md` AI assistant spec |

There is no backend, database, Docker stack, bundler, or npm dependencies yet.

## Tech stack

- **UI:** Static HTML/CSS/ES modules (served over HTTP)
- **Tests:** Node.js built-in test runner (`node --test`)
- **Runtime:** Node.js 22+ (pre-installed in Cloud VMs)

## Development commands

Check out a feature branch (or use a git worktree) before running commands:

```sh
git fetch origin cursor/duration-selector-d93b
git checkout cursor/duration-selector-d93b
```

| Task | Command |
|------|---------|
| Run tests | `npm test` |
| Serve UI locally | `python3 -m http.server 8000` then open `http://localhost:8000` |

No `npm install` is required — `package.json` has no dependencies.

## Linting

No linter or formatter is configured. Skip lint checks unless one is added to the repo.

## Cursor Cloud specific instructions

- **Branch selection:** `main` has no app code. Checkout a feature branch (see table above) or create a git worktree from one before serving the UI or running tests.
- **Services:** Only a static file server is needed for the browser UI. Start it from the repo root with `python3 -m http.server 8000`. No backend, database, or Docker services exist.
- **Tests:** Run `npm test` from a branch that includes `package.json` and the `test/` directory. All tests use Node's built-in runner — no Jest/Vitest setup.
- **Dependencies:** The update script runs `npm install` only when `package.json` exists. There are currently zero npm dependencies, so this is effectively a no-op.
- **Hello-world flow (duration selector):** Open the app, adjust the episode duration slider, click **Create episode**, and confirm the green summary message (e.g. "Episode duration selected: 20 min.").
