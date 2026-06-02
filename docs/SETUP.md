# Setup Guide

## Current project shape

PodForge AI is currently a workflow/prompt foundation and early project scaffold. Treat it as a creator-production system first, then an app if the product direction becomes clear.

## Requirements

- Markdown editor for prompt/workflow docs
- Node.js/npm only if a frontend app is added or already present
- Safe demo content only

## Environment setup

```bash
cp .env.example .env.local
```

Fill in local values only. Do not commit `.env` or `.env.local`.

## Suggested workflow

1. Start with an episode idea.
2. Create an episode brief.
3. Generate outline and script.
4. Create show notes.
5. Create short-form clip ideas.
6. Hand off avatar/video generation notes.
7. Package publishing assets.

## Notes

- Do not commit private scripts, client content, real voice data, or raw recordings.
- Keep generated media outside the repository unless it is a small, safe demo asset.
