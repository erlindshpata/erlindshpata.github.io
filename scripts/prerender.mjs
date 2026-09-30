// Renders the React app to static HTML inside dist/index.html so crawlers and
// link-preview bots get the full page without running JavaScript. The client
// then hydrates this markup (see src/main.tsx).
import { readFile, rm, writeFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");

const { render } = await import(pathToFileURL(path.join(ssrDir, "entry-server.js")).href);

const indexPath = path.join(dist, "index.html");
const template = await readFile(indexPath, "utf8");
const marker = '<div id="root"></div>';
if (!template.includes(marker)) throw new Error("root marker not found in dist/index.html");
const today = new Date().toISOString().slice(0, 10);
await writeFile(
  indexPath,
  template.replace(marker, `<div id="root">${render()}</div>`).replaceAll("__BUILD_DATE__", today),
);

// Keep the sitemap's lastmod in step with each deploy.
const sitemapPath = path.join(dist, "sitemap.xml");
const sitemap = await readFile(sitemapPath, "utf8");
await writeFile(sitemapPath, sitemap.replace(/<lastmod>[^<]*<\/lastmod>/, `<lastmod>${today}</lastmod>`));

await rm(ssrDir, { recursive: true, force: true });
console.log("prerendered dist/index.html");
