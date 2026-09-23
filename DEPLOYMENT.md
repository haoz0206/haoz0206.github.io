# Deployment and custom domain

Operational reference for [me.haoz.uk](https://me.haoz.uk).
For content and file organization, see [README.md](README.md).

## Hosting

| Setting | Value |
| --- | --- |
| Repository | `haoz0206/haoz0206.github.io` |
| Hosting | GitHub Pages user site |
| Publishing source | `master`, repository root (`/`) |
| Custom domain | `me.haoz.uk` |
| DNS provider | Cloudflare, zone `haoz.uk` |
| HTTPS | Enforced; certificate managed by GitHub Pages |

The publishing source is configured in repository **Settings → Pages**.
Pushing to `master` triggers GitHub's **pages build and deployment** workflow.
There is no custom workflow file or local build step. `.nojekyll` tells Pages
to serve the static files without Jekyll processing.

## Publish an approved local version

1. Preview the change locally and obtain the owner's approval to publish.
2. Review and commit the intended files on the working branch.
3. Fetch remote changes. Bring the approved commit onto `master`; when `master`
   has not diverged, use a fast-forward merge:

   ```bash
   git fetch origin
   git switch master
   git pull --ff-only origin master
   git merge --ff-only <approved-branch>
   git push origin master
   ```

   Replace `<approved-branch>` with the actual branch name. If a fast-forward
   fails, reconcile the changes and recheck the result before pushing.
4. In **Actions**, wait for **pages build and deployment** to succeed for the
   pushed commit. Publication and cache propagation can take several minutes.
5. Check the live homepage, its scripts/styles, thumbnails, HTTPS, and redirects.
   A successful push alone does not confirm the site has finished deploying.

To undo a published change, revert the relevant commit and publish the revert
through the same workflow. Do not force-push deployment history.

## DNS and HTTPS

The repository's `CNAME` file contains exactly `me.haoz.uk`. Keep it in sync
with the custom domain in **Settings → Pages**.

| Type | Name | Target | Proxy setting |
| --- | --- | --- | --- |
| CNAME | `me` | `haoz0206.github.io` | DNS only |

The DNS-only setup serves traffic directly from GitHub Pages. It resolves to
GitHub Pages addresses (`185.199.108.153` through `185.199.111.153`). Cloudflare
nameservers and the CNAME target were checked on 2026-09-23.

Domain ownership verification is a separate account-level setting under
**GitHub account Settings → Pages**. GitHub supplies a TXT challenge such as
`_github-pages-challenge-haoz0206`; use the exact name/value shown there.
Verification of `haoz.uk` also covers its immediate subdomains. Do not remove
an existing verification record during ordinary content maintenance.

GitHub manages certificate issuance and renewal. The existing configuration
uses Let's Encrypt. If adding CAA restrictions, allow `letsencrypt.org`.
Keep **Enforce HTTPS** enabled. Normal content updates require no DNS or
certificate changes.

Expected redirects:

- `http://me.haoz.uk/` → `https://me.haoz.uk/`
- `https://haoz0206.github.io/` → `https://me.haoz.uk/`

### Read-only checks

```bash
dig +short me.haoz.uk CNAME
dig +short me.haoz.uk A
curl -I https://me.haoz.uk/
curl -I http://me.haoz.uk/
curl -I https://haoz0206.github.io/
```

The custom HTTPS URL should return 200; the other two should return 301 with
`Location: https://me.haoz.uk/`.

## Troubleshooting

**Old content after a push:** check that the change reached `master` and the
Pages run for that commit succeeded. Allow caches to refresh; compare the live
`js/data.js` or stylesheet with the committed version, not only the page title.

**Local preview stops loading:** restart the preview server from the repository
root. Keep its process running. Local preview does not depend on GitHub Pages.

**DNS check or HTTPS provisioning fails:** check the CNAME target and DNS-only
setting, and inspect any CAA restrictions. DNS caches may retain earlier answers
for their TTL; compare multiple resolvers before changing records again.

**Certificate still unavailable after initial setup:** allow time for GitHub
provisioning. If DNS is correct and provisioning remains stuck, consult GitHub
Pages troubleshooting before removing/re-adding the custom domain. Repeated
changes can restart validation and hit certificate issuance limits.

**Site fails on only one network/device:** compare DNS answers and try another
network or resolver. Avoid changing the working domain configuration based on
one device's cached result.

## Search and sharing metadata

`index.html` contains the canonical URL, meta description, Open Graph/Twitter
cards, and JSON-LD Person data. `robots.txt` points to `sitemap.xml`, whose URL
must use the custom HTTPS domain. The social image is `assets/img/og.png`.
Search indexing and social-preview caches can update later than the website.
