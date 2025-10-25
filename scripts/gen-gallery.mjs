// scripts/gen-gallery.mjs
import { promises as fs } from 'node:fs';
import path from 'node:path';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const GALLERY_DIR = path.join(PUBLIC_DIR, 'gallery');
const OUT = path.join(PUBLIC_DIR, 'gallery-manifest.json');

const exts = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.avif']);

async function main() {
  let files = [];
  try {
    files = await fs.readdir(GALLERY_DIR);
  } catch (e) {
    console.error('Folder /public/gallery tidak ditemukan.');
    await fs.writeFile(OUT, '[]');
    return;
  }

  const items = files
    .filter((f) => exts.has(path.extname(f).toLowerCase()))
    // URL-encode agar spasi & karakter spesial aman di production
    .map((f) => ({
      src: `/gallery/${encodeURIComponent(f)}`,
      alt: f.replace(/\.[^/.]+$/, '').replace(/[-_]+/g, ' '),
    }));

  await fs.writeFile(OUT, JSON.stringify(items, null, 2), 'utf8');
  console.log(`Generated ${OUT} with ${items.length} items.`);
}

main();
