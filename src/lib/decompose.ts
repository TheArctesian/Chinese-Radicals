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
				const tab = line.indexOf('\t');
				if (tab > 0) idsMap.set(line.slice(0, tab), line.slice(tab + 1));
			}

			readingMap = new Map();
			for (const line of readings.split('\n')) {
				const [char, pinyin, gloss] = line.split('\t');
				if (char) readingMap.set(char, { pinyin: pinyin ?? '', gloss: gloss ?? '' });
			}
		})().catch((err) => {
			loading = null; // let the next attempt retry
			throw err;
		});
	}
	return loading;
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
