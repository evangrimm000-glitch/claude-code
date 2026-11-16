# banyantreetitle.com

Static site for Banyan Tree Title. No framework, no dependencies, fonts self-hosted.

## Run it

    node build.mjs                      # builds to dist/
    python3 -m http.server -d dist 8000 # then open http://localhost:8000

## Before launch

Every business fact lives in `site.json`. Anything still `null` shows on the page as a yellow tag, and the build refuses to ship to banyantreetitle.com until all five are filled. On the netlify.app address it builds a marked, noindex preview.

1. `phone`
2. `email`
3. `address` (street line, the city and state are already set)
4. `license` (Florida title agency license number)
5. `underwriter`

Optional: `closing_fee`, and `order_portal_url` if orders should go to a portal instead of the form on `/order/`.

Confirm these read true before going live, since they are promises:

- Files opened the same business day (`index.html`, `order.html`, `thanks.html`)
- Wire procedure on `/wire-safety/` matches how the office handles wires
- The principal section on the home page (name, 25 years, 40 states, 4,500 REO closings in 2019)

Not built yet: privacy notice page.

## Deploy

Netlify, base directory `banyan-tree-site`. `netlify.toml` sets the build, the launch gate, and security headers. The order form uses Netlify Forms, so turn on form notifications to the office inbox after the first deploy. Then point `banyantreetitle.com` DNS at the Netlify site.

## Layout

    site.json          facts
    build.mjs          build script
    src/               pages and partials
    assets/            css, js, fonts, images
    brand/             logo files (SVG with outlined type, PNG) and brand sheet

The fee calculator in `assets/js/site.js` uses the Florida promulgated rates (F.A.C. 69O-186.003), the $25 simultaneous lender policy, deed stamps at $0.70 per $100, note stamps at $0.35 per $100, and intangible tax at 0.2%. Miami-Dade's lower deed stamp rate is not modeled.
