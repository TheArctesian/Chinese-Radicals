// Builds the data files the character tools need:
//
//   static/data/ids.txt            char -> Ideographic Description Sequence
//   static/data/readings.txt       char -> pinyin + English gloss
//   static/data/radical-chars.txt  Kangxi radical number -> example characters
//
// Sources are downloaded once into .cache/ (gitignored). Run with `npm run data`.
// See the data and licensing section of README.md for provenance and terms.

import { mkdir, readFile, writeFile, stat } from 'node:fs/promises';

const CACHE = new URL('../.cache/', import.meta.url);
const OUT = new URL('../static/data/', import.meta.url);

const SOURCES = {
	// CHISE / CJKVI ideographic description sequences.
	'ids.txt': 'https://raw.githubusercontent.com/cjkvi/cjkvi-ids/master/ids.txt',
	// Unihan readings, extracted from the UCD zip.
	'Unihan_Readings.txt': 'https://www.unicode.org/Public/UCD/latest/ucd/Unihan.zip',
	// Stroke counts and the IICore common-character set, from the same zip.
	'Unihan_IRGSources.txt': 'https://www.unicode.org/Public/UCD/latest/ucd/Unihan.zip'
};

const PROVENANCE = {
	ids: [
		'# char <TAB> Ideographic Description Sequence.',
		'# Derived from cjkvi-ids (https://github.com/cjkvi/cjkvi-ids), which takes',
		'# ids.txt from the CHISE project (http://www.chise.org/) under GPLv2.',
		'# Regenerate with `npm run data`; see README.md for terms.'
	],
	readings: [
		'# char <TAB> pinyin <TAB> English gloss.',
		'# Derived from the Unicode Han Database (Unihan), (c) Unicode, Inc.,',
		'# used under the Unicode Terms of Use / UNICODE LICENSE V3.',
		'# Regenerate with `npm run data`; see README.md for terms.'
	],
	radicalChars: [
		'# Kangxi radical number <TAB> characters built from it, most useful first.',
		'# Computed from ids.txt above; ordering uses Unihan kIICore and kTotalStrokes.',
		'# Regenerate with `npm run data`; see README.md for terms.'
	]
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

/** Write a data file with its provenance header. */
async function write(name, header, lines) {
	await writeFile(new URL(name, OUT), [...header, ...lines].join('\n') + '\n');
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
	await write('ids.txt', PROVENANCE.ids, lines);
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
	await write('readings.txt', PROVENANCE.readings, lines);
	console.log(`static/data/readings.txt: ${lines.length} characters`);
}

/**
 * The 214 radicals live in src/lib/radicals.ts, which is hand-maintained. Read
 * the forms straight out of it so the two can never drift apart.
 */
async function readRadicalForms() {
	const src = await readFile(new URL('../src/lib/radicals.ts', import.meta.url), 'utf8');
	const forms = new Map();
	let count = 0;

	for (const block of src.split(/\{\s*number:/).slice(1)) {
		const number = Number(block.match(/^\s*(\d+)/)[1]);
		const canonical = block.match(/radical: '(.+?)'/)[1];
		const variants = [...block.matchAll(/variants: \[([^\]]*)\]/g)].flatMap((m) =>
			[...m[1].matchAll(/'(.+?)'/g)].map((v) => v[1])
		);
		count++;
		for (const form of [canonical, ...variants]) {
			if (!forms.has(form)) forms.set(form, number);
		}
	}

	if (count !== 214) throw new Error(`src/lib/radicals.ts: parsed ${count} radicals, expected 214`);
	return forms;
}

/**
 * Signals for ordering example characters, best first:
 *   kHanyuPinlu   corpus frequency, e.g. `hǎi(914)` — the strongest signal, but
 *                 only ~3,800 characters have it
 *   kIICore       flagged as in common East Asian use (~9,800 characters)
 *   kTotalStrokes stroke count, the tie-breaker: simpler characters first
 */
async function readCharacterRanks() {
	const readings = await readFile(await fetchSource('Unihan_Readings.txt'), 'utf8');
	const frequency = new Map();
	for (const line of readings.split('\n')) {
		if (!line || line.startsWith('#')) continue;
		const [code, field, value] = line.split('\t');
		if (field !== 'kHanyuPinlu') continue;
		const counts = [...value.matchAll(/\((\d+)\)/g)].map((m) => Number(m[1]));
		if (counts.length) {
			frequency.set(String.fromCodePoint(parseInt(code.slice(2), 16)), Math.max(...counts));
		}
	}

	const irg = await readFile(await fetchSource('Unihan_IRGSources.txt'), 'utf8');
	const common = new Set();
	const strokes = new Map();
	for (const line of irg.split('\n')) {
		if (!line || line.startsWith('#')) continue;
		const [code, field, value] = line.split('\t');
		if (field !== 'kIICore' && field !== 'kTotalStrokes') continue;
		const char = String.fromCodePoint(parseInt(code.slice(2), 16));
		if (field === 'kIICore') common.add(char);
		else strokes.set(char, Number(value.trim().split(/\s+/)[0]));
	}

	return { frequency, common, strokes };
}

/** Which radicals a character is built from, stopping at radical forms. */
function radicalsOf(char, ids, forms, depth = 0, seen = new Set()) {
	const found = new Set();
	const sequence = ids.get(char);
	if (!sequence || depth > 6 || seen.has(char)) return found;

	const path = new Set(seen).add(char);
	for (const part of sequence) {
		if (IDC.test(part)) continue;
		const number = forms.get(part);
		if (number) found.add(number);
		else for (const n of radicalsOf(part, ids, forms, depth + 1, path)) found.add(n);
	}
	return found;
}

/**
 * Invert the decompositions: for each radical, the characters built from it.
 * Common characters come first, then simpler ones, so the examples are useful
 * rather than exhaustive.
 */
async function buildRadicalChars(ids, forms) {
	const { frequency, common, strokes } = await readCharacterRanks();
	const PER_RADICAL = 48;
	const byRadical = new Map();

	for (const char of ids.keys()) {
		const cp = char.codePointAt(0);
		// Only the main block: extension-A characters are too obscure to be examples.
		if (cp < 0x4e00 || cp > 0x9fff) continue;
		if (forms.has(char)) continue; // a radical is not an example of itself
		for (const number of radicalsOf(char, ids, forms)) {
			if (!byRadical.has(number)) byRadical.set(number, []);
			byRadical.get(number).push(char);
		}
	}

	// Frequency first (descending), then the common set, then stroke count.
	const rank = (char) => [
		frequency.has(char) ? 0 : common.has(char) ? 1 : 2,
		-(frequency.get(char) ?? 0),
		strokes.get(char) ?? 99
	];
	const lines = [];
	let total = 0;
	for (let number = 1; number <= 214; number++) {
		const chars = (byRadical.get(number) ?? [])
			.sort((a, b) => {
				const [at, af, as] = rank(a);
				const [bt, bf, bs] = rank(b);
				return at - bt || af - bf || as - bs || a.localeCompare(b);
			})
			.slice(0, PER_RADICAL);
		total += chars.length;
		lines.push(`${number}\t${chars.join('')}`);
	}

	await write('radical-chars.txt', PROVENANCE.radicalChars, lines);
	const empty = lines.filter((l) => l.endsWith('\t')).length;
	console.log(
		`static/data/radical-chars.txt: ${total} examples across ${214 - empty} radicals` +
			(empty ? ` (${empty} with none)` : '')
	);
}

await mkdir(CACHE, { recursive: true });
await mkdir(OUT, { recursive: true });
const ids = await buildIds();
await buildReadings(ids);
await buildRadicalChars(ids, await readRadicalForms());
