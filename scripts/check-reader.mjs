// Reader-mode regression test (pillar 3: the best possible reading experience).
//
// Runs the same algorithm browsers use for Reader View — Mozilla Readability,
// the engine behind Safari Reader and Firefox Reader Mode — against the built
// pages and asserts that each long-form page extracts cleanly: it is offered as
// readerable, parses, keeps its lead image and headings, and reads coherently.
//
// Usage: pnpm build && node scripts/check-reader.mjs   (or: pnpm test:reader)
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { JSDOM } from 'jsdom';
import { Readability, isProbablyReaderable } from '@mozilla/readability';

const DIST = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const SITE = 'https://shivapuri-baba.com';

if (!existsSync(DIST)) {
	console.error('✗ dist/ not found — run `pnpm build` first.');
	process.exit(1);
}

// Long-form "chapter" pages that MUST read like an ebook in Reader View.
// Latin-script locales (en, pt-br) share one bar; non-Latin scripts (Arabic,
// Devanagari) are held to a slightly lower char floor — the same prose is more
// compact in those scripts, so the floor still proves substantial extraction.
const articles = [
	// English (default)
	{ file: 'biography/index.html', minChars: 12000, image: true },
	{ file: 'teachings/right-living/index.html', minChars: 9000, image: true },
	{ file: 'books/index.html', minChars: 4000, image: false },
	{ file: 'about/index.html', minChars: 1500, image: false },
	// Brazilian Portuguese
	{ file: 'pt-br/biografia/index.html', minChars: 12000, image: true },
	{ file: 'pt-br/ensinamentos/vida-correta/index.html', minChars: 9000, image: true },
	{ file: 'pt-br/livros/index.html', minChars: 4000, image: false },
	{ file: 'pt-br/sobre/index.html', minChars: 1500, image: false },
	// Arabic / Nepali / Hindi (non-Latin scripts)
	...['ar', 'ne', 'hi'].flatMap((l) => [
		{ file: `${l}/biography/index.html`, minChars: 8000, image: true },
		{ file: `${l}/teachings/right-living/index.html`, minChars: 6000, image: true },
		{ file: `${l}/books/index.html`, minChars: 3000, image: false },
		{ file: `${l}/about/index.html`, minChars: 1000, image: false },
	]),
];

// Utility/navigation pages that should NOT masquerade as articles.
const nonArticles = [
	'teachings/index.html',
	'pt-br/ensinamentos/index.html',
	'ar/teachings/index.html',
	'ne/teachings/index.html',
	'hi/teachings/index.html',
	'404.html',
];

let failures = 0;
const fail = (msg) => {
	console.error(`  ✗ ${msg}`);
	failures++;
};

for (const { file, minChars, image } of articles) {
	const url = `${SITE}/${file.replace(/index\.html$/, '')}`;
	const dom = new JSDOM(readFileSync(join(DIST, file), 'utf8'), { url });
	const doc = dom.window.document;
	console.log(`\n${file}`);

	if (!isProbablyReaderable(doc)) fail('not offered as readerable');

	const article = new Readability(doc.cloneNode(true)).parse();
	if (!article) {
		fail('Readability failed to parse');
		continue;
	}

	const frag = new JSDOM(`<body>${article.content}</body>`).window.document;
	if (article.length < minChars)
		fail(`extracted ${article.length} chars, expected ≥ ${minChars}`);
	// Script-agnostic: any Unicode letter (Latin, Arabic, Devanagari, …).
	if (!article.title || !/\p{L}/u.test(article.title)) fail('missing title');
	if (frag.querySelectorAll('h2,h3').length < 1) fail('no headings survived extraction');
	if (image && frag.querySelectorAll('img').length < 1) fail('lead image dropped in Reader View');

	console.log(
		`  → readerable · ${article.length} chars · ${frag.querySelectorAll('h2,h3').length} headings · ${frag.querySelectorAll('img').length} image(s)`
	);
}

for (const file of nonArticles) {
	const dom = new JSDOM(readFileSync(join(DIST, file), 'utf8'), { url: `${SITE}/${file}` });
	console.log(`\n${file}`);
	if (isProbablyReaderable(dom.window.document))
		fail('navigation/utility page is incorrectly offered as an article');
	else console.log('  ✓ correctly not treated as an article');
}

console.log('');
if (failures) {
	console.error(`✗ Reader-mode check failed: ${failures} problem(s).`);
	process.exit(1);
}
console.log('✓ Reader-mode check passed — all chapter pages extract cleanly.');
