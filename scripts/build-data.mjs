// Builds the two data files the character breakdown needs:
//
//   static/data/ids.txt         char -> Ideographic Description Sequence
//   static/data/readings.txt    char -> pinyin + English gloss
//
// Sources are downloaded once into .cache/ (gitignored). Run with `npm run data`.

import { mkdir, readFile, writeFile, stat } from 'node:fs/promises';

const CACHE = new URL('../.cache/', import.meta.url);
const OUT = new URL('../static/data/', import.meta.url);

const SOURCES = {
	// CHISE / CJKVI ideographic description sequences.
	'ids.txt': 'https://raw.githubusercontent.com/cjkvi/cjkvi-ids/master/ids.txt',
	// Unihan readings, extracted from the UCD zip.
	'Unihan_Readings.txt': 'https://www.unicode.org/Public/UCD/latest/ucd/Unihan.zip'
};

/** Blocks a user might plausibly type, plus the radical/stroke blocks. */
const SEED_BLOCKS = [
	[0x2e80, 0x2eff], // CJK Radicals Supplement
	[0x2f00, 0x2fdf], // Kangxi Radicals
	[0x31c0, 0x31ef], // CJK Strokes
	[0x3400, 0x4dbf], // Unified Ideographs Extension A
	[0x4e00, 0x9fff] // Unified Ideographs
];

const IDC = /[⿰-⿻]/;

function inSeedBlocks(cp) {
	return SEED_BLOCKS.some(([lo, hi]) => cp >= lo && cp <= hi);
}

async function exists(url) {
	try {
		await stat(url);
		return true;
	} catch {
		return false;
	}
}

async function fetchSource(name) {
	const file = new URL(name, CACHE);
	if (await exists(file)) return file;

	const url = SOURCES[name];
	console.log(`downloading ${name}`);
	const res = await fetch(url);
	if (!res.ok) throw new Error(`${url}: ${res.status} ${res.statusText}`);
	const buf = Buffer.from(await res.arrayBuffer());

	if (url.endsWith('.zip')) {
		// Node has no unzip, but every platform we build on has the CLI.
		const zip = new URL(`${name}.zip`, CACHE);
		await writeFile(zip, buf);
		const { execFile } = await import('node:child_process');
		const { promisify } = await import('node:util');
		await promisify(execFile)('unzip', ['-o', '-q', zip.pathname, name, '-d', CACHE.pathname]);
	} else {
		await writeFile(file, buf);
	}
	return file;
}

/**
 * Pick one decomposition per character. Lines look like
 *   U+4E0E<TAB>与<TAB>⿹②一[GTKV]<TAB>⿻②一[J]
 * A character listed as its own decomposition is atomic.
 */
function chooseIds(char, candidates) {
	const parsed = candidates
		.map((raw) => {
			const m = /^(.*?)(?:\[([A-Z]+)\])?$/.exec(raw.trim());
			return { ids: m[1].trim(), tags: m[2] ?? '' };
		})
		.filter((c) => c.ids && c.ids !== char && IDC.test(c.ids));

	if (!parsed.length) return null;
	// Prefer the mainland-China form, then an untagged form, then whatever is first.
	return (parsed.find((c) => c.tags.includes('G')) ?? parsed.find((c) => !c.tags) ?? parsed[0]).ids;
}

async function buildIds() {
	const text = await readFile(await fetchSource('ids.txt'), 'utf8');
	const all = new Map();

	for (const line of text.split('\n')) {
		if (!line || line.startsWith('#')) continue;
		const [, char, ...candidates] = line.split('\t');
		if (!char || [...char].length !== 1) continue;
		const ids = chooseIds(char, candidates);
		if (ids) all.set(char, ids);
	}

	// Keep the seed blocks plus every component reachable from them, so recursive
	// breakdown never dead-ends on a component from an extension block.
	const keep = new Map();
	const queue = [...all.keys()].filter((c) => inSeedBlocks(c.codePointAt(0)));
	while (queue.length) {
		const char = queue.pop();
		if (keep.has(char)) continue;
		const ids = all.get(char);
		if (!ids) continue;
		keep.set(char, ids);
		for (const part of ids) {
			if (!IDC.test(part) && all.has(part) && !keep.has(part)) queue.push(part);
		}
	}

	const lines = [...keep].sort().map(([char, ids]) => `${char}\t${ids}`);
	await writeFile(new URL('ids.txt', OUT), lines.join('\n') + '\n');
	console.log(`static/data/ids.txt: ${lines.length} characters`);
	return keep;
}

async function buildReadings(needed) {
	const text = await readFile(await fetchSource('Unihan_Readings.txt'), 'utf8');
	const entries = new Map();

	for (const line of text.split('\n')) {
		if (!line || line.startsWith('#')) continue;
		const [code, field, value] = line.split('\t');
		if (field !== 'kMandarin' && field !== 'kDefinition') continue;
		const cp = parseInt(code.slice(2), 16);
		const char = String.fromCodePoint(cp);
		if (!inSeedBlocks(cp) && !needed.has(char)) continue;

		const entry = entries.get(char) ?? { pinyin: '', gloss: '' };
		if (field === 'kMandarin') {
			// kMandarin can list a second (Taiwan) reading; the first is enough.
			entry.pinyin = value.trim().split(/\s+/)[0];
		} else {
			// Definitions run long. Keep the first few senses.
			entry.gloss = value.trim().split(';').slice(0, 3).join(';').replace(/\s+/g, ' ').slice(0, 90);
		}
		entries.set(char, entry);
	}

	const lines = [...entries]
		.filter(([, e]) => e.pinyin || e.gloss)
		.sort()
		.map(([char, e]) => `${char}\t${e.pinyin}\t${e.gloss}`);
	await writeFile(new URL('readings.txt', OUT), lines.join('\n') + '\n');
	console.log(`static/data/readings.txt: ${lines.length} characters`);
}

await mkdir(CACHE, { recursive: true });
await mkdir(OUT, { recursive: true });
const ids = await buildIds();
await buildReadings(ids);
