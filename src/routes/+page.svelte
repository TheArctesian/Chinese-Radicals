<script lang="ts">
	import { tick } from 'svelte';
	import { replaceState } from '$app/navigation';
	import { page } from '$app/state';
	import Decomposer from '$lib/Decomposer.svelte';
	import SentenceTransliterator from '$lib/SentenceTransliterator.svelte';
	import { examplesFor, getReading, loadRadicalExamples, warm } from '$lib/decompose';
	import { radicals } from '$lib/radicals';

	// ?c= is the character in the breakdown panel, ?q= the table filter, so any
	// view of this page can be linked to.
	let lookup = $state(page.url.searchParams.get('c') ?? '');
	let filter = $state(page.url.searchParams.get('q') ?? '');

	let highlighted = $state<number | null>(null);
	let expanded = $state<number | null>(null);
	let exampleStatus = $state<'idle' | 'loading' | 'ready' | 'error'>('idle');
	let clearTimer: ReturnType<typeof setTimeout> | undefined;

	/** Pinyin without its tone marks, so a plain-ASCII search still matches. */
	function toneless(text: string) {
		return text.normalize('NFD').replace(/[̀-ͯ]/g, '');
	}

	let needle = $derived(toneless(filter.trim().toLowerCase()));

	let shown = $derived(
		needle
			? radicals.filter((r) =>
					[
						String(r.number),
						toneless(r.pinyin.toLowerCase()),
						r.radical,
						...r.variants,
						...r.meanings.map((m) => m.toLowerCase())
					].some((field) => field.includes(needle))
				)
			: radicals
	);

	$effect(() => {
		const url = new URL(page.url);
		const set = (key: string, value: string) =>
			value ? url.searchParams.set(key, value) : url.searchParams.delete(key);
		set('c', lookup.trim());
		set('q', filter.trim());
		if (url.href !== page.url.href) replaceState(url, page.state);
	});

	/** Jump to a radical's row in the table and flag it briefly. */
	async function showInTable(number: number) {
		// A filtered-out row cannot be scrolled to, so clear the filter first.
		if (!shown.some((r) => r.number === number)) {
			filter = '';
			await tick();
		}
		const row = document.getElementById(`radical-${number}`);
		if (!row) return;
		row.scrollIntoView({ behavior: 'smooth', block: 'center' });
		highlighted = number;
		clearTimeout(clearTimer);
		clearTimer = setTimeout(() => (highlighted = null), 2500);
	}

	/** Pull the example index down before it is needed, so expanding feels instant. */
	function warmExamples() {
		warm('examples');
	}

	/** Show or hide the characters built from a radical. */
	async function toggleExamples(number: number) {
		expanded = expanded === number ? null : number;
		if (expanded === null || exampleStatus === 'ready' || exampleStatus === 'loading') return;
		exampleStatus = 'loading';
		try {
			await loadRadicalExamples();
			exampleStatus = 'ready';
		} catch {
			exampleStatus = 'error';
		}
	}

	/** Send an example character up to the breakdown panel. */
	function breakDown(char: string) {
		lookup = char;
		document.querySelector('.breakdown')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
</script>

<div class="container">
	<h1 class="title">Chinese Radical Table</h1>

	<Decomposer bind:query={lookup} onradical={showInTable} />

	<SentenceTransliterator onradical={showInTable} />

	<div class="table-header">
		<input
			type="search"
			class="filter"
			placeholder="Filter by pinyin, meaning, character, or number"
			aria-label="Filter the radical table"
			bind:value={filter}
		/>
		<span class="tally">
			{#if needle}{shown.length} of {radicals.length}{:else}{radicals.length} radicals{/if}
		</span>
	</div>

	<p class="table-hint">Click any radical to see the characters built from it.</p>

	<table>
		<thead>
			<tr>
				<th>Pinyin</th>
				<th>Radical</th>
				<th>Variant <br />(Simplified)</th>
				<th>English</th>
			</tr>
		</thead>
		<tbody>
			{#each shown as radical (radical.number)}
				<tr id="radical-{radical.number}" class:highlighted={highlighted === radical.number}>
					<td>{radical.pinyin}</td>
					<td>
						<button
							class="radical-button"
							aria-expanded={expanded === radical.number}
							title="Characters built from {radical.radical}"
							onpointerenter={warmExamples}
							onfocus={warmExamples}
							onclick={() => toggleExamples(radical.number)}
						>
							{radical.radical}<span class="caret" aria-hidden="true"></span>
						</button>
					</td>
					<td>{radical.variantLabel}</td>
					<td>
						<span class="sense">{radical.english}</span>
						{#if radical.meanings.length > 1}
							<span class="also">{radical.meanings.slice(1).join(', ')}</span>
						{/if}
					</td>
				</tr>
				{#if expanded === radical.number}
					<tr class="examples">
						<td colspan="4">
							{#if exampleStatus === 'loading'}
								<span class="note">Loading characters…</span>
							{:else if exampleStatus === 'error'}
								<span class="note">Could not load the character list.</span>
							{:else if examplesFor(radical.number).length}
								<span class="note">
									Built from {radical.radical} — click one to break it down
								</span>
								<span class="example-list">
									{#each examplesFor(radical.number) as char (char)}
										<button
											class="example"
											title={getReading(char)?.gloss ?? ''}
											onclick={() => breakDown(char)}>{char}</button
										>
									{/each}
								</span>
							{:else}
								<span class="note">No characters in the data are built from this radical.</span>
							{/if}
						</td>
					</tr>
				{/if}
			{/each}
			{#if !shown.length}
				<tr>
					<td colspan="4"><span class="note">No radical matches “{filter}”.</span></td>
				</tr>
			{/if}
		</tbody>
	</table>

	<p class="sources">
		Decompositions from the
		<a href="https://github.com/cjkvi/cjkvi-ids">CJKVI IDS database</a>, itself derived from the
		<a href="http://www.chise.org/">CHISE project</a> (GPLv2). Readings, glosses, and the common-use
		ordering from the Unicode
		<a href="https://www.unicode.org/charts/unihan.html">Unihan database</a>, © Unicode, Inc.
	</p>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700&family=Noto+Serif:ital,wght@0,400;0,700;1,400&display=swap');

	body {
		font-family: 'Noto Serif', serif;
		background-color: #f9f6f2;
		color: #3a3a3a;
		line-height: 1.6;
		padding: 20px;
		margin: 0 auto;
	}

	.container {
		background-color: #fff;
		border-radius: 8px;
		padding: 30px;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
		position: relative;
		background-image:
			linear-gradient(rgba(255, 255, 255, 0.7) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255, 255, 255, 0.7) 1px, transparent 1px),
			linear-gradient(#f5f0e8 1px, transparent 1px),
			linear-gradient(90deg, #f5f0e8 1px, transparent 1px);
		background-size:
			100px 100px,
			100px 100px,
			20px 20px,
			20px 20px;
		border: 1px solid #e8e0d2;
		width: 100%;
		max-width: 100%;
		box-sizing: border-box;
		margin: 0 auto;
	}

	.title {
		font-family: 'Noto Serif', serif;
		font-size: 2rem;
		color: #5a4835;
		text-align: center;
		margin-bottom: 2rem;
		border-bottom: 2px solid #e0d5c5;
		padding-bottom: 1rem;
		letter-spacing: 1px;
		text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.8);
	}

	table {
		width: 100%;
		border-collapse: collapse;
		font-size: 1rem;
		border: 1px solid #e0d5c5;
		margin-top: 1rem;
		background-color: rgba(255, 255, 255, 0.7);
		table-layout: fixed; /* This makes columns equal width */
	}

	thead {
		background-color: #f0e8dd;
	}

	/* 214 rows is a long scroll; keep the column names in view. */
	th {
		position: sticky;
		top: 0;
		z-index: 1;
		background-color: #f0e8dd;
		box-shadow: inset 0 -2px 0 #d9cebb;
	}

	th {
		padding: 15px 10px;
		border-bottom: 2px solid #d9cebb;
		color: #5a4835;
		font-weight: bold;
		text-align: center; /* Center header text */
	}

	td {
		padding: 12px 10px;
		border-bottom: 1px solid #e8e0d2;
		vertical-align: middle;
		transition: background-color 0.3s;
		text-align: center; /* Center all cell content */
	}

	tr:nth-child(even) {
		background-color: rgba(245, 240, 232, 0.5);
	}

	tr:hover {
		background-color: rgba(228, 219, 204, 0.5);
	}

	.table-header {
		display: flex;
		align-items: center;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.filter {
		flex: 1 1 18rem;
		font-family: inherit;
		font-size: 0.95rem;
		padding: 0.5rem 0.8rem;
		color: #5a4835;
		background: #fffdf9;
		border: 1px solid #d9cebb;
		border-radius: 6px;
	}

	.filter:focus {
		outline: none;
		border-color: #c8a97e;
		box-shadow: 0 0 0 3px rgba(200, 169, 126, 0.2);
	}

	.tally {
		color: #7a6c58;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 1px;
	}

	/* The radical glyph doubles as the toggle for its example characters. */
	.radical-button {
		font-family: 'Noto Serif SC', serif;
		font-size: inherit;
		color: inherit;
		background: none;
		border: none;
		border-radius: 4px;
		padding: 0 0.25rem;
		cursor: pointer;
	}

	.radical-button:hover,
	.radical-button[aria-expanded='true'] {
		background: #f0e2c8;
	}

	/* Small triangle, rotating when the row is open. */
	.caret {
		display: inline-block;
		width: 0;
		height: 0;
		margin-left: 0.35rem;
		vertical-align: 0.15em;
		border-left: 0.28em solid transparent;
		border-right: 0.28em solid transparent;
		border-top: 0.32em solid #8a7a63;
		transition: transform 0.2s;
	}

	.radical-button[aria-expanded='true'] .caret {
		transform: rotate(180deg);
	}

	.table-hint {
		margin: 0.6rem 0 0;
		color: #7a6c58;
		font-size: 0.85rem;
	}

	tr.examples td {
		text-align: left;
		background: rgba(253, 246, 233, 0.8);
		padding: 0.75rem 1rem;
	}

	.note {
		color: #7a6c58;
		font-style: italic;
		font-size: 0.85rem;
	}

	.example-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.3rem;
		margin-top: 0.5rem;
	}

	.example {
		font-family: 'Noto Serif SC', serif;
		font-size: 1.3rem;
		color: #5a4835;
		background: #fffdf9;
		border: 1px solid #e0d5c5;
		border-radius: 6px;
		padding: 0.1rem 0.4rem;
		cursor: pointer;
		transition:
			background-color 0.2s,
			box-shadow 0.2s;
	}

	.example:hover {
		background: #f6e7cd;
		box-shadow: 0 2px 6px rgba(90, 72, 53, 0.15);
	}

	.sources {
		margin: 2rem 0 0;
		padding-top: 1.25rem;
		border-top: 1px solid #e8e0d2;
		color: #6f6353;
		font-size: 0.8rem;
		line-height: 1.6;
	}

	.sources a {
		color: #7b6b56;
	}

	/* Flagged for a couple of seconds after a jump from the breakdown above. */
	tbody tr.highlighted {
		background-color: rgba(240, 226, 200, 0.9);
		box-shadow: inset 0 0 0 2px #c8a97e;
	}

	/* Column styles */
	td:nth-child(1) {
		color: #7b6b56;
		font-style: italic;
		width: 15%;
	}

	td:nth-child(2) {
		font-family: 'Noto Serif SC', serif;
		font-size: 1.5rem;
		color: #5a4835;
		width: 15%;
	}

	td:nth-child(3) {
		font-family: 'Noto Serif SC', serif;
		font-size: 1.3rem;
		color: #6f6353;
		width: 20%;
	}

	td:nth-child(4) {
		color: #5a4835;
		width: 50%;
		/* Sense lists are too long to read centred. */
		text-align: left;
		padding-left: 1.5rem;
	}

	th:nth-child(4) {
		text-align: left;
		padding-left: 1.5rem;
	}

	/* The conventional name reads first; the other senses trail it, lighter. */
	.sense {
		color: #5a4835;
	}

	.also {
		color: #6f6353;
		font-size: 0.9em;
	}

	.also::before {
		content: '·';
		color: inherit;
		margin: 0 0.4em;
	}

	/* Ink brush effect for the radical column */
	td:nth-child(2) {
		position: relative;
	}

	td:nth-child(2)::after {
		content: '';
		position: absolute;
		bottom: -1px;
		left: 25%;
		right: 25%;
		height: 2px;
		background-color: rgba(90, 72, 53, 0.2);
		border-radius: 50%;
	}

	/* Responsive styles */
	@media (max-width: 768px) {
		body {
			padding: 10px;
		}

		.container {
			padding: 15px;
		}

		.title {
			font-size: 1.5rem;
		}

		table {
			font-size: 0.9rem;
		}

		th,
		td {
			padding: 8px 5px;
		}

		td:nth-child(2) {
			font-size: 1.3rem;
		}

		td:nth-child(3) {
			font-size: 1.1rem;
		}

		td:nth-child(4),
		th:nth-child(4) {
			padding-left: 0.6rem;
		}
	}

	/* Enhance mobile experience */
	@media (max-width: 500px) {
		th:nth-child(3),
		td:nth-child(3) {
			display: none; /* Hide the variant column on very small screens */
		}

		td:nth-child(1) {
			width: 20%;
		}

		td:nth-child(2) {
			width: 20%;
		}

		td:nth-child(4) {
			width: 60%;
		}
	}

	/* Printing: just the table, on plain paper. */
	@media print {
		.container {
			background: none;
			border: none;
			box-shadow: none;
			padding: 0;
		}

		.title {
			font-size: 1.4rem;
			margin-bottom: 1rem;
		}

		/* The lookup panels are interactive; paper only wants the table. */
		.table-header,
		.sources,
		:global(.breakdown),
		:global(.sentence) {
			display: none;
		}

		table {
			background: none;
			font-size: 9pt;
		}

		thead {
			display: table-header-group; /* repeat the header on every page */
		}

		tr {
			break-inside: avoid;
			background: none !important;
			box-shadow: none !important;
		}

		th,
		td {
			padding: 3pt 4pt;
			color: #000;
		}

		.also {
			color: #444;
		}

		.radical-button {
			background: none;
			padding: 0;
		}
	}
</style>
