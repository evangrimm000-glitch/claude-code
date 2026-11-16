// Static build for banyantreetitle.com. No dependencies.
//   node build.mjs            preview build, missing facts are marked on the page
//   node build.mjs --strict   production build, fails if a required fact is missing
import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const strict = process.argv.includes("--strict");
const site = JSON.parse(readFileSync(join(root, "site.json"), "utf8"));

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const todo = (label) => `<span class="todo" title="Not confirmed yet. Set it in site.json.">[${label}]</span>`;

const missing = Object.entries(site.required).filter(([, v]) => v === null || v === "").map(([k]) => k);
if (strict && missing.length) {
  console.error(`Refusing to build for production. Missing in site.json: ${missing.join(", ")}`);
  process.exit(1);
}

const r = site.required;
const o = site.optional;
const digits = r.phone ? r.phone.replace(/[^\d+]/g, "") : "";

const tokens = {
  name: esc(site.name),
  legal_name: esc(site.legal_name),
  domain: esc(site.domain),
  city: esc(site.city),
  state: esc(site.state),
  year: esc(site.year),
  phone: r.phone ? esc(r.phone) : todo("phone"),
  phone_href: r.phone ? `tel:${digits}` : "#",
  email: r.email ? esc(r.email) : todo("email"),
  email_href: r.email ? `mailto:${esc(r.email)}` : "#",
  address: r.address ? esc(r.address) : todo("office address"),
  license: r.license ? esc(r.license) : todo("FL license no."),
  underwriter: r.underwriter ? esc(r.underwriter) : todo("underwriter"),
  closing_fee: o.closing_fee ? esc(o.closing_fee) : "",
  order_href: o.order_portal_url ? esc(o.order_portal_url) : "/order/",
  principal: esc(site.principal.name),
  years: esc(site.principal.years_in_title),
  states: esc(site.principal.states),
  reo: esc(site.principal.reo_closings_2019),
  preview_banner: missing.length
    ? `<div class="preview-banner" role="note">Preview build. ${missing.length} fact${missing.length > 1 ? "s" : ""} still to confirm before launch: ${missing.join(", ")}.</div>`
    : "",
};

const partials = {};
for (const f of readdirSync(join(root, "src/partials"))) {
  partials[f.replace(/\.html$/, "")] = readFileSync(join(root, "src/partials", f), "utf8");
}

function render(src, page) {
  let out = src;
  for (let i = 0; i < 4; i++) out = out.replace(/\{\{>\s*([\w-]+)\s*\}\}/g, (_, n) => partials[n] ?? `<!-- missing partial ${n} -->`);
  out = out.replace(/\{\{page\.(\w+)\}\}/g, (_, k) => esc(page[k] ?? ""));
  out = out.replace(/\{\{(\w+)\}\}/g, (m, k) => (k in tokens ? tokens[k] : m));
  const left = out.match(/\{\{[^}]+\}\}/g);
  if (left) throw new Error(`Unresolved tokens in ${page.out}: ${[...new Set(left)].join(", ")}`);
  return out;
}

const dist = join(root, "dist");
rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });
cpSync(join(root, "assets"), join(dist, "assets"), { recursive: true });

const pages = readdirSync(join(root, "src")).filter((f) => f.endsWith(".html"));
const urls = [];
for (const f of pages) {
  const raw = readFileSync(join(root, "src", f), "utf8");
  const m = raw.match(/^<!--page\n([\s\S]*?)\n-->\n/);
  if (!m) throw new Error(`${f} is missing its <!--page ... --> header`);
  const page = JSON.parse(m[1]);
  const html = render(raw.slice(m[0].length), page);
  const dest = join(dist, page.out);
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, html);
  if (page.sitemap !== false) urls.push(page.path);
}

writeFileSync(join(dist, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: https://${site.domain}/sitemap.xml\n`);
writeFileSync(
  join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `  <url><loc>https://${site.domain}${u}</loc></url>`)
    .join("\n")}\n</urlset>\n`
);

console.log(`Built ${pages.length} pages to dist/`);
if (missing.length) console.log(`Not ready to launch. Still null in site.json: ${missing.join(", ")}`);
