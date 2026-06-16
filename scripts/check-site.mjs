import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const htmlFiles = [];

function walk(dir) {
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    if (item.name.startsWith(".")) continue;
    const full = path.join(dir, item.name);
    if (item.isDirectory() && item.name === "templates") continue;
    if (item.isDirectory()) walk(full);
    if (item.isFile() && item.name.endsWith(".html") && !item.name.startsWith("google")) htmlFiles.push(full);
  }
}

walk(root);

const requiredKeywords = [
  "mattress manufacturer",
  "OEM mattress",
  "private label mattress",
  "roll packed mattress",
  "compressed sofa",
  "vacuum packed sofa",
  "import mattress from China",
  "import sofa from China"
];

const report = [];
const titles = new Map();

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  const rel = path.relative(root, file);
  const title = html.match(/<title>(.*?)<\/title>/i)?.[1];
  const h1 = html.match(/<h1[^>]*>(.*?)<\/h1>/i)?.[1];
  const desc = html.match(/<meta name="description" content="(.*?)"/i)?.[1];
  const canonical = html.match(/<link rel="canonical" href="(.*?)"/i)?.[1];
  if (!title) report.push(`${rel}: missing title`);
  if (!h1) report.push(`${rel}: missing h1`);
  if (!desc) report.push(`${rel}: missing meta description`);
  if (!canonical && rel !== "404.html") report.push(`${rel}: missing canonical`);
  if (title) {
    if (titles.has(title)) report.push(`${rel}: duplicate title with ${titles.get(title)}`);
    titles.set(title, rel);
  }
  const localAssets = [
    ...html.matchAll(/src="([^"]+)"/g),
    ...html.matchAll(/href="([^"]+)"/g),
  ].map((m) => m[1]);

  for (const asset of localAssets) {
    if (asset.startsWith("/") && !asset.startsWith("//")) {
      const assetPath = asset.split(/[?#]/)[0];
      const target = path.join(root, assetPath);
      if (!fs.existsSync(target)) report.push(`${rel}: missing asset ${asset}`);
    }
  }
}

const allText = htmlFiles.map((file) => fs.readFileSync(file, "utf8").toLowerCase()).join("\n");
for (const keyword of requiredKeywords) {
  if (!allText.includes(keyword.toLowerCase())) report.push(`keyword not found: ${keyword}`);
}

if (report.length) {
  console.error(report.join("\n"));
  process.exit(1);
}

console.log(`Checked ${htmlFiles.length} HTML pages. SEO basics, assets, and keyword coverage passed.`);
