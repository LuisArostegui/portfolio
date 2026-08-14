---
name: portfolio-cloudflare
description: Configure, review, validate, or deploy the Portfolio MVP on Cloudflare Workers Static Assets or with Wrangler. Use only for Cloudflare configuration, deployment, or runtime compatibility work.
---

# Portfolio Cloudflare delivery

## Purpose

Keep deployment work consistent with the approved static-hosting architecture while treating Cloudflare configuration and Wrangler syntax as time-sensitive.

## Procedure

1. Read `AGENTS.md`, the linked issue, and ADR-0005 before editing configuration or deployment files.
2. Retrieve current Cloudflare documentation or load the official `wrangler` skill before writing or reviewing Wrangler commands and configuration.
3. Confirm that the proposed output is static assets plus only the approved Worker behaviour. Do not introduce server features, bindings, or platform services without a linked decision.
4. Check runtime compatibility explicitly. Do not assume Node.js APIs are available in Worker code.
5. Keep environment-specific values, credentials, and deployment secrets outside committed files.
6. Run deployment or remote mutations only when the task explicitly authorises them; otherwise provide a local or dry-run validation result.

## References

- `docs/architecture/decisions/0005-use-cloudflare-workers-static-assets-for-hosting.md`
- https://github.com/cloudflare/skills/tree/main/skills/wrangler
