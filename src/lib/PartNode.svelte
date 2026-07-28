<script lang="ts">
	import PartNode from './PartNode.svelte';
	import LayoutIcon from './LayoutIcon.svelte';
	import type { Part } from './decompose';

	interface Props {
		part: Part;
		/** Depth 0 is the character that was looked up. */
		depth?: number;
		onradical?: (number: number) => void;
	}

	let { part, depth = 0, onradical }: Props = $props();

	let hasChildren = $derived(part.children.length > 0);
	/** A sub-sequence of the IDS: an arrangement of parts, not a character. */
	let isGroup = $derived(!part.char);
	/** Rare components often have no font coverage, so name the codepoint too. */
	let codepoint = $derived(
		part.char && !part.radical && !part.reading?.pinyin && !part.unencoded
			? 'U+' + part.char.codePointAt(0)!.toString(16).toUpperCase()
			: ''
	);
</script>

<div class="node" class:root={depth === 0}>
	<div class="glyph-row" class:group-row={isGroup}>
		{#if part.radical && depth > 0}
			<button
				class="glyph radical"
				title="Kangxi radical {part.radical.number} — jump to the table"
				onclick={() => onradical?.(part.radical!.number)}
			>
				{part.char}
			</button>
		{:else if part.char}
			<span class="glyph">{part.char}</span>
		{/if}

		<div class="meta">
			{#if part.radical}
				<span class="badge">
					radical {part.radical.number} · {part.radical.pinyin} · {part.radical.meanings.join(', ')}
				</span>
			{:else if part.unencoded}
				<span class="note">component with no character of its own</span>
			{:else if isGroup}
				<span class="note">taken together</span>
			{:else}
				<span class="reading">
					{#if part.reading?.pinyin}<em>{part.reading.pinyin}</em>{/if}
					{#if part.reading?.gloss}<span class="gloss">{part.reading.gloss}</span>{/if}
					{#if codepoint}<span class="note">component {codepoint}</span>{/if}
				</span>
			{/if}

			{#if hasChildren && part.layout}
				<span class="layout">
					<LayoutIcon layout={part.layout.char} label={part.layout.name} />{part.layout.name}
				</span>
			{:else if part.truncated}
				<span class="note">breaks down further</span>
			{/if}
		</div>
	</div>

	{#if hasChildren}
		<ul class="children">
			{#each part.children as child, i (i)}
				<li><PartNode part={child} depth={depth + 1} {onradical} /></li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.node {
		min-width: 0;
	}

	.glyph-row {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.glyph {
		font-family: 'Noto Serif SC', serif;
		font-size: 2rem;
		line-height: 1.1;
		color: #5a4835;
		background: rgba(255, 255, 255, 0.75);
		border: 1px solid #e0d5c5;
		border-radius: 6px;
		padding: 0.25rem 0.6rem;
		min-width: 2.9rem;
		text-align: center;
	}

	.root > .glyph-row > .glyph {
		font-size: 2.6rem;
	}

	button.glyph {
		cursor: pointer;
		border-color: #c8a97e;
		background: #fdf6e9;
		transition:
			background-color 0.2s,
			box-shadow 0.2s;
	}

	button.glyph:hover {
		background: #f6e7cd;
		box-shadow: 0 2px 6px rgba(90, 72, 53, 0.15);
	}

	/* A grouping has no glyph of its own, so it sits closer to its children. */
	.group-row {
		font-size: 0.95em;
		padding-left: 0.15rem;
	}

	.meta {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
		font-size: 0.85rem;
		min-width: 0;
	}

	.badge {
		align-self: flex-start;
		background: #f0e2c8;
		border: 1px solid #d9c39b;
		border-radius: 999px;
		color: #6b5334;
		padding: 0.1rem 0.6rem;
	}

	.reading em {
		color: #7b6b56;
		margin-right: 0.4rem;
	}

	.gloss {
		color: #6d6355;
	}

	.note {
		color: #a2957f;
		font-style: italic;
	}

	.layout {
		color: #8c7c68;
		font-size: 0.8rem;
	}

	.children {
		list-style: none;
		margin: 0.5rem 0 0 1.4rem;
		padding: 0 0 0 1rem;
		border-left: 2px solid #e4d9c6;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.children > li {
		position: relative;
	}

	.children > li::before {
		content: '';
		position: absolute;
		left: -1rem;
		top: 1.6rem;
		width: 0.85rem;
		height: 2px;
		background: #e4d9c6;
	}

	@media (max-width: 500px) {
		.glyph {
			font-size: 1.6rem;
			min-width: 2.4rem;
		}

		.root > .glyph-row > .glyph {
			font-size: 2rem;
		}

		.children {
			margin-left: 0.6rem;
			padding-left: 0.7rem;
		}
	}
</style>
