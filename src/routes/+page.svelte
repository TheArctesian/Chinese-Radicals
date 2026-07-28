<script lang="ts">
	import Decomposer from '$lib/Decomposer.svelte';
	import { radicals } from '$lib/radicals';

	let highlighted = $state<number | null>(null);
	let clearTimer: ReturnType<typeof setTimeout> | undefined;

	/** Jump to a radical's row in the table and flag it briefly. */
	function showInTable(number: number) {
		const row = document.getElementById(`radical-${number}`);
		if (!row) return;
		row.scrollIntoView({ behavior: 'smooth', block: 'center' });
		highlighted = number;
		clearTimeout(clearTimer);
		clearTimer = setTimeout(() => (highlighted = null), 2500);
	}
</script>

<div class="container">
	<h1 class="title">Chinese Radical Table</h1>

	<Decomposer onradical={showInTable} />

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
			{#each radicals as radical (radical.number)}
				<tr id="radical-{radical.number}" class:highlighted={highlighted === radical.number}>
					<td>{radical.pinyin}</td>
					<td>{radical.radical}</td>
					<td>{radical.variantLabel}</td>
					<td>{radical.english}</td>
				</tr>
			{/each}
		</tbody>
	</table>
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
		color: #8c7c68;
		width: 20%;
	}

	td:nth-child(4) {
		color: #5a4835;
		width: 50%;
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
</style>
