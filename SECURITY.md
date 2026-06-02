# Security Policy

## Secrets and credentials

Do not commit real environment files, API keys, voice provider tokens, avatar provider tokens, webhook secrets, client content, private scripts, private audio, or production credentials.

Use `.env.example` for placeholders only. Keep real values in local `.env` files or a managed secret store.

## Media and voice safety

This project may handle podcast scripts, voice workflows, avatar assets, and generated media. Avoid committing private voice data, unpublished client material, raw recordings, rendered output, or paid/licensed media.

## If a secret was committed

1. Remove the secret from the repository.
2. Rotate or revoke the exposed key in the provider dashboard.
3. Audit logs for unauthorized use.
4. Replace local credentials with fresh values.

## Reporting

Track security findings privately before publishing fixes.
