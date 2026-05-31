# AGENTS.md

Guidance for AI agents working in this repository.

## Project overview

**Podforge AI** is a static web app that guides creators through a three-step episode planner:

1. **Topic** — Enter and validate the episode topic.
2. **Duration** — Select runtime (1–30 minutes).
3. **Outline** — View a timed segment plan with talking points and production notes.

`MASTER_PROMPT.md` defines the intended AI assistant behavior for future LLM integration. Outline generation is currently rule-based in `src/outline.js`.

## Tech stack

- **UI:** Static HTML/CSS/ES modules (served over HTTP)
- **Tests:** Node.js built-in test runner (`node --test`)
- **Runtime:** Node.js 22+ (pre-installed in Cloud VMs)

## Development commands

| Task | Command |
|------|---------|
| Run tests | `npm test` |
| Serve UI locally | `python3 -m http.server 8000` then open `http://localhost:8000` |

No `npm install` is required — `package.json` has no dependencies.

## Linting

No linter or formatter is configured. Skip lint checks unless one is added to the repo.

## Cursor Cloud specific instructions

- **Services:** Only a static file server is needed. Start from the repo root with `python3 -m http.server 8000`. No backend, database, or Docker services exist.
- **Tests:** Run `npm test` from the repo root. All tests use Node's built-in runner.
- **Dependencies:** The update script runs `npm install` only when `package.json` exists. There are zero npm dependencies today.
- **Hello-world flow:** Enter a topic (e.g. "How indie coffee shops build community"), continue to duration, set 20 minutes, click **Generate outline**, and confirm the outline shows six timed segments that sum to 20 minutes.
