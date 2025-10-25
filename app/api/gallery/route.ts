import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const dir = path.join(process.cwd(), 'public', 'gallery');
    const files = await fs.readdir(dir);

    const allow = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.avif', '.svg']);
    const items = files
      .filter(f => allow.has(path.extname(f).toLowerCase()))
      .map(f => ({
        src: `/gallery/${encodeURIComponent(f)}`,
        alt: path.parse(f).name.replace(/[-_]+/g, ' ')
      }));

    return NextResponse.json(items);
  } catch (e) {
    return NextResponse.json([], { status: 200 });
  }
}
