# Podforge AI

AI podcast video studio for planning multi-speaker episodes. Turn a topic and target runtime into a production-ready outline with timed segments, talking points, and production notes.

## Features

- **Topic entry** — Validate and normalize episode topics (3–160 characters).
- **Duration selector** — Choose a whole-minute runtime from 1 to 30 minutes.
- **Episode outline** — Generate a paced structure (cold open through close) aligned with the [MASTER_PROMPT.md](./MASTER_PROMPT.md) editorial workflow.

## Development

```sh
npm test
python3 -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000) and walk through the three-step planner: topic → duration → outline.

No `npm install` is required — there are no runtime dependencies.

## Project structure

```
├── index.html          # App shell
├── MASTER_PROMPT.md    # AI assistant system prompt spec
├── package.json
├── src/
│   ├── app.js          # Wizard UI
│   ├── duration.js     # Runtime validation
│   ├── outline.js      # Outline generation
│   ├── session.js      # Wizard state
│   ├── styles.css
│   └── topic.js        # Topic validation and briefs
└── test/               # Node.js built-in test runner
```

## Tech stack

- Static HTML/CSS/ES modules
- Node.js built-in test runner (`node --test`)
- No bundler, backend, or database
