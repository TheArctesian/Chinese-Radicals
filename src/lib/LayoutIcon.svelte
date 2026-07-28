<script lang="ts">
	// The Ideographic Description Characters (⿰⿱⿴…) are missing from most fonts,
	// so the arrangement is drawn instead of typed.

	interface Props {
		/** The IDC character the layout came from. */
		layout: string;
		label: string;
	}

	let { layout, label }: Props = $props();

	type Rect = [x: number, y: number, w: number, h: number];

	/** Boxes in a 24x24 viewport. `frame` is the enclosing component, if any. */
	const SHAPES: Record<string, { frame?: Rect; parts: Rect[] }> = {
		'⿰': {
			parts: [
				[1, 1, 10, 22],
				[13, 1, 10, 22]
			]
		},
		'⿱': {
			parts: [
				[1, 1, 22, 10],
				[1, 13, 22, 10]
			]
		},
		'⿲': {
			parts: [
				[1, 1, 6, 22],
				[9, 1, 6, 22],
				[17, 1, 6, 22]
			]
		},
		'⿳': {
			parts: [
				[1, 1, 22, 6],
				[1, 9, 22, 6],
				[1, 17, 22, 6]
			]
		},
		'⿴': { frame: [1, 1, 22, 22], parts: [[7, 7, 10, 10]] },
		'⿵': { frame: [1, 1, 22, 22], parts: [[6, 8, 12, 15]] },
		'⿶': { frame: [1, 1, 22, 22], parts: [[6, 1, 12, 15]] },
		'⿷': { frame: [1, 1, 22, 22], parts: [[8, 6, 15, 12]] },
		'⿸': { frame: [1, 1, 22, 22], parts: [[8, 8, 15, 15]] },
		'⿹': { frame: [1, 1, 22, 22], parts: [[1, 8, 15, 15]] },
		'⿺': { frame: [1, 1, 22, 22], parts: [[8, 1, 15, 15]] },
		'⿻': {
			parts: [
				[1, 1, 15, 15],
				[8, 8, 15, 15]
			]
		}
	};

	let shape = $derived(SHAPES[layout]);
</script>

{#if shape}
	<svg class="layout-icon" viewBox="0 0 24 24" role="img" aria-label={label}>
		{#if shape.frame}
			<rect
				x={shape.frame[0]}
				y={shape.frame[1]}
				width={shape.frame[2]}
				height={shape.frame[3]}
				class="frame"
			/>
		{/if}
		{#each shape.parts as [x, y, w, h], i (i)}
			<rect {x} {y} width={w} height={h} class="part" />
		{/each}
	</svg>
{/if}

<style>
	.layout-icon {
		/* Tailwind's preflight makes svg display:block. */
		display: inline-block;
		width: 1.1em;
		height: 1.1em;
		vertical-align: -0.18em;
		margin-right: 0.3em;
	}

	.frame {
		fill: none;
		stroke: #b8a88f;
		stroke-width: 1.5;
		stroke-dasharray: 3 2;
	}

	.part {
		fill: rgba(168, 143, 105, 0.28);
		stroke: #a88f69;
		stroke-width: 1.5;
	}
</style>
