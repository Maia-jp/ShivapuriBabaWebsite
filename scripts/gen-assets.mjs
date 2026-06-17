// One-off generator for static favicons + the Open Graph share image.
// Run with: node scripts/gen-assets.mjs
// Outputs are committed to public/; this is not part of the build.
import sharp from 'sharp';

const PAPER = '#faf8f4';
const INK = '#1c1917';
const MUTED = '#78716c';
const RULE = '#d8d2c6';

// --- Icon mark: a bindu (point) within a ring — light version for rasters. ---
const markSvg = (size) => Buffer.from(
	`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
		<circle cx="16" cy="16" r="11" fill="none" stroke="${INK}" stroke-width="1.5"/>
		<circle cx="16" cy="16" r="3.1" fill="${INK}"/>
	</svg>`
);

// favicon-32.png — PNG fallback for clients that don't take SVG favicons.
await sharp(markSvg(), { density: 384 })
	.resize(32, 32)
	.flatten({ background: PAPER })
	.png()
	.toFile('public/favicon-32.png');

// apple-touch-icon.png — iOS home screen (no transparency, gentle padding).
await sharp({
	create: { width: 180, height: 180, channels: 3, background: PAPER },
})
	.composite([{ input: await sharp(markSvg(), { density: 768 }).resize(120, 120).png().toBuffer() }])
	.png()
	.toFile('public/apple-touch-icon.png');

// --- Open Graph image: portrait at left, title block at right, on paper. ---
const W = 1200, H = 630, PW = 470, TX = 540;
const portrait = await sharp('src/assets/shivapuri-baba-portrait.jpg')
	.resize(PW, H, { fit: 'cover', position: 'top' })
	.toBuffer();

const textSvg = Buffer.from(
	`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
		<line x1="${PW}" y1="0" x2="${PW}" y2="${H}" stroke="${RULE}" stroke-width="1"/>
		<text x="${TX}" y="278" font-family="Georgia, 'Times New Roman', serif" font-size="66" font-weight="600" fill="${INK}">Shivapuri Baba</text>
		<text x="${TX}" y="330" font-family="Georgia, 'Times New Roman', serif" font-size="30" fill="${MUTED}">1826 – 1963</text>
		<line x1="${TX}" y1="362" x2="1120" y2="362" stroke="${RULE}" stroke-width="1"/>
		<text x="${TX}" y="420" font-family="Georgia, 'Times New Roman', serif" font-size="33" fill="#44403c">Life, teaching, and the Right Life</text>
	</svg>`
);

await sharp({ create: { width: W, height: H, channels: 3, background: PAPER } })
	.composite([
		{ input: portrait, left: 0, top: 0 },
		{ input: textSvg, left: 0, top: 0 },
	])
	.jpeg({ quality: 88, mozjpeg: true })
	.toFile('public/og.jpg');

console.log('Generated: public/favicon-32.png, public/apple-touch-icon.png, public/og.jpg');
