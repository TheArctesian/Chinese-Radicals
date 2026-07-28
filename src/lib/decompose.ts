// Breaks a Han character into its constituent parts using Ideographic
// Description Sequences, stopping when it reaches one of the 214 radicals.
//
// The data files are built by scripts/build-data.mjs and fetched on first use
// so the table itself stays a static page.

import { radicalByForm, type Radical } from './radicals';

/** Ideographic Description Characters — the layout operators inside an IDS. */
const LAYOUTS: Record<string, { arity: number; name: string }> = {
	'⿰': { arity: 2, name: 'left to right' },
	'⿱': { arity: 2, name: 'above and below' },
	'⿲': { arity: 3, name: 'three across' },
	'⿳': { arity: 3, name: 'three stacked' },
	'⿴': { arity: 2, name: 'fully surrounded' },
	'⿵': { arity: 2, name: 'surrounded from above' },
	'⿶': { arity: 2, name: 'surrounded from below' },
	'⿷': { arity: 2, name: 'surrounded from the left' },
	'⿸': { arity: 2, name: 'surrounded from upper left' },
	'⿹': { arity: 2, name: 'surrounded from upper right' },
	'⿺': { arity: 2, name: 'surrounded from lower left' },
	'⿻': { arity: 2, name: 'overlaid' }
};

export interface Reading {
	pinyin: string;
	gloss: string;
}

export interface Part {
	/** The component itself, or a placeholder for an unencoded one. */
	char: string;
	/** True when the source data had no codepoint for this component. */
	unencoded: boolean;
	/** The 214-radical entry this component is a form of, if any. */
	radical: Radical | null;
	reading: Reading | null;
	/** How this part's own children are arranged, when it breaks down further. */
	layout: { char: string; name: string } | null;
	children: Part[];
	/** Set when we stopped early rather than because the part is atomic. */
	truncated: boolean;
}

const MAX_DEPTH = 6;

let loading: Promise<void> | null = null;
let ready = false;
let idsMap: Map<string, string> = new Map();
let readingMap: Map<string, Reading> = new Map();

/** Fetch and parse the data files. Safe to call repeatedly. */
export function loadData(fetcher: typeof fetch = fetch): Promise<void> {
	if (!loading) {
		loading = (async () => {
			const [ids, readings] = await Promise.all([
				fetcher('/data/ids.txt').then(requireOk),
				fetcher('/data/readings.txt').then(requireOk)
			]);

			idsMap = new Map();
			for (const line of ids.split('\n')) {
				if (!line || line.startsWith('#')) continue;
				const tab = line.indexOf('\t');
				if (tab > 0) idsMap.set(line.slice(0, tab), line.slice(tab + 1));
			}

			readingMap = new Map();
			for (const line of readings.split('\n')) {
				if (!line || line.startsWith('#')) continue;
				const [char, pinyin, gloss] = line.split('\t');
				if (char) readingMap.set(char, { pinyin: pinyin ?? '', gloss: gloss ?? '' });
			}

			ready = true;
		})().catch((err) => {
			loading = null; // let the next attempt retry
			throw err;
		});
	}
	return loading;
}

let loadingExamples: Promise<void> | null = null;
let exampleMap: Map<number, string[]> = new Map();

/**
 * Fetch the reverse index: which characters are built from each radical. Kept
 * separate from `loadData` so the table only pays for it when someone asks.
 */
export function loadRadicalExamples(fetcher: typeof fetch = fetch): Promise<void> {
	if (!loadingExamples) {
		loadingExamples = (async () => {
			const text = await fetcher('/data/radical-chars.txt').then(requireOk);
			exampleMap = new Map();
			for (const line of text.split('\n')) {
				if (!line || line.startsWith('#')) continue;
				const [number, chars] = line.split('\t');
				if (number && chars) exampleMap.set(Number(number), [...chars]);
			}
		})().catch((err) => {
			loadingExamples = null;
			throw err;
		});
	}
	return loadingExamples;
}

/** Characters built from a radical, most useful first. Requires loadRadicalExamples(). */
export function examplesFor(number: number): string[] {
	return exampleMap.get(number) ?? [];
}

async function requireOk(res: Response): Promise<string> {
	if (!res.ok) throw new Error(`Could not load ${res.url} (${res.status})`);
	return res.text();
}

export function getReading(char: string): Reading | null {
	return readingMap.get(char) ?? null;
}

export function isHan(char: string): boolean {
	const cp = char.codePointAt(0);
	if (cp === undefined) return false;
	return (
		(cp >= 0x2e80 && cp <= 0x2fdf) || // radicals supplement + Kangxi radicals
		(cp >= 0x31c0 && cp <= 0x31ef) || // strokes
		(cp >= 0x3400 && cp <= 0x4dbf) || // extension A
		(cp >= 0x4e00 && cp <= 0x9fff) || // unified ideographs
		(cp >= 0x20000 && cp <= 0x3ffff) // extensions B and beyond
	);
}

/** Han characters in a string, in order, with duplicates removed. */
export function hanCharacters(input: string): string[] {
	const seen: string[] = [];
	for (const char of input) {
		if (isHan(char) && !seen.includes(char)) seen.push(char);
	}
	return seen;
}

/**
 * Parse an IDS (prefix notation, e.g. `⿱⿱爫冖𢖻`) into the top-level layout
 * and its immediate components. Nested sequences stay grouped as sub-parts.
 */
function parseIds(ids: string): { layout: string; parts: string[] } | null {
	const tokens = [...ids];
	if (!tokens.length) return null;

	let cursor = 0;
	/** Consume one component, which may itself be a whole sub-sequence. */
	function takeComponent(): string | null {
		const token = tokens[cursor];
		if (token === undefined) return null;
		cursor++;
		const layout = LAYOUTS[token];
		if (!layout) return token;

		let group = token;
		for (let i = 0; i < layout.arity; i++) {
			const child = takeComponent();
			if (child === null) return null;
			group += child;
		}
		return group;
	}

	const head = tokens[cursor];
	const layout = head ? LAYOUTS[head] : undefined;
	if (!layout) return null;
	cursor++;

	const parts: string[] = [];
	for (let i = 0; i < layout.arity; i++) {
		const part = takeComponent();
		if (part === null) return null;
		parts.push(part);
	}
	return { layout: head, parts };
}

function makePart(token: string, depth: number, path: Set<string>): Part {
	// A token is either a single component or a nested sub-sequence. A nested
	// sequence has no character of its own, so it renders as a bracketed group.
	const nested = LAYOUTS[token[0]] ? token : null;
	const char = nested ? '' : token;
	const radical = char ? (radicalByForm.get(char) ?? null) : null;

	const part: Part = {
		char,
		unencoded: !!char && !isHan(char),
		radical,
		reading: char ? getReading(char) : null,
		layout: null,
		children: [],
		truncated: false
	};

	// Radicals are the destination, so we stop there rather than splitting a
	// radical into strokes. The character being looked up is the exception: if
	// someone searches a radical itself, they still want to see it opened up.
	if (radical && depth > 0) return part;

	const ids = nested ?? idsMap.get(char);
	if (!ids) return part;

	if (depth >= MAX_DEPTH || path.has(char)) {
		part.truncated = true;
		return part;
	}

	const parsed = parseIds(ids);
	if (!parsed) return part;

	const nextPath = char ? new Set(path).add(char) : path;
	part.layout = { char: parsed.layout, name: LAYOUTS[parsed.layout].name };
	part.children = parsed.parts.map((p) => makePart(p, depth + 1, nextPath));
	return part;
}

/** Build the breakdown tree for a single character. Requires loadData(). */
export function decompose(char: string): Part {
	return makePart(char, 0, new Set());
}

/** The 214-radical entries found anywhere in a breakdown, in reading order. */
export function radicalsIn(part: Part): Radical[] {
	const found: Radical[] = [];
	const walk = (node: Part) => {
		if (node.radical && !found.includes(node.radical)) found.push(node.radical);
		node.children.forEach(walk);
	};
	walk(part);
	return found;
}

/** Every leaf component, radical or not — what the character is actually made of. */
export function leavesOf(part: Part): Part[] {
	if (!part.children.length) return part.char || part.unencoded ? [part] : [];
	return part.children.flatMap(leavesOf);
}

/** One component in a character's transliteration. */
export interface Token {
	char: string;
	radical: Radical | null;
	reading: Reading | null;
	unencoded: boolean;
}

export interface Transliteration {
	char: string;
	reading: Reading | null;
	/** Set when the character is itself one of the 214 radicals. */
	radical: Radical | null;
	/** The components it spells out, left to right, top to bottom. */
	tokens: Token[];
	/** True when the data has no breakdown, so the character stands alone. */
	atomic: boolean;
}

const transliterations = new Map<string, Transliteration>();

/**
 * A character as its constituent components. Unlike `decompose`, this flattens
 * the tree — a radical is a component, not something to open up further.
 * Results are memoised, so running over a long text stays cheap.
 */
export function transliterate(char: string): Transliteration {
	const cached = transliterations.get(char);
	if (cached) return cached;

	const radical = radicalByForm.get(char) ?? null;
	const tree = decompose(char);
	const leaves = radical ? [] : leavesOf(tree);
	const result: Transliteration = {
		char,
		reading: getReading(char),
		radical,
		// A radical spells itself; anything else spells out its leaf components.
		tokens: (leaves.length ? leaves : [tree]).map((leaf) => ({
			char: leaf.char,
			radical: leaf.radical,
			reading: leaf.reading,
			unencoded: leaf.unencoded
		})),
		atomic: !radical && !leaves.length
	};

	// Don't memoise anything worked out before the data landed.
	if (ready) transliterations.set(char, result);
	return result;
}

export type TokenFormat = 'chars' | 'pinyin' | 'english';

/** Render one character's components as text, e.g. `言+身+寸`. */
export function formatTokens(tokens: Token[], format: TokenFormat): string {
	return tokens
		.map((token) => {
			if (token.unencoded || !token.char) return '?';
			if (format === 'chars') return token.char;
			if (format === 'english') return token.radical?.english ?? token.char;
			return token.radical?.pinyin ?? token.reading?.pinyin ?? token.char;
		})
		.join('+');
}

/** A run of text: either a character to break down, or anything else verbatim. */
export type Segment =
	| { kind: 'char'; transliteration: Transliteration }
	| { kind: 'text'; text: string };

export interface TextBreakdown {
	segments: Segment[];
	/** Distinct characters covered, in first-seen order. */
	characters: Transliteration[];
	/** How many Han characters were left out because of `limit`. */
	skipped: number;
}

/**
 * Walk a whole sentence or paragraph, keeping punctuation and spacing in place.
 * `limit` caps how many Han characters are processed so a huge paste cannot
 * lock up the page; the remainder is reported as `skipped`.
 */
export function transliterateText(text: string, limit = 400): TextBreakdown {
	const segments: Segment[] = [];
	const characters: Transliteration[] = [];
	const seen = new Set<string>();
	let processed = 0;
	let skipped = 0;

	for (const char of text) {
		if (!isHan(char)) {
			const last = segments.at(-1);
			if (last?.kind === 'text') last.text += char;
			else segments.push({ kind: 'text', text: char });
			continue;
		}

		if (processed >= limit) {
			skipped++;
			continue;
		}
		processed++;

		const transliteration = transliterate(char);
		segments.push({ kind: 'char', transliteration });
		if (!seen.has(char)) {
			seen.add(char);
			characters.push(transliteration);
		}
	}

	return { segments, characters, skipped };
}

/** Radicals used across a breakdown, most frequent first. */
export function radicalTally(breakdown: TextBreakdown): { radical: Radical; count: number }[] {
	const counts = new Map<Radical, number>();
	for (const segment of breakdown.segments) {
		if (segment.kind !== 'char') continue;
		const { radical, tokens } = segment.transliteration;
		const used = radical ? [radical] : tokens.map((t) => t.radical);
		for (const entry of used) {
			if (entry) counts.set(entry, (counts.get(entry) ?? 0) + 1);
		}
	}
	return [...counts]
		.map(([radical, count]) => ({ radical, count }))
		.sort((a, b) => b.count - a.count || a.radical.number - b.radical.number);
}
