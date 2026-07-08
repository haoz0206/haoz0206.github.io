# Deployment & Domain Configuration

Operational reference for `haoz0206.github.io` (the site served at **https://me.haoz.uk**).
For day-to-day content edits see [README.md](README.md); this file documents hosting, DNS, and HTTPS.

---

## 1. Overview

| Item | Value |
|---|---|
| Live URL | **https://me.haoz.uk** |
| Hosting | GitHub Pages (user site) |
| Repository | `haoz0206/haoz0206.github.io` |
| Publishing branch | `master` (root, `/`) |
| Custom domain | `me.haoz.uk` (subdomain of `haoz.uk`, DNS on Cloudflare) |
| TLS certificate | Let's Encrypt, auto-provisioned & auto-renewed by GitHub |
| Enforce HTTPS | On |
| Redirects | `http://me.haoz.uk` → `https://me.haoz.uk`; `haoz0206.github.io` → `https://me.haoz.uk` (301) |

Because this repo is named `<user>.github.io`, **pushing to `master` auto-publishes** — no Actions/workflow needed. The `.nojekyll` file makes GitHub serve files as-is.

---

## 2. Repository layout

```
index.html        page shell + <head> SEO (canonical, OG, Twitter, JSON-LD)
css/style.css     styles (light/dark via [data-theme])
js/data.js        <-- SINGLE SOURCE OF TRUTH for all content
js/main.js        renders data.js + theme/pub-filter toggles
assets/img/       favicon.svg, og.png (social card), avatar.svg (unused)
CNAME             custom domain: me.haoz.uk  (do not edit casually — see §4)
sitemap.xml       lists https://me.haoz.uk/
robots.txt        allows all + points to sitemap
.nojekyll         serve static files without Jekyll
```

Deploy workflow: edit `js/data.js` → `git commit` → `git push origin master`. Live within ~1 min.

---

## 3. DNS configuration (Cloudflare, zone `haoz.uk`)

| Type | Name | Content / Target | Proxy | Purpose |
|---|---|---|---|---|
| **CNAME** | `me` | `haoz0206.github.io` | **DNS only (grey cloud)** | Points the subdomain at GitHub Pages |
| **TXT** | `_github-pages-challenge-haoz0206` | *(token from GitHub)* | — | Account-level domain verification (anti-takeover) |

Notes:
- **The `me` CNAME must stay grey-cloud (DNS only).** Orange-cloud/proxy causes cert-provisioning failures and 502s.
- It correctly resolves to GitHub Pages IPs `185.199.108–111.153` (and IPv6 `2606:50c0::…`).
- The TXT value comes from GitHub → repo **Settings → Pages → "Verify domains"**. Verifying the apex `haoz.uk` also covers subdomains like `me.haoz.uk`. Verification is optional (security), **not** required for HTTPS.
- No **CAA** record exists on `haoz.uk`, so Let's Encrypt is allowed by default. If you ever add CAA records, include one for `letsencrypt.org` or HTTPS will break.
- SOA **negative-cache TTL is 30 min** — after any DNS change, stale/"no record" answers can persist in resolvers for up to 30 minutes.

### Verify DNS from the command line
```bash
dig +short me.haoz.uk A            # expect 185.199.108–111.153
dig +short me.haoz.uk CNAME        # expect haoz0206.github.io.
curl -sI https://me.haoz.uk/       # expect HTTP/2 200, Server: GitHub.com
```

---

## 4. Custom domain & HTTPS on GitHub

Configured under repo **Settings → Pages**:
- **Custom domain**: `me.haoz.uk` (also stored in the repo `CNAME` file — keep the two in sync).
- **Enforce HTTPS**: enabled.

Correct one-time setup order (already done): add the DNS CNAME → set the custom domain in Settings/`CNAME` file → wait for GitHub's DNS check → GitHub requests the Let's Encrypt cert → enable Enforce HTTPS.

Cert issuance can take **up to ~1 hour** after configuration (the "Enforce HTTPS" checkbox can take up to 24 h to become available). The cert renews automatically; no action needed.

---

## 5. SEO

Already in place (edit in `index.html` / `js/data.js`):
- `<title>` with name + area + affiliation, meta description, `<link rel="canonical">`
- Open Graph + Twitter Card tags → social share image `assets/img/og.png` (1200×630)
- JSON-LD `Person` structured data (with `sameAs` → GitHub, Google Scholar)
- `sitemap.xml` + `robots.txt`

To improve ranking further: add `https://me.haoz.uk` in Google Search Console and submit the sitemap; link to it from Google Scholar, GitHub profile, and lab/co-author pages.

---

## 6. Troubleshooting

**HTTPS not available / "domain not properly configured":** usually the cert just hasn't provisioned yet (look at the *DNS Check* line — "in progress" = wait, not an error). Verify DNS with the commands in §3.

**Cert stuck / not issuing:** confirm DNS resolves correctly from several resolvers (`1.1.1.1`, `8.8.8.8`, `9.9.9.9`), that the record isn't proxied, and that no blocking CAA exists. The documented fix is to **remove and re-add the custom domain once** (Settings → Pages) after DNS is correct — then wait. **Do not** repeatedly remove/re-add; that can hit Let's Encrypt rate limits and reset the timer.

**Site unreachable from one device/network but fine elsewhere:** local DNS negative cache (see §3, 30-min TTL). Flush DNS (`ipconfig /flushdns` on Windows; `sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder` on macOS; toggle airplane mode on iOS) or switch the device to `1.1.1.1`/`8.8.8.8`.

**⚠️ Golden rule:** don't delete or re-touch the `me` CNAME record unless truly necessary — breaking it stops the site *and* HTTPS, and every change incurs up to 30 min of DNS negative-cache lag.

---

## 7. Open items / TODO

- LLaDA 2.1 — confirm exact author position (currently "et al. (Hao Zhong among authors)").
- CVPR 2026 papers *Exploring Spatial Intelligence* and *Preserving Source Video Realism* — add a `Poster`/`Oral` badge once presentation type is known (currently shown as `CVPR 2026`, acceptance confirmed).
- Add a real headshot and per-paper teaser images (optional; site currently text-only).
- Google Search Console + backlinks (see §5).
