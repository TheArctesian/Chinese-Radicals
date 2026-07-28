<script lang="ts">
	import PartNode from './PartNode.svelte';
	import {
		decompose,
		getReading,
		hanCharacters,
		leavesOf,
		loadData,
		radicalsIn,
		type Part
	} from './decompose';

	interface Props {
		/** The text being looked up. Bindable so the page can drive it from the URL. */
		query?: string;
		/** Called with a Kangxi radical number when a radical in the tree is clicked. */
		onradical?: (number: number) => void;
	}

	let { query = $bindable(''), onradical }: Props = $props();

	const examples = ['謝', '愛', '清', '媽', '想', '藥'];

	let selected = $state('');
	let status = $state<'idle' | 'loading' | 'ready' | 'error'>('idle');
	let error = $state('');

	let candidates = $derived(hanCharacters(query));

	// The query can also arrive from outside — a ?c= parameter, or a click on one
	// of the example characters under a table row.
	$effect(() => {
		if (candidates.length) ensureData();
	});

	// Whatever the input is, work on the character the user picked, or the first
	// Han character they typed.
	let target = $derived(
		selected && candidates.includes(selected) ? selected : (candidates[0] ?? '')
	);

	let tree = $derived.by<Part | null>(() =>
		status === 'ready' && target ? decompose(target) : null
	);
	let reading = $derived(status === 'ready' && target ? getReading(target) : null);
	let foundRadicals = $derived(tree ? radicalsIn(tree) : []);
	let leaves = $derived(tree ? leavesOf(tree).filter((p) => !p.radical) : []);

	async function ensureData() {
		if (status === 'ready' || status === 'loading') return;
		status = 'loading';
		try {
			await loadData();
			status = 'ready';
		} catch (err) {
			error = err instanceof Error ? err.message : String(err);
			status = 'error';
		}
	}

	function onInput(value: string) {
		query = value;
		selected = '';
	}

	function useExample(char: string) {
		onInput(char);
	}
</script>

<section class="breakdown">
	<h2>Character Breakdown</h2>
	<p class="lede">
		Type or paste a character to split it into its parts, down to the radicals in the table below.
	</p>

	<div class="controls">
		<input
			type="text"
			class="query"
			lang="zh"
			placeholder="謝"
			aria-label="Chinese character to break down"
			value={query}
			oninput={(e) => onInput(e.currentTarget.value)}
		/>
		<div class="examples">
			<span class="examples-label">try</span>
			{#each examples as char (char)}
				<button type="button" class="example" onclick={() => useExample(char)}>{char}</button>
			{/each}
		</div>
	</div>

	{#if candidates.length > 1}
		<div class="picker">
			{#each candidates as char (char)}
				<button
					type="button"
					class="chip"
					class:active={char === target}
					onclick={() => {
						selected = char;
						ensureData();
					}}>{char}</button
				>
			{/each}
		</div>
	{/if}

	{#if status === 'loading'}
		<p class="status">Loading character data…</p>
	{:else if status === 'error'}
		<p class="status error">Could not load the character data: {error}</p>
	{:else if query && !candidates.length}
		<p class="status">No Chinese character in that input yet.</p>
	{:else if tree}
		<div class="result">
			<div class="headline">
				<span class="target">{target}</span>
				<div class="target-meta">
					{#if reading?.pinyin}<span class="pinyin">{reading.pinyin}</span>{/if}
					{#if reading?.gloss}<span class="gloss">{reading.gloss}</span>{/if}
					{#if !tree.children.length}
						<span class="note">
							This one has no recorded breakdown — it is treated as a single component.
						</span>
					{/if}
				</div>
			</div>

			{#if foundRadicals.length}
				<div class="summary">
					<span class="summary-label">Radicals</span>
					{#each foundRadicals as radical (radical.number)}
						<button type="button" class="radical-chip" onclick={() => onradical?.(radical.number)}>
							<span class="radical-glyph">{radical.radical}</span>
							<span class="radical-text">{radical.pinyin} · {radical.english}</span>
						</button>
					{/each}
					{#if leaves.length}
						<span class="summary-note">
							plus {leaves.length} non-radical component{leaves.length === 1 ? '' : 's'}
						</span>
					{/if}
				</div>
			{/if}

			{#if tree.children.length}
				<div class="tree">
					<PartNode part={tree} {onradical} />
				</div>
			{/if}
		</div>
	{/if}
</section>

<style>
	.breakdown {
		border: 1px solid #e0d5c5;
		border-radius: 6px;
		background: rgba(255, 255, 255, 0.7);
		padding: 1.5rem;
		margin-bottom: 2.5rem;
	}

	h2 {
		font-family: 'Noto Serif', serif;
		font-size: 1.35rem;
		color: #5a4835;
		margin: 0 0 0.35rem;
		letter-spacing: 0.5px;
	}

	.lede {
		color: #7b6b56;
		margin: 0 0 1.25rem;
		font-size: 0.95rem;
	}

	.controls {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 1rem;
	}

	.query {
		font-family: 'Noto Serif SC', serif;
		font-size: 1.8rem;
		width: 8rem;
		padding: 0.4rem 0.8rem;
		color: #5a4835;
		background: #fffdf9;
		border: 1px solid #d9cebb;
		border-radius: 6px;
		text-align: center;
	}

	.query:focus {
		outline: none;
		border-color: #c8a97e;
		box-shadow: 0 0 0 3px rgba(200, 169, 126, 0.2);
	}

	.examples {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		flex-wrap: wrap;
	}

	.examples-label,
	.summary-label {
		color: #a2957f;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 1px;
	}

	.example,
	.chip {
		font-family: 'Noto Serif SC', serif;
		font-size: 1.2rem;
		color: #5a4835;
		background: #fdf6e9;
		border: 1px solid #e0d5c5;
		border-radius: 6px;
		padding: 0.15rem 0.55rem;
		cursor: pointer;
		transition:
			background-color 0.2s,
			border-color 0.2s;
	}

	.example:hover,
	.chip:hover {
		background: #f6e7cd;
	}

	.picker {
		display: flex;
		gap: 0.4rem;
		flex-wrap: wrap;
		margin-top: 1rem;
	}

	.chip.active {
		border-color: #a98a5e;
		background: #f0e2c8;
	}

	.status {
		margin: 1.25rem 0 0;
		color: #8c7c68;
		font-style: italic;
	}

	.status.error {
		color: #9c5b4a;
	}

	.result {
		margin-top: 1.5rem;
		border-top: 1px solid #e8e0d2;
		padding-top: 1.25rem;
	}

	.headline {
		display: flex;
		align-items: center;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.target {
		font-family: 'Noto Serif SC', serif;
		font-size: 3.5rem;
		line-height: 1;
		color: #5a4835;
	}

	.target-meta {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}

	.pinyin {
		color: #7b6b56;
		font-style: italic;
		font-size: 1.1rem;
	}

	.gloss,
	.summary-note {
		color: #6d6355;
		font-size: 0.9rem;
	}

	.note {
		color: #a2957f;
		font-style: italic;
		font-size: 0.9rem;
	}

	.summary {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin: 1.25rem 0 0.5rem;
	}

	.radical-chip {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		background: #f0e2c8;
		border: 1px solid #d9c39b;
		border-radius: 999px;
		padding: 0.2rem 0.75rem;
		cursor: pointer;
		color: #6b5334;
		transition:
			background-color 0.2s,
			box-shadow 0.2s;
	}

	.radical-chip:hover {
		background: #e8d4b0;
		box-shadow: 0 2px 6px rgba(90, 72, 53, 0.15);
	}

	.radical-glyph {
		font-family: 'Noto Serif SC', serif;
		font-size: 1.25rem;
	}

	.radical-text {
		font-size: 0.85rem;
	}

	.tree {
		margin-top: 1.25rem;
	}

	@media (max-width: 500px) {
		.breakdown {
			padding: 1rem;
		}

		.query {
			width: 100%;
		}

		.target {
			font-size: 2.6rem;
		}
	}
</style>
