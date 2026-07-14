/**
 * Download and self-host mattress product images.
 * Run: node scripts/download-mattress-images.mjs
 * Requires: sharp (already in node_modules)
 */
import sharp from 'sharp';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, '..', 'public', 'images', 'mattresses');

// Manifest: mattress id → source URL from brand's official site
const MANIFEST = [
  // ── Amerisleep (amerisleep.com CDN) ──────────────────────────────────────
  { id: 'amerisleep-as2',           url: 'https://cdn11.bigcommerce.com/s-36im9ihtig/images/stencil/1920w/products/128/911/amerisleep-as2-carousel--12x__28243.1653594744.jpg' },
  { id: 'amerisleep-as3',           url: 'https://cdn11.bigcommerce.com/s-36im9ihtig/images/stencil/1920w/products/130/912/amerisleep-as3-carousel--12x__54477.1653594778.jpg' },
  { id: 'amerisleep-as5',           url: 'https://cdn11.bigcommerce.com/s-36im9ihtig/images/stencil/1920w/products/137/914/amerisleep-as5-carousel--12x__05776.1653594831.jpg' },
  { id: 'amerisleep-as6',           url: 'https://cdn11.bigcommerce.com/s-36im9ihtig/images/stencil/450w/content/assets/mattress-product/AS6-nav.jpg' },
  { id: 'amerisleep-organica',      url: 'https://cdn11.bigcommerce.com/s-36im9ihtig/products/179/images/897/organica-carousel-1--1920__60616.1651601629.386.513.jpg' },
  // Hybrid variants share visual identity with the foam versions
  { id: 'amerisleep-as3-hybrid',    url: 'https://cdn11.bigcommerce.com/s-36im9ihtig/images/stencil/1920w/products/130/912/amerisleep-as3-carousel--12x__54477.1653594778.jpg' },
  { id: 'amerisleep-as5-hybrid',    url: 'https://cdn11.bigcommerce.com/s-36im9ihtig/images/stencil/1920w/products/137/914/amerisleep-as5-carousel--12x__05776.1653594831.jpg' },
  { id: 'amerisleep-organica-plush',url: 'https://cdn11.bigcommerce.com/s-36im9ihtig/products/179/images/897/organica-carousel-1--1920__60616.1651601629.386.513.jpg' },

  // ── Zoma (zomasleep.com CDN) ──────────────────────────────────────────────
  { id: 'zoma-boost',  url: 'https://cdn11.bigcommerce.com/s-4hn0atpsq5/images/stencil/450w/products/133/72/zoma-boost-1_crop__28427.1729011889.386.513.jpg' },
  { id: 'zoma-hybrid', url: 'https://cdn11.bigcommerce.com/s-4hn0atpsq5/images/stencil/450w/products/124/42/Zoma_Bedroom_Three_1_thumb__81684.1611248675.386.513.jpg' },
  { id: 'zoma-start',  url: 'https://cdn11.bigcommerce.com/s-4hn0atpsq5/images/stencil/450w/products/135/81/start-hero-1-desktop2x__51543.1754331105.386.513.jpg' },

  // ── Vaya (vayasleep.com CDN) ──────────────────────────────────────────────
  { id: 'vaya-foam',   url: 'https://cdn11.bigcommerce.com/s-e777fdx13v/products/112/images/392/mattress_1-4_1920__copy2x__87302.1599504001.386.513.jpg' },
  { id: 'vaya-hybrid', url: 'https://cdn11.bigcommerce.com/s-e777fdx13v/images/stencil/1920w/products/115/408/carousel-1920-12x__52684.1654629633.jpg?c=2' },

  // ── Saatva (saatva.com) ───────────────────────────────────────────────────
  { id: 'saatva-classic', url: 'https://saatva.imgix.net/products/saatva-classic/lifestyle/standard/11.5/saatva-classic-lifestyle-standard-11.5-3-2.jpg' },
  { id: 'saatva-rx',      url: 'https://saatva.imgix.net/products/saatva-rx/lifestyle/saatva-rx-lifestyle-3-2.jpg' },

  // ── Purple (purple.com) ───────────────────────────────────────────────────
  { id: 'purple-restoreplus-hybrid', url: 'https://purple.com/cdn/shop/files/RestorePlus-Hybrid-1.jpg?v=1741275302&width=1200' },

  // ── Casper (casper.com) ───────────────────────────────────────────────────
  { id: 'casper-the-one',     url: 'https://casper.com/cdn/shop/files/The-One-PDP-hero-without-Consumer-Reports.jpg?v=1757442326&width=1200' },
  { id: 'casper-dream-hybrid',url: 'https://casper.com/cdn/shop/files/Dream-PDP-Hero-without-Consumer-Reports.jpg?v=1758832974&width=1200' },

  // ── Leesa (leesa.com / contentstack CDN) ─────────────────────────────────
  { id: 'leesa-original',          url: 'https://images.contentstack.io/v3/assets/bltdab0c7b06198f4c2/bltd8eff0c7403584dc/698b460b162d1dab61c3e06e/leesa-16-9-mattress-original_(2).jpg' },
  { id: 'leesa-sapira-hybrid',     url: 'https://images.contentstack.io/v3/assets/bltdab0c7b06198f4c2/blta67592bd0f2a933b/6a31a8bcdca328000829214e/leesa-mattress-sapira-hybrid-01.jpg' },
  { id: 'leesa-sapira-chill-hybrid',url: 'https://images.contentstack.io/v3/assets/bltdab0c7b06198f4c2/blt7240d1f8f2c85e41/668eb4cd3d793f19f776de81/col-sapira-chill.jpg' },

  // ── Nolah (nolahsleep.com) ───────────────────────────────────────────────
  { id: 'nolah-natural-11',    url: 'https://www.nolahsleep.com/cdn/shop/files/assets_a60bb37726c64760aef6cf06b028e1a5_f92f92d0a5494c648d29d14652580baf.webp?v=1742220724' },
  { id: 'nolah-evolution-15',  url: 'https://www.nolahsleep.com/cdn/shop/files/assets_a60bb37726c64760aef6cf06b028e1a5_bec9b94342da4956818c8ff8ee29d6d4.webp?v=1741330648' },
  { id: 'nolah-original-hybrid',url: 'https://www.nolahsleep.com/cdn/shop/files/Mattress-Collection-Signature-All-Foam-400X300_8806612a-abbe-4ec8-879f-725a7afc437e.png?v=1756408537' },

  // ── Nest Bedding (nestbedding.com) ───────────────────────────────────────
  { id: 'nest-bedding-sparrow',    url: 'https://www.nestbedding.com/cdn/shop/products/Sparrow-Front-Optimized_800x570.jpg?v=1675877185' },
  { id: 'nest-bedding-owl',        url: 'https://www.nestbedding.com/cdn/shop/products/product-hero_owl_010_800x570.jpg?v=1646383390' },
  { id: 'nest-bedding-raven',      url: 'https://www.nestbedding.com/cdn/shop/products/Raven-Front_800x570.jpg?v=1681296055' },
  { id: 'nest-bedding-puffin-kids',url: 'https://www.nestbedding.com/cdn/shop/files/product-hero_puffin_800x570.jpg?v=1778709068' },

  // ── Brooklyn Bedding (brooklynbedding.com) ───────────────────────────────
  { id: 'brooklyn-bedding-aurora-luxe', url: 'https://brooklynbedding.com/cdn/shop/files/Aurora-product_80bc594e-5102-4ab9-8834-2ca71b2d829f-optimized.png' },
  { id: 'brooklyn-bedding-plank-firm',  url: 'https://brooklynbedding.com/cdn/shop/files/plank-product_72c0c56f-e92a-410d-b30c-4172f603d8ee.png' },

  // ── Bear (bearmattress.com) ───────────────────────────────────────────────
  { id: 'bear-original',    url: 'https://www.bearmattress.com/cdn/shop/files/Nav-Dropdown-Hover-Bear-Original-Front-Angle.jpg?v=1778266343' },
  { id: 'bear-star-hybrid', url: 'https://www.bearmattress.com/cdn/shop/files/StarHybrid-Silho-FrontHero-2068x1163.jpg?v=1680618319' },

  // ── GhostBed (ghostbed.com) ───────────────────────────────────────────────
  { id: 'ghostbed-flex', url: 'https://ghostbed-cdn.imgix.net/ghostbed-global/generic/products/ghostbed-flex-mattress-queen-base-pillows.webp?w=1280&fm=webp' },
  { id: 'ghostbed-luxe', url: 'https://cdn.shopify.com/s/files/1/0307/1167/7063/files/gb-luxe-foam-queen-main-image.webp?v=1773843852&width=900' },

  // ── PlushBeds (plushbeds.com) ─────────────────────────────────────────────
  { id: 'plushbeds-botanical-bliss', url: 'https://www.plushbeds.com/cdn/shop/products/the-botanical-bliss-organic-latex-mattress-618537_1024x1024.jpg?v=1773002381' },
  { id: 'plushbeds-signature-bliss', url: 'https://www.plushbeds.com/cdn/shop/products/pillowtop-mattress-the-signature-bliss-888726_1024x1024.jpg?v=1773002374' },
  { id: 'plushbeds-organic-bliss',   url: 'https://www.plushbeds.com/cdn/shop/products/organic-mattress-the-organic-bliss-pillowtop-788964_1024x1024.jpg?v=1773002377' },
  { id: 'plushbeds-luxury-bliss',    url: 'https://www.plushbeds.com/cdn/shop/products/the-luxury-bliss-organic-hybrid-latex-mattress-142650_1024x1024.jpg?v=1773002381' },
  { id: 'plushbeds-organic-kids',    url: 'https://www.plushbeds.com/cdn/shop/products/healthy-child-organic-latex-mattress-541738_1024x1024.jpg?v=1773002380' },

  // ── Naturepedic (naturepedic.com) ────────────────────────────────────────
  { id: 'naturepedic-eos-classic',   url: 'https://www.naturepedic.com/media/catalog/product/e/o/eosclassic_lifestyle_dsc_2172_1000x1000.jpg' },
  { id: 'naturepedic-concerto-plush',url: 'https://www.naturepedic.com/media/catalog/product/n/p/np1_0671-enr-edit3_1000x1000.jpg' },

  // ── Avocado (avocadogreenmattress.com) ───────────────────────────────────
  { id: 'avocado-green', url: 'https://www.avocadogreenmattress.com/cdn/shop/files/Avocado_Green_Mattress_Standard_Print-171_2000w_800x.jpg?v=1773845481' },

  // ── Birch (birchliving.com / Helix brand) ────────────────────────────────
  { id: 'birch-natural', url: 'https://res.cloudinary.com/helixsleep/image/upload/f_auto/c_scale,w_1200/Birch-Natural-Mattress-Carousel-1-JULY25_smtpv9?_a=BAAAV6E0' },

  // ── Helix (helixsleep.com) ────────────────────────────────────────────────
  { id: 'helix-midnight-luxe', url: 'https://res.cloudinary.com/helixsleep/image/upload/f_auto/c_scale,w_1200/Helix-Midnight-Luxe-Mattress-Carousel-1-JULY25_szy7xr?_a=BAAAV6E0' },
  { id: 'helix-dawn-luxe',     url: 'https://res.cloudinary.com/helixsleep/image/upload/f_auto/c_scale,w_1200/Helix-Dawn-Luxe-Mattress-Carousel-1-JULY25_wafxdm?_a=BAAAV6E0' },
  { id: 'helix-sunset-luxe',   url: 'https://res.cloudinary.com/helixsleep/image/upload/f_auto/c_scale,w_1200/Helix-Sunset-Luxe-Mattress-Carousel-1-JULY25_jjvogq?_a=BAAAV6E0' },

  // ── Eco Terra (ecoterra.life) ─────────────────────────────────────────────
  { id: 'eco-terra-hybrid-latex', url: 'https://ecoterra.life/cdn/shop/products/eco-terra-hybrid-latex-mattress.jpg?v=1643826745' },

  // ── Latex For Less (latexforless.com) ────────────────────────────────────
  { id: 'latex-for-less-hybrid-latex-mattress', url: 'https://www.latexforless.com/cdn/shop/products/3_800x.jpg?v=1775144609' },

  // ── SweetNight (sweetnight.com) ───────────────────────────────────────────
  { id: 'sweetnight-prime',    url: 'https://cdn.shopify.com/s/files/1/0365/1973/9437/files/prime-mattress-2_600x600.webp?v=1753238021' },
  { id: 'sweetnight-coolnest', url: 'https://www.sweetnight.com/cdn/shop/files/2400x1080-1_1.png?v=1780656767' },

  // ── Glacier (glaciersleep.com) ────────────────────────────────────────────
  { id: 'glacier-original-hybrid', url: 'https://glaciersleep.com/cdn/shop/files/Comparison_Original_web_1200_x_1200-01.jpg?v=1771436161' },
  { id: 'glacier-summit-hybrid',   url: 'https://glaciersleep.com/cdn/shop/files/Comparison_Summit_web_1200_x_1200-01.jpg?v=1773323180' },
  { id: 'glacier-apex-hybrid',     url: 'https://glaciersleep.com/cdn/shop/files/Comparison_Apex_web_1200_x_1200-01.jpg?v=1750363491' },

  // ── Westin (shop.westin.com) ──────────────────────────────────────────────
  { id: 'westin-heavenly-bed', url: 'https://shop.marriott.com/dw/image/v2/BLCS_PRD/on/demandware.static/-/Sites-productCatalog_MBB/default/dw8c34cf0e/images/main/WESTINH2-HB-124-01_A_00449.jpg?sw=1680&sh=2124' },

  // ── FORM (formsleep.com CDN) ──────────────────────────────────────────────
  { id: 'form-core',        url: 'https://cdn11.bigcommerce.com/s-hfpsckbbuw/images/stencil/1920w/content/assets/pdp/temp/core/FORM_Core10_V1-hero34R_Brand_6000.jpg?compression=lossy' },
  { id: 'form-core-hybrid', url: 'https://cdn11.bigcommerce.com/s-hfpsckbbuw/images/stencil/1920w/content/assets/pdp/temp/core-hybrid/FORM_CoreHybrid12_V1-hero34R_Brand_6000.jpg?compression=lossy' },
  { id: 'form-prime',       url: 'https://cdn11.bigcommerce.com/s-hfpsckbbuw/images/stencil/1920w/content/assets/pdp/temp/prime/FORM_Prime14_V1-hero34R_Brand_6000.jpg?compression=lossy' },
  { id: 'form-prime-x',     url: 'https://cdn11.bigcommerce.com/s-hfpsckbbuw/images/stencil/1920w/content/assets/pdp/temp/prime-x-mattress/FORM_Prime15_V1-hero34R_Brand_6000.jpg?compression=lossy' },
];

async function downloadAndConvert(id, url) {
  const outPath = path.join(OUT_DIR, `${id}.webp`);

  try {
    const resp = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
      },
      signal: AbortSignal.timeout(30000),
    });

    if (!resp.ok) {
      console.warn(`  ⚠  ${id}: HTTP ${resp.status} from ${url}`);
      return { id, success: false, status: resp.status };
    }

    const buffer = Buffer.from(await resp.arrayBuffer());

    // Convert to webp with 80% quality, resize to max 800px wide
    await sharp(buffer)
      .resize({ width: 800, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(outPath);

    const stat = await import('fs').then(m => m.promises.stat(outPath));
    console.log(`  ✓  ${id}.webp (${Math.round(stat.size / 1024)}KB)`);
    return { id, success: true };
  } catch (err) {
    console.warn(`  ✗  ${id}: ${err.message}`);
    return { id, success: false, error: err.message };
  }
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  console.log(`Downloading ${MANIFEST.length} mattress images to ${OUT_DIR}\n`);

  // Run in batches of 5 to avoid overwhelming servers
  const results = [];
  for (let i = 0; i < MANIFEST.length; i += 5) {
    const batch = MANIFEST.slice(i, i + 5);
    const batchResults = await Promise.all(
      batch.map(({ id, url }) => downloadAndConvert(id, url))
    );
    results.push(...batchResults);
    // Small delay between batches
    if (i + 5 < MANIFEST.length) await new Promise(r => setTimeout(r, 500));
  }

  const ok = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);

  console.log(`\n✓ Downloaded: ${ok.length}/${results.length}`);
  if (failed.length > 0) {
    console.log(`✗ Failed (${failed.length}):`);
    failed.forEach(f => console.log(`  - ${f.id}: ${f.error || 'HTTP ' + f.status}`));
  }
}

main().catch(console.error);
