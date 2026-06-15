import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const siteUrl = "https://annicehome.com";
const brand = "ANNICE HOME";
const company = "Guangdong Ailisi Furniture Co., Ltd.";
const address = "No. 8 Mingxing Road, Chenyong Industrial Zone, Longjiang Town, Shunde District, Foshan City, Guangdong Province, China";
const email = "dzhou722@gmail.com";
const whatsapp = "+86 186 7585 3801";

const htmlFiles = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if ([".git", ".vercel", "node_modules", "qa-screenshots"].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.isFile() && full.endsWith(".html")) htmlFiles.push(full);
  }
}
walk(root);

const brandReplacements = [
  [/ANNAISI/g, brand],
  [/ANNICE Sleep \/ ANNICE HOME Factory/g, `${brand} Factory`],
  [/ANNICE Sleep \/ ANNAISI Factory/g, `${brand} Factory`],
  [/ANNICE Sleep/g, `${brand} Factory`],
  [/ANNAISIHOME/g, brand],
  [/ANNAISI-website-analysis-plan/g, "ANNICE-HOME-website-analysis-plan"],
];

for (const file of htmlFiles) {
  let html = fs.readFileSync(file, "utf8");
  for (const [from, to] of brandReplacements) html = html.replace(from, to);
  html = html.replace(/Contact ANNICE HOME on WhatsApp/g, `Contact ${brand} on WhatsApp`);
  html = html.replace(/alt="ANNICE HOME logo"/g, `alt="${brand} logo"`);
  fs.writeFileSync(file, html);
}

for (const file of ["llms.txt", "EN_SEO_LIBRARY.md", "ES_SEO_LIBRARY.md", "PTBR_SEO_LIBRARY.md", "FR_SEO_LIBRARY.md", "AR_SEO_LIBRARY.md", "ANNAISI-website-analysis-plan.md"]) {
  const full = path.join(root, file);
  if (!fs.existsSync(full)) continue;
  let text = fs.readFileSync(full, "utf8");
  for (const [from, to] of brandReplacements) text = text.replace(from, to);
  fs.writeFileSync(full, text);
}

const products = [
  {
    slug: "roll-packed-mattress",
    title: "Roll Packed Mattress Manufacturer China | ANNICE HOME",
    description: "ANNICE HOME manufactures OEM roll packed mattresses with vacuum compression, custom size, fabric, comfort layers, labels, and export packaging for B2B buyers.",
    h1: "Roll Packed Mattress Manufacturer for OEM Export Programs",
    intro: "Roll packed mattresses are designed for importers, wholesalers, mattress retailers, e-commerce sellers, and private label brands that need efficient storage, container loading, and customer delivery.",
    image: "/assets/images/roll-packed-mattress.jpg",
    imageAlt: "ANNICE HOME roll packed mattress manufacturer product for B2B export",
    type: "Roll packed mattress / vacuum compressed mattress / bed in a box mattress",
    customers: "Importers, mattress retailers, e-commerce sellers, wholesalers, private label brands, hotel project buyers",
    specs: [
      ["Construction", "Pocket spring, memory foam, hybrid, foam comfort layer, quilted cover"],
      ["Sizes", "Single, Twin, Full, Queen, King, custom market sizes"],
      ["Height", "Common ranges from 15 cm to 35 cm, depending on construction"],
      ["Firmness", "Soft, medium, firm, market-specific comfort feel"],
      ["Packing", "Vacuum compressed, rolled, boxed, export carton"],
    ],
    moq: "MOQ depends on size mix, fabric, label, and packaging. Send target quantity for factory confirmation.",
    loading: "40HQ loading capacity depends on mattress size, height, roll diameter, and carton dimensions. ANNICE HOME can review package dimensions before quotation.",
    oem: "Custom size, fabric, quilting pattern, mattress height, firmness, label, carton artwork, user manual, and private label package.",
    faqs: [
      ["How long can a roll packed mattress stay compressed?", "The recommended compressed storage time depends on foam type, spring structure, and packing method. For bulk export orders, buyers should confirm recovery expectations and storage plan before shipment."],
      ["Can roll packed mattresses be made for private label brands?", "Yes. ANNICE HOME supports private label mattress programs with custom fabric, label, carton, size, comfort, and packaging details."],
      ["What information is needed for a roll packed mattress quote?", "Please send size, height, construction, target firmness, quantity, market, packaging requirement, and whether private label packaging is needed."],
    ],
  },
  {
    slug: "vacuum-packed-mattress",
    title: "Vacuum Packed Mattress Supplier China | ANNICE HOME",
    description: "Source vacuum packed mattresses from ANNICE HOME for OEM, wholesale, e-commerce, and private label export programs with compression and loading support.",
    h1: "Vacuum Packed Mattress Supplier for Importers and E-commerce Brands",
    intro: "Vacuum packed mattresses help B2B buyers reduce shipping volume and support mattress-in-a-box sales channels. ANNICE HOME helps buyers match mattress structure with compression, carton, and loading requirements.",
    image: "/assets/images/hybrid-mattress.jpg",
    imageAlt: "vacuum packed mattress supplier product from ANNICE HOME China factory",
    type: "Vacuum packed mattress / compressed mattress / mattress in a box",
    customers: "Amazon sellers, online mattress brands, distributors, importers, furniture chains, project buyers",
    specs: [
      ["Construction", "Foam, pocket spring, hybrid, memory foam, custom comfort layers"],
      ["Compression", "Vacuum compressed and rolled where suitable for product structure"],
      ["Cover", "Knitted fabric, quilted fabric, custom pattern and label"],
      ["Carton", "Export carton, private label carton, market-specific shipping mark"],
      ["Quality check", "Size, appearance, packing, label, and shipment inspection before loading"],
    ],
    moq: "MOQ is confirmed by model, size, fabric, and packaging plan. Trial orders can be discussed for suitable projects.",
    loading: "40HQ loading quantity varies by mattress size and height. ANNICE HOME can calculate estimated loading after package dimensions are confirmed.",
    oem: "OEM options include mattress construction, cover fabric, logo label, carton design, instruction sheet, barcode label, and package dimensions.",
    faqs: [
      ["Is every mattress suitable for vacuum packing?", "No. Suitability depends on structure, foam density, spring design, thickness, and recovery requirements. The factory should review the construction before confirming compression."],
      ["Does vacuum packing affect mattress recovery?", "A suitable structure and compression process help the mattress recover after unpacking. Buyers should confirm recovery time and handling instructions for their market."],
      ["Can ANNICE HOME support carton design for online sales?", "Yes. Carton artwork, labels, instruction sheets, and market-specific packaging can be discussed for OEM and private label programs."],
    ],
  },
  {
    slug: "oem-mattress",
    title: "OEM Mattress Manufacturer China | ANNICE HOME",
    description: "ANNICE HOME provides OEM mattress manufacturing for roll packed, vacuum packed, pocket spring, memory foam, and hybrid mattress programs.",
    h1: "OEM Mattress Manufacturer for Custom Mattress Programs",
    intro: "OEM mattress sourcing is not only about choosing a model. Importers and brands need the right construction, comfort, label, packaging, MOQ, and loading plan for their sales channel.",
    image: "/assets/images/pocket-spring-mattress.jpg",
    imageAlt: "OEM mattress manufacturer product from ANNICE HOME factory",
    type: "OEM mattress / private label mattress / custom mattress",
    customers: "Mattress brands, importers, wholesalers, hotel project buyers, retail chains, e-commerce sellers",
    specs: [
      ["Mattress types", "Roll packed, pocket spring, memory foam, hybrid, compressed mattress"],
      ["Custom scope", "Size, height, firmness, fabric, quilting, label, carton, packing method"],
      ["Applications", "Retail, wholesale, online sales, hotel, apartment, project orders"],
      ["Packaging", "Flat pack or vacuum roll pack based on product design"],
      ["Documents", "Quotation, packing information, loading plan, shipment documents as required"],
    ],
    moq: "MOQ is project-based and depends on product type, material, and customization depth.",
    loading: "40HQ loading capacity is calculated from final package dimensions. Send your target model and size mix for review.",
    oem: "Full OEM/ODM service includes product structure development, fabric selection, comfort positioning, label, carton, and export packaging.",
    faqs: [
      ["What is OEM mattress manufacturing?", "OEM mattress manufacturing means the factory produces mattresses according to the buyer's brand, specifications, target comfort, packaging, and sales channel requirements."],
      ["Can I customize both mattress and packaging?", "Yes. Buyers can customize size, cover, height, firmness, logo label, carton design, barcode labels, and instruction sheets."],
      ["What should I prepare before contacting an OEM mattress factory?", "Prepare target market, size list, product type, comfort level, order quantity, packaging needs, target price range, and any brand requirements."],
    ],
  },
  {
    slug: "compressed-sofa",
    title: "Compressed Sofa Manufacturer China | ANNICE HOME",
    description: "ANNICE HOME manufactures compressed sofas and sofa-in-a-box programs for importers, wholesalers, e-commerce sellers, and private label furniture brands.",
    h1: "Compressed Sofa Manufacturer for Efficient Export Shipping",
    intro: "Compressed sofas are built for buyers who want modern sofa designs with improved shipping efficiency. ANNICE HOME supports vacuum compression, custom fabric, packaging, and container loading planning.",
    image: "/assets/images/premium-compressed-sofa.jpg",
    imageAlt: "ANNICE HOME compressed sofa manufacturer product for export buyers",
    type: "Compressed sofa / vacuum packed sofa / sofa in a box / compressed couch",
    customers: "Sofa brands, furniture distributors, importers, wholesalers, e-commerce sellers, retail chains",
    specs: [
      ["Sofa types", "Single sofa, loveseat, three-seat sofa, sofa bed, modular sofa options"],
      ["Fabric", "Corduroy, velvet, linen-look fabric, custom textile options"],
      ["Structure", "Foam, frame, cushion, arm style, backrest design by project"],
      ["Packing", "Vacuum compressed where suitable, carton, shipping marks, labels"],
      ["Applications", "Home, apartment, retail, online sales, project furniture"],
    ],
    moq: "MOQ depends on sofa model, fabric color, structure, and packaging. Confirm by project.",
    loading: "40HQ compressed sofa loading capacity depends on model size, compression ratio, carton dimension, and sofa structure. Buyers can send target style for loading estimate.",
    oem: "Custom sofa dimensions, fabric, color, cushion feel, label, carton artwork, packaging method, and private label details.",
    faqs: [
      ["How much shipping space can compressed sofas save?", "Savings depend on sofa structure, cushion material, compression method, and final carton size. A loading estimate should be calculated from the actual model."],
      ["Can all sofas be vacuum compressed?", "Not every structure is suitable. The factory should review frame, cushion, fabric, and recovery requirements before confirming compression."],
      ["Who buys compressed sofas from China?", "Importers, furniture distributors, e-commerce sellers, sofa brands, wholesalers, and retail chains use compressed sofas for efficient export programs."],
    ],
  },
  {
    slug: "vacuum-packed-sofa",
    title: "Vacuum Packed Sofa Supplier China | ANNICE HOME",
    description: "ANNICE HOME supplies vacuum packed sofas for sofa-in-a-box, compressed couch, private label, and wholesale furniture export programs.",
    h1: "Vacuum Packed Sofa Supplier for Sofa-in-a-Box Programs",
    intro: "Vacuum packed sofas are suitable for buyers who need better shipping density and simpler storage for online or wholesale furniture programs. ANNICE HOME helps evaluate sofa design, compression feasibility, and package size.",
    image: "/assets/images/compressed-sofa.jpg",
    imageAlt: "vacuum packed sofa supplier product for sofa in a box program",
    type: "Vacuum packed sofa / sofa in a box / compressed couch",
    customers: "Online furniture sellers, sofa brands, importers, distributors, wholesale buyers, project buyers",
    specs: [
      ["Design", "Modern sofa, modular sofa, loveseat, sofa bed, compact sofa options"],
      ["Materials", "Fabric, foam, cushion, backrest, frame by model"],
      ["Compression", "Vacuum packing feasibility confirmed by sofa construction"],
      ["Package", "Carton, woven bag, private label, shipping marks"],
      ["Inspection", "Appearance, structure, fabric, packing, and loading check"],
    ],
    moq: "MOQ is based on fabric, color, model, and packaging requirements.",
    loading: "40HQ capacity is calculated after confirming sofa dimensions, compression ratio, and carton size.",
    oem: "OEM/ODM options include fabric, color, sofa size, cushion comfort, label, carton, and package format.",
    faqs: [
      ["What is a vacuum packed sofa?", "A vacuum packed sofa is compressed and packed to reduce shipping volume where the sofa structure allows compression and later recovery."],
      ["Is vacuum packed sofa suitable for e-commerce?", "Yes, many online furniture sellers consider sofa-in-a-box programs because packaging can support storage, delivery, and freight efficiency."],
      ["Can I customize the carton for my brand?", "Yes. Private label carton, shipping mark, instruction sheet, and product label can be customized for qualified OEM orders."],
    ],
  },
  {
    slug: "sofa-bed",
    title: "Sofa Bed Manufacturer China | ANNICE HOME",
    description: "ANNICE HOME supplies OEM sofa beds and multifunctional sofas with custom fabric, packaging, dimensions, and export support for B2B buyers.",
    h1: "Sofa Bed Manufacturer for Space-Saving Furniture Programs",
    intro: "Sofa beds are useful for apartments, retail stores, e-commerce furniture brands, and project buyers who need multifunctional seating and sleeping solutions.",
    image: "/assets/images/sofa-bed.jpg",
    imageAlt: "ANNICE HOME sofa bed manufacturer product for export programs",
    type: "Sofa bed / sleeper sofa / multifunctional sofa",
    customers: "Furniture retailers, apartment suppliers, online sellers, wholesalers, hotel and project buyers",
    specs: [
      ["Function", "Sofa and bed conversion, space-saving furniture"],
      ["Customization", "Size, fabric, color, cushion, mechanism, label, carton"],
      ["Applications", "Apartment, hotel, home, retail, e-commerce, project furniture"],
      ["Packing", "Export carton, flat pack or compressed option by model"],
      ["Quote details", "Style, dimensions, fabric, order quantity, target market"],
    ],
    moq: "MOQ depends on sofa bed style, mechanism, fabric, and packaging.",
    loading: "40HQ loading capacity is confirmed after final product and package dimensions are available.",
    oem: "Custom fabric, size, cushion, mechanism, color, label, carton, and user instructions.",
    faqs: [
      ["Can sofa beds be customized for hotel projects?", "Yes. Fabric, size, firmness, color, and packaging can be discussed for hotel, apartment, and project furniture orders."],
      ["Can sofa beds be compressed?", "Some sofa bed designs may support compression or compact packing, but feasibility depends on mechanism, frame, and cushion structure."],
      ["What details are needed for quotation?", "Send style reference, size, fabric, color, quantity, packaging needs, target market, and delivery timeline."],
    ],
  },
  {
    slug: "mattress-topper",
    title: "Mattress Topper Manufacturer China | ANNICE HOME",
    description: "ANNICE HOME supplies OEM mattress toppers with custom foam, thickness, cover fabric, private label packaging, and export support for B2B buyers.",
    h1: "Mattress Topper Manufacturer for OEM and Private Label Programs",
    intro: "Mattress toppers help retailers, e-commerce sellers, hotel buyers, and private label brands expand comfort product lines with lower package volume than full mattresses.",
    image: "/assets/images/memory-foam-mattress.jpg",
    imageAlt: "mattress topper manufacturer foam comfort product from ANNICE HOME",
    type: "Mattress topper / foam topper / private label topper",
    customers: "Retailers, online sellers, hotel suppliers, importers, wholesalers, private label sleep brands",
    specs: [
      ["Materials", "Memory foam, comfort foam, quilted cover options by request"],
      ["Thickness", "Common ranges from 3 cm to 10 cm, custom by market"],
      ["Cover", "Knitted, quilted, removable cover option by project"],
      ["Packing", "Vacuum compressed, rolled, carton, private label package"],
      ["Applications", "Home, hotel, dormitory, retail, online sleep products"],
    ],
    moq: "MOQ depends on foam type, thickness, cover fabric, and package customization.",
    loading: "40HQ loading capacity varies by topper thickness, size, roll diameter, and carton dimensions.",
    oem: "Custom thickness, foam type, cover, zipper, label, carton artwork, insert card, and compression packing.",
    faqs: [
      ["What is the difference between a mattress and a mattress topper?", "A mattress topper is a comfort layer placed on top of an existing mattress, while a mattress is the full sleep support product."],
      ["Can mattress toppers be vacuum packed?", "Yes, many foam toppers can be vacuum compressed and rolled, depending on foam and cover requirements."],
      ["Who buys OEM mattress toppers?", "Retailers, online sellers, hotel suppliers, importers, and private label sleep brands often add toppers as an accessory product line."],
    ],
  },
];

function nav() {
  return `<header class="site-header"><div class="container nav"><a class="brand" href="/"><img src="/assets/images/logo.jpg" alt="${brand} logo" />${brand}</a><nav class="nav-links" aria-label="Main navigation"><a href="/products/">Products</a><a href="/factory/">Factory</a><a href="/about/">About</a><a href="/blog/">Blog</a><a href="/resources/">Resources</a><a href="/contact/">Contact</a></nav><div class="nav-actions"><a class="button secondary" href="/resources/">Download Catalog</a><a class="button primary" href="/contact/">Get Free Quote</a></div></div></header>`;
}

function footer() {
  return `<footer class="site-footer"><div class="container footer-grid"><div><h3>${brand}</h3><p>${brand} is the export brand of ${company}, a mattress and compressed sofa manufacturer based in Foshan, China.</p></div><div><h4>Products</h4><div class="footer-links"><a href="/products/roll-packed-mattress/">Roll Packed Mattress</a><a href="/products/compressed-sofa/">Compressed Sofa</a><a href="/products/mattress-topper/">Mattress Topper</a></div></div><div><h4>Factory</h4><div class="footer-links"><a href="/factory/">Factory Capability</a><a href="/contact/">Request Factory Price</a></div></div><div><h4>Contact</h4><div class="footer-links"><a href="mailto:${email}">${email}</a><a data-whatsapp-link href="https://wa.me/8618675853801">WhatsApp ${whatsapp}</a><span>${address}</span></div></div></div></footer>`;
}

function productPage(product) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: product.faqs.map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.h1,
    brand: { "@type": "Brand", name: brand },
    manufacturer: { "@type": "Organization", name: company },
    category: product.type,
    image: `${siteUrl}${product.image}`,
    description: product.description,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "PriceSpecification",
        description: "Request a quote for B2B OEM pricing. Pricing depends on specifications, MOQ, packaging, and shipment plan.",
      },
    },
  };
  const webPageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/products/${product.slug}/#webpage`,
        url: `${siteUrl}/products/${product.slug}/`,
        name: product.h1,
        description: product.description,
        isPartOf: { "@id": `${siteUrl}/#website` },
        inLanguage: "en",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteUrl}/products/${product.slug}/#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
          { "@type": "ListItem", position: 2, name: "Products", item: `${siteUrl}/products/` },
          { "@type": "ListItem", position: 3, name: product.h1, item: `${siteUrl}/products/${product.slug}/` },
        ],
      },
    ],
  };

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${product.title}</title>
    <meta name="description" content="${product.description}" />
    <link rel="canonical" href="${siteUrl}/products/${product.slug}/" />
    <link rel="stylesheet" href="/assets/styles-20260615.css" />
    <script type="application/ld+json">${JSON.stringify(productSchema)}</script>
    <script type="application/ld+json">${JSON.stringify(faqSchema)}</script>
    <script type="application/ld+json" data-seo-system>${JSON.stringify(webPageSchema)}</script>
  </head>
  <body>
    ${nav()}
    <main>
      <section class="page-hero product-seo-hero">
        <div class="container">
          <div class="breadcrumb">Home / Products / ${product.h1}</div>
          <p class="hero-kicker">Factory Direct OEM / ODM Supply</p>
          <h1>${product.h1}</h1>
          <p>${product.intro}</p>
          <div class="hero-actions">
            <a class="button primary" href="/contact/">Get Quote</a>
            <a class="button whatsapp" data-whatsapp-link href="https://wa.me/8618675853801">WhatsApp Us</a>
            <a class="button secondary" href="/resources/">Download Catalog</a>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container detail-grid">
          <div class="detail-image"><img src="${product.image}" alt="${product.imageAlt}" /></div>
          <div>
            <h2>Product Introduction</h2>
            <p>${product.intro}</p>
            <div class="product-proof-grid">
              <article><strong>Suitable Customers</strong><span>${product.customers}</span></article>
              <article><strong>MOQ</strong><span>${product.moq}</span></article>
              <article><strong>40HQ Loading Capacity</strong><span>${product.loading}</span></article>
              <article><strong>Factory Support</strong><span>OEM/ODM, compression packing, inspection, and export loading support.</span></article>
            </div>
          </div>
        </div>
      </section>

      <section class="section soft">
        <div class="container product-content-grid">
          <div>
            <h2>Specifications</h2>
            <table class="spec-table">
              <tr><th>Product type</th><td>${product.type}</td></tr>
              ${product.specs.map(([k, v]) => `<tr><th>${k}</th><td>${v}</td></tr>`).join("")}
              <tr><th>MOQ</th><td>${product.moq}</td></tr>
              <tr><th>40HQ loading</th><td>${product.loading}</td></tr>
            </table>
          </div>
          <div class="info-card">
            <div class="icon-box">OEM</div>
            <h2>OEM / ODM Custom Options</h2>
            <p>${product.oem}</p>
            <ul class="check-list">
              <li>Factory-direct quotation by project specification</li>
              <li>Private label and export packaging support</li>
              <li>Product and loading details confirmed before bulk order</li>
            </ul>
            <a class="button primary" href="/contact/">Request Factory Price</a>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container split">
          <div>
            <h2>How to Request a Quote</h2>
            <p>For a fast and useful quotation, send your target market, product type, size, quantity, packaging requirement, and whether you need a private label program.</p>
            <div class="keyword-cloud">
              <span>OEM/ODM Service</span><span>Factory Direct Supply</span><span>40HQ Loading Support</span><span>Private Label</span>
            </div>
          </div>
          <form class="inquiry-form premium-form" data-inquiry-form data-submit-endpoint="https://formsubmit.co/ajax/${email}">
            <input type="hidden" name="_subject" value="New ${product.h1} Inquiry" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_captcha" value="false" />
            <label><span class="field-label">Name <span class="required-mark">Required</span></span><input required name="name" autocomplete="name" placeholder="Your full name" /><span class="field-error" data-error-for="name"></span></label>
            <label><span class="field-label">Email <span class="required-mark">Required</span></span><input required type="email" name="email" autocomplete="email" placeholder="name@company.com" /><span class="field-error" data-error-for="email"></span></label>
            <label><span class="field-label">WhatsApp / Phone <span class="required-mark">Required</span></span><input required type="tel" name="phone" autocomplete="tel" placeholder="+1 555 123 4567" /><span class="field-error" data-error-for="phone"></span></label>
            <label><span class="field-label">Country</span><input name="country" autocomplete="country-name" placeholder="Your country or market" /></label>
            <label><span class="field-label">Product Interested</span><input name="interest" value="${product.h1}" /></label>
            <label><span class="field-label">Quantity</span><input name="quantity" placeholder="Estimated order quantity" /></label>
            <label class="full"><span class="field-label">Message</span><textarea name="message" rows="4" placeholder="Size, material, package, target market, and other requirements."></textarea></label>
            <label class="hp-field">Website<input name="website" tabindex="-1" autocomplete="off" /></label>
            <button class="button primary full" type="submit">Send Requirements</button>
            <p class="form-status" data-form-status role="status" aria-live="polite"></p>
          </form>
        </div>
      </section>

      <section class="section soft">
        <div class="container">
          <div class="section-head"><div><h2>FAQ</h2><p>Clear answers for importers, wholesalers, furniture distributors, and private label buyers.</p></div></div>
          <div class="faq-list">
            ${product.faqs.map(([q, a], i) => `<div class="faq-item${i === 0 ? " is-open" : ""}"><button data-faq-toggle aria-expanded="${i === 0 ? "true" : "false"}">${q}</button><p>${a}</p></div>`).join("")}
          </div>
        </div>
      </section>
    </main>
    ${footer()}
    <script src="/assets/site.js"></script>
  </body>
</html>
`;
}

for (const product of products) {
  const dir = path.join(root, "products", product.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), productPage(product));
}

const productsIndex = path.join(root, "products/index.html");
if (fs.existsSync(productsIndex)) {
  let html = fs.readFileSync(productsIndex, "utf8");
  const cardLinks = products.map((p) => `<article class="product-card"><img src="${p.image}" alt="${p.imageAlt}" /><div class="card-body"><h3>${p.h1.replace(/ Manufacturer.*$/, "").replace(/ Supplier.*$/, "")}</h3><p>${p.type} for B2B export buyers, OEM/ODM programs, and factory-direct sourcing.</p><a class="text-link" href="/products/${p.slug}/">Explore product</a></div></article>`).join("");
  html = html.replace(/<div class="product-grid">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/, `<div class="product-grid">${cardLinks}</div></div></section>`);
  fs.writeFileSync(productsIndex, html);
}

const siteJs = path.join(root, "assets/site.js");
let js = fs.readFileSync(siteJs, "utf8");
js = js.replace(/Hello ANNAISI,/g, `Hello ${brand},`);
js = js.replace(/ANNAISI/g, brand);
if (!js.includes("/products/vacuum-packed-mattress/")) {
  js = js.replace(`<a class="mega-link" href="/products/roll-packed-mattress/"><span>Roll Packed Mattress</span><small>Vacuum compressed / bed in a box</small></a>`,
    `<a class="mega-link" href="/products/roll-packed-mattress/"><span>Roll Packed Mattress</span><small>Vacuum compressed / bed in a box</small></a>
        <a class="mega-link" href="/products/vacuum-packed-mattress/"><span>Vacuum Packed Mattress</span><small>Compressed mattress supplier page</small></a>
        <a class="mega-link" href="/products/oem-mattress/"><span>OEM Mattress</span><small>Custom mattress manufacturing</small></a>
        <a class="mega-link" href="/products/mattress-topper/"><span>Mattress Topper</span><small>Private label sleep accessories</small></a>`);
  js = js.replace(`<a class="mega-link" href="/products/compressed-sofa/"><span>Compressed Sofa</span><small>Vacuum packed sofa / compressed couch</small></a>`,
    `<a class="mega-link" href="/products/compressed-sofa/"><span>Compressed Sofa</span><small>Vacuum packed sofa / compressed couch</small></a>
        <a class="mega-link" href="/products/vacuum-packed-sofa/"><span>Vacuum Packed Sofa</span><small>Sofa in a box supplier page</small></a>`);
}
fs.writeFileSync(siteJs, js);

const styleFile = path.join(root, "assets/styles-20260615.css");
let css = fs.readFileSync(styleFile, "utf8");
if (!css.includes(".product-proof-grid")) {
  css += `

.product-seo-hero .hero-kicker {
  color: var(--accent);
}

.product-proof-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin-top: 22px;
}

.product-proof-grid article {
  padding: 16px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: #fff;
}

.product-proof-grid strong,
.product-proof-grid span {
  display: block;
}

.product-proof-grid strong {
  color: var(--blue);
  font-size: 13px;
  margin-bottom: 6px;
}

.product-proof-grid span {
  color: var(--muted);
  font-size: 14px;
}

.product-content-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(300px, 0.65fr);
  gap: 28px;
  align-items: start;
}

.floating-rfq {
  position: fixed;
  right: 22px;
  bottom: 96px;
  z-index: 90;
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 12px 16px;
  border-radius: 999px;
  color: #fff;
  background: var(--blue);
  box-shadow: 0 16px 38px rgba(15, 39, 71, 0.2);
  font-size: 13px;
  font-weight: 850;
}

@media (max-width: 760px) {
  .product-proof-grid,
  .product-content-grid {
    grid-template-columns: 1fr;
  }

  .floating-rfq {
    right: 14px;
    bottom: 84px;
    padding: 11px 13px;
  }
}
`;
}
fs.writeFileSync(styleFile, css);

let js2 = fs.readFileSync(siteJs, "utf8");
if (!js2.includes("floating-rfq")) {
  js2 += `

if (!document.querySelector(".floating-rfq")) {
  const floatingRfq = document.createElement("a");
  floatingRfq.className = "floating-rfq";
  floatingRfq.href = "/contact/";
  floatingRfq.textContent = "Request Factory Price";
  document.body.appendChild(floatingRfq);
}
`;
}
fs.writeFileSync(siteJs, js2);

const home = path.join(root, "index.html");
let homeHtml = fs.readFileSync(home, "utf8");
homeHtml = homeHtml
  .replace(/<title>.*?<\/title>/, `<title>Mattress & Compressed Sofa Manufacturer in China | ${brand}</title>`)
  .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${brand} is the export brand of ${company}, a roll packed mattress and compressed sofa manufacturer in Foshan, China for OEM/ODM B2B buyers." />`)
  .replace(/Roll Packed Mattresses &amp;<br \/>Compressed Sofas<br \/>Built For Global Brands/, `Mattress &amp; Compressed Sofa<br />Manufacturer in China`)
  .replace(/Helping importers, distributors, retail chains and e-commerce brands grow with high-quality roll packed mattresses and compressed sofas\./, `Factory-direct roll packed mattresses, vacuum packed mattresses, compressed sofas, and OEM/ODM programs for importers, wholesalers, distributors, retailers, sofa brands, and project buyers.`)
  .replace(/<a class="button whatsapp" href="\/contact\/">WhatsApp Us<\/a>/, `<a class="button whatsapp" data-whatsapp-link href="https://wa.me/8618675853801">WhatsApp Us</a><a class="button secondary" href="mailto:${email}">Email Us</a>`)
  .replace(/<div class="strength"><span class="strength-icon" aria-hidden="true">▤<\/span><span>Container Loading Support<\/span><\/div>/, `<div class="strength"><span class="strength-icon" aria-hidden="true">▤</span><span>40HQ Loading Support</span></div>`);
fs.writeFileSync(home, homeHtml);

const notFound = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Page Not Found | ${brand}</title>
    <meta name="robots" content="noindex, follow" />
    <link rel="stylesheet" href="/assets/styles-20260615.css" />
  </head>
  <body>
    ${nav()}
    <main>
      <section class="page-hero">
        <div class="container">
          <div class="breadcrumb">404</div>
          <h1>Page not found</h1>
          <p>The page may have moved. Continue to product pages or send your sourcing requirements to ${brand}.</p>
          <div class="hero-actions"><a class="button primary" href="/products/">View Products</a><a class="button secondary" href="/contact/">Get Quote</a></div>
        </div>
      </section>
    </main>
    ${footer()}
    <script src="/assets/site.js"></script>
  </body>
</html>
`;
fs.writeFileSync(path.join(root, "404.html"), notFound);

const urls = [
  ["", "1.0", "daily"],
  ["products/", "0.92", "weekly"],
  ...products.map((p) => [`products/${p.slug}/`, "0.9", "weekly"]),
  ["roll-packed-mattress-manufacturer/", "0.9", "weekly"],
  ["compressed-sofa-manufacturer/", "0.9", "weekly"],
  ["oem-mattress-manufacturer/", "0.88", "weekly"],
  ["private-label-mattress-manufacturer/", "0.86", "weekly"],
  ["factory/", "0.84", "monthly"],
  ["about/", "0.72", "monthly"],
  ["contact/", "0.9", "weekly"],
  ["blog/", "0.75", "weekly"],
  ["resources/", "0.72", "weekly"],
  ["es/", "0.6", "monthly"],
  ["pt-br/", "0.6", "monthly"],
  ["fr/", "0.55", "monthly"],
  ["ar/", "0.55", "monthly"],
  ["llms.txt", "0.4", "monthly"],
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.map(([u, priority, changefreq]) => `  <url>
    <loc>${siteUrl}/${u}</loc>
    <lastmod>2026-06-15</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(root, "sitemap.xml"), sitemap);

const llms = `# ${brand}

Official website: ${siteUrl}/

${brand} is the export brand of ${company}, a mattress and compressed sofa manufacturer based in Foshan, China.

Main products:
- Roll packed mattress
- Vacuum packed mattress
- OEM mattress
- Compressed sofa
- Vacuum packed sofa
- Sofa bed
- Mattress topper

Business model:
- OEM manufacturing
- ODM product development
- Private label packaging
- Factory-direct B2B export supply

Target buyers:
- Importers
- Wholesalers
- Furniture distributors
- Mattress retailers
- Sofa brands
- Hotel and project buyers
- E-commerce sellers

Factory address:
${address}

Contact:
- Email: ${email}
- WhatsApp: ${whatsapp}

Important sourcing notes:
- MOQ and 40HQ loading quantity depend on product structure, size mix, fabric, packaging, compression ratio, and carton dimensions.
- ${brand} does not publish fixed B2B pricing online because OEM/ODM projects require quotation by specification.
- Buyers should send product type, dimensions, quantity, target market, packaging requirements, and private label needs for an accurate quote.
`;
fs.writeFileSync(path.join(root, "llms.txt"), llms);

console.log(`Updated ${htmlFiles.length} HTML files, generated ${products.length} product pages, sitemap, llms.txt, and 404.html.`);
