# CLAUDE.md — frederico-site

Website for visual artist **Frederico Theophilo Neto**.
Domain: **fredericotheophiloneto.com** · GitHub: `mindtech111/frederico-site`

## Stack
- **Framework**: Next.js 16 (App Router) + TypeScript + Tailwind CSS
- **CMS**: Sanity.io — Project ID `qasd0k09`, dataset `production`. Studio embedded at `/studio`.
- **i18n**: next-intl — locales `en` (default), `de`, `pt`
- **Hosting**: Cloudflare Workers via OpenNext (`@opennextjs/cloudflare`)
- **Node**: v20 (nvm) — shell does not auto-load nvm (see below)

## Key files
- `src/sanity/schemas/` — content schemas
- `src/lib/queries.ts` — all GROQ queries
- `src/i18n/` — routing, request config, locale config
- `messages/` — translation JSON (`en`, `de`, `pt`)
- `src/app/[locale]/` — locale-based pages
- `src/proxy.ts` — next-intl middleware (Next.js 16 uses `proxy.ts`, **not** `middleware.ts`)
- `next.config.ts` — `withNextIntl` plugin → `./src/i18n/request.ts`
- `wrangler.toml` — Cloudflare Worker config (custom domains, Sanity env vars)

## Sanity content types
`homepageImage`, `work`, `exhibition`, `press`, `news`, `artist` (singleton), `contact` (singleton)

## Commands
```bash
npm run dev       # local dev server
npm run build     # next build
npm run preview   # opennext build + wrangler dev (local CF runtime)
npm run deploy    # opennext build + wrangler deploy → Cloudflare Workers (LIVE)
```

### Node / nvm workaround
The shell doesn't auto-load nvm. Prefix commands with the explicit Node path:
```bash
env PATH="/Users/marcoscantoni/.nvm/versions/node/v20.20.0/bin:$PATH" sh -c 'cd <repo> && <command>'
```
(A no-spaces symlink such as `/tmp/frederico-work` → repo also avoids path-quoting issues.)

## Deployment notes
- **Live deploy is `npm run deploy`** (wrangler → Cloudflare Workers). It does **not** go through GitHub — Cloudflare auth (`wrangler login` / `CLOUDFLARE_API_TOKEN`) is what deploys, separate from any GitHub token.
- **`git push`** is for code history only. Auth is via the **GitHub CLI** (`gh auth setup-git`, helper `!gh auth git-credential`) — gh is logged in as `mindtech111`. The token is **not** stored in the git remote URL — keep it that way (this repo lives on iCloud Drive, so never embed credentials in `.git/config`).
- The classic PAT "frederico-site deploy" is **not needed** (git uses the gh OAuth token; deploy uses Cloudflare/wrangler). It can be deleted to stop GitHub's recurring expiry emails.
