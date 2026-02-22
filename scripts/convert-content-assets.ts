/**
 * Convert SVG assets in content/assets/ to PNG using @resvg/resvg-js
 *
 * Usage: npx tsx scripts/convert-content-assets.ts
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, basename, extname } from 'path';
import { Resvg } from '@resvg/resvg-js';

const ASSETS_DIR = join(import.meta.dirname, '..', 'content', 'assets');

// Size limits in bytes
const SIZE_LIMITS: Record<string, number> = {
  'icon': 2 * 1024 * 1024,       // 2 MB
  'thumbnail': 5 * 1024 * 1024,  // 5 MB
  'gallery': 10 * 1024 * 1024,   // 10 MB
};

function getSizeLimit(filename: string): number {
  if (filename.startsWith('icon')) return SIZE_LIMITS['icon'];
  if (filename.startsWith('thumbnail')) return SIZE_LIMITS['thumbnail'];
  return SIZE_LIMITS['gallery'];
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function main() {
  console.log('Converting SVG assets to PNG...\n');

  const files = readdirSync(ASSETS_DIR)
    .filter(f => extname(f).toLowerCase() === '.svg')
    .sort();

  if (files.length === 0) {
    console.error('No SVG files found in content/assets/');
    process.exit(1);
  }

  let hasErrors = false;

  for (const file of files) {
    const svgPath = join(ASSETS_DIR, file);
    const pngName = basename(file, '.svg') + '.png';
    const pngPath = join(ASSETS_DIR, pngName);

    const svgData = readFileSync(svgPath, 'utf-8');

    const resvg = new Resvg(svgData, {
      fitTo: { mode: 'original' },
      font: {
        loadSystemFonts: true,
      },
    });

    const rendered = resvg.render();
    const pngBuffer = rendered.asPng();

    writeFileSync(pngPath, pngBuffer);

    const pngSize = statSync(pngPath).size;
    const limit = getSizeLimit(basename(file, '.svg'));
    const withinLimit = pngSize <= limit;

    const status = withinLimit ? '✓' : '✗ OVER LIMIT';
    const sizeColor = withinLimit ? '' : ' ⚠️';

    console.log(
      `${status} ${pngName} — ${rendered.width}×${rendered.height} — ${formatBytes(pngSize)} (limit: ${formatBytes(limit)})${sizeColor}`
    );

    if (!withinLimit) {
      hasErrors = true;
    }
  }

  console.log(`\nConverted ${files.length} SVG(s) to PNG.`);

  if (hasErrors) {
    console.error('\n⚠️  Some files exceed size limits. Simplify the SVGs and try again.');
    process.exit(1);
  }
}

main();
