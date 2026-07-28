<script lang="ts">
	import {
		formatTokens,
		loadData,
		radicalTally,
		transliterateText,
		warm,
		type TokenFormat
	} from './decompose';

	interface Props {
		/** Called with a Kangxi radical number when a radical is clicked. */
		onradical?: (number: number) => void;
	}

	let { onradical }: Props = $props();

	const LIMIT = 400;

	const examples = [
		'謝謝你的幫助',
		'我想學中文',
		'春眠不覺曉，處處聞啼鳥。',
		'每個漢字都由部首組成'
	];

	const formats: { value: TokenFormat; label: string }[] = [
		{ value: 'chars', label: 'components' },
		{ value: 'pinyin', label: 'pinyin' },
		{ value: 'english', label: 'meanings' }
	];

	let text = $state('');
	let format = $state<TokenFormat>('chars');
	let view = $state<'lines' | 'table'>('lines');
	let status = $state<'idle' | 'loading' | 'ready' | 'error'>('idle');
	let error = $state('');
	let copied = $state(false);

	let breakdown = $derived(status === 'ready' && text ? transliterateText(text, LIMIT) : null);
	let tally = $derived(breakdown ? radicalTally(breakdown) : []);
	let charCount = $derived(
		breakdown ? breakdown.segments.filter((s) => s.kind === 'char').length : 0
	);

	/** The whole passage as one line of plain text, ready to copy. */
	let plain = $derived(
		breakdown
			? breakdown.segments
					.map((segment) =>
						segment.kind === 'text'
							? segment.text
							: `${segment.transliteration.char}[${
									segment.transliteration.radical && format !== 'chars'
										? format === 'english'
											? segment.transliteration.radical.english
											: segment.transliteration.radical.pinyin
										: formatTokens(segment.transliteration.tokens, format)
								}]`
					)
					.join('')
			: ''
	);

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

	function update(value: string) {
		text = value;
		copied = false;
		if (value.trim()) ensureData();
	}

	async function copyPlain() {
		try {
			await navigator.clipboard.writeText(plain);
			copied = true;
		} catch {
			copied = false;
		}
	}
</script>

<section class="sentence">
	<h2>Sentence Transliteration</h2>
	<p class="lede">
		Paste a sentence or a whole passage to spell every character out in radicals at once.
	</p>

	<textarea
		class="input"
		lang="zh"
		rows="3"
		placeholder="謝謝你的幫助"
		aria-label="Chinese text to transliterate"
		value={text}
		onfocus={() => warm()}
		onpointerenter={() => warm()}
		oninput={(e) => update(e.currentTarget.value)}
	></textarea>

	<div class="examples">
		<span class="label">try</span>
		{#each examples as example (example)}
			<button type="button" class="example" onclick={() => update(example)}>{example}</button>
		{/each}
	</div>

	{#if status === 'loading'}
		<p class="status">Loading character data…</p>
	{:else if status === 'error'}
		<p class="status error">Could not load the character data: {error}</p>
	{:else if breakdown}
		{#if !charCount}
			<p class="status">No Chinese characters in that text yet.</p>
		{:else}
			<div class="toolbar">
				<div class="switch" role="group" aria-label="Layout">
					<button type="button" class:active={view === 'lines'} onclick={() => (view = 'lines')}
						>reading view</button
					>
					<button type="button" class:active={view === 'table'} onclick={() => (view = 'table')}
						>table view</button
					>
				</div>

				<div class="switch" role="group" aria-label="Show parts as">
					{#each formats as option (option.value)}
						<button
							type="button"
							class:active={format === option.value}
							onclick={() => {
								format = option.value;
								copied = false;
							}}>{option.label}</button
						>
					{/each}
				</div>

				<span class="count">{charCount} characters</span>

				<button type="button" class="copy" onclick={copyPlain}>
					{copied ? 'copied' : 'copy as text'}
				</button>
			</div>

			{#if breakdown.skipped}
				<p class="status">
					Showing the first {LIMIT} characters — {breakdown.skipped} more were left out.
				</p>
			{/if}

			{#if view === 'lines'}
				<div class="reading">
					{#each breakdown.segments as segment, i (i)}
						{#if segment.kind === 'text'}<span class="passthrough">{segment.text}</span>{:else}
							{@const t = segment.transliteration}
							<span class="cell" class:is-radical={!!t.radical}>
								<span class="cell-char" title={t.reading?.gloss ?? ''}>{t.char}</span>
								<span class="cell-pinyin">{t.reading?.pinyin ?? ''}</span>
								<span class="cell-parts">
									{#if t.radical}
										<button
											type="button"
											class="token radical"
											title="Kangxi radical {t.radical.number} — jump to the table"
											onclick={() => onradical?.(t.radical!.number)}
										>
											{format === 'chars'
												? t.radical.radical
												: format === 'english'
													? t.radical.english
													: t.radical.pinyin}
										</button>
									{:else}
										{#each t.tokens as token, j (j)}
											{#if j > 0}<span class="plus">+</span>{/if}
											{#if token.radical}
												<button
													type="button"
													class="token radical"
													title="Kangxi radical {token.radical.number} — jump to the table"
													onclick={() => onradical?.(token.radical!.number)}
												>
													{format === 'chars'
														? token.char
														: format === 'english'
															? token.radical.english
															: token.radical.pinyin}
												</button>
											{:else}
												<span
													class="token"
													title={token.unencoded ? 'no character for this part' : ''}
												>
													{#if token.unencoded || !token.char}
														?
													{:else if format === 'chars'}
														{token.char}
													{:else if format === 'english'}
														{token.reading?.gloss?.split(/[;,]/)[0] || token.char}
													{:else}
														{token.reading?.pinyin || token.char}
													{/if}
												</span>
											{/if}
										{/each}
									{/if}
								</span>
							</span>
						{/if}
					{/each}
				</div>
			{:else}
				<table class="breakdown-table">
					<thead>
						<tr>
							<th>Character</th>
							<th>Pinyin</th>
							<th>Meaning</th>
							<th>Radicals and components</th>
						</tr>
					</thead>
					<tbody>
						{#each breakdown.characters as t (t.char)}
							<tr>
								<td class="col-char">{t.char}</td>
								<td class="col-pinyin">{t.reading?.pinyin ?? ''}</td>
								<td class="col-gloss">{t.reading?.gloss ?? ''}</td>
								<td class="col-parts">
									{#if t.radical}
										<button
											type="button"
											class="token radical"
											onclick={() => onradical?.(t.radical!.number)}
										>
											{t.radical.radical} · {t.radical.pinyin} · {t.radical.meanings.join(', ')}
										</button>
										<span class="itself">is a radical in its own right</span>
									{:else if t.atomic}
										<span class="itself">no recorded breakdown</span>
									{:else}
										{#each t.tokens as token, j (j)}
											{#if token.radical}
												<button
													type="button"
													class="token radical"
													onclick={() => onradical?.(token.radical!.number)}
												>
													{token.char} · {token.radical.pinyin} · {token.radical.meanings.join(
														', '
													)}
												</button>
											{:else}
												<span class="token">
													{token.unencoded || !token.char ? '?' : token.char}
													{#if token.reading?.pinyin}· {token.reading.pinyin}{/if}
												</span>
											{/if}
										{/each}
									{/if}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			{/if}

			{#if tally.length}
				<div class="tally">
					<span class="label">radicals used</span>
					{#each tally as entry (entry.radical.number)}
						<button
							type="button"
							class="tally-chip"
							onclick={() => onradical?.(entry.radical.number)}
						>
							<span class="tally-glyph">{entry.radical.radical}</span>
							<span class="tally-text">{entry.radical.english}</span>
							{#if entry.count > 1}<span class="tally-count">×{entry.count}</span>{/if}
						</button>
					{/each}
				</div>
			{/if}
		{/if}
	{/if}
</section>

<style>
	.sentence {
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

	.input {
		font-family: 'Noto Serif SC', serif;
		font-size: 1.2rem;
		line-height: 1.7;
		width: 100%;
		box-sizing: border-box;
		padding: 0.6rem 0.8rem;
		color: #5a4835;
		background: #fffdf9;
		border: 1px solid #d9cebb;
		border-radius: 6px;
		resize: vertical;
	}

	.input:focus {
		outline: none;
		border-color: #c8a97e;
		box-shadow: 0 0 0 3px rgba(200, 169, 126, 0.2);
	}

	.examples {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.4rem;
		margin-top: 0.75rem;
	}

	.label {
		color: #7a6c58;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 1px;
	}

	.example {
		font-family: 'Noto Serif SC', serif;
		font-size: 1rem;
		color: #5a4835;
		background: #fdf6e9;
		border: 1px solid #e0d5c5;
		border-radius: 6px;
		padding: 0.15rem 0.55rem;
		cursor: pointer;
	}

	.example:hover {
		background: #f6e7cd;
	}

	.status {
		margin: 1.25rem 0 0;
		color: #6f6353;
		font-style: italic;
	}

	.status.error {
		color: #9c5b4a;
	}

	.toolbar {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin: 1.5rem 0 1rem;
		padding-top: 1.25rem;
		border-top: 1px solid #e8e0d2;
	}

	.switch {
		display: inline-flex;
		border: 1px solid #e0d5c5;
		border-radius: 6px;
		overflow: hidden;
	}

	.switch button {
		font-family: inherit;
		font-size: 0.85rem;
		color: #7b6b56;
		background: #fffdf9;
		border: none;
		border-right: 1px solid #e8e0d2;
		padding: 0.3rem 0.7rem;
		cursor: pointer;
	}

	.switch button:last-child {
		border-right: none;
	}

	.switch button.active {
		background: #f0e2c8;
		color: #5a4835;
	}

	.count {
		color: #7a6c58;
		font-size: 0.8rem;
	}

	.copy {
		font-family: inherit;
		font-size: 0.85rem;
		margin-left: auto;
		color: #6b5334;
		background: #f0e2c8;
		border: 1px solid #d9c39b;
		border-radius: 6px;
		padding: 0.3rem 0.8rem;
		cursor: pointer;
	}

	.copy:hover {
		background: #e8d4b0;
	}

	/* Reading view: one small stack per character, wrapping like text. */
	.reading {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-end;
		gap: 0.5rem 0.35rem;
		line-height: 1.4;
	}

	.passthrough {
		align-self: flex-end;
		color: #6f6353;
		font-size: 1.1rem;
		padding-bottom: 0.15rem;
		white-space: pre-wrap;
	}

	.cell {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.1rem;
		padding: 0.3rem 0.4rem;
		border: 1px solid #e8e0d2;
		border-radius: 6px;
		background: rgba(255, 255, 255, 0.8);
	}

	.cell.is-radical {
		border-color: #d9c39b;
		background: #fdf6e9;
	}

	.cell-char {
		font-family: 'Noto Serif SC', serif;
		font-size: 1.7rem;
		line-height: 1.1;
		color: #5a4835;
	}

	.cell-pinyin {
		color: #7b6b56;
		font-style: italic;
		font-size: 0.75rem;
	}

	.cell-parts {
		display: flex;
		align-items: center;
		gap: 0.15rem;
		flex-wrap: wrap;
		justify-content: center;
		max-width: 12rem;
	}

	.plus {
		color: #8a7a63;
		font-size: 0.7rem;
	}

	.token {
		font-family: 'Noto Serif SC', serif;
		font-size: 0.95rem;
		color: #6d6355;
		background: none;
		border: none;
		padding: 0;
	}

	button.token {
		font-family: inherit;
		cursor: pointer;
		color: #6b5334;
		background: #f0e2c8;
		border: 1px solid #d9c39b;
		border-radius: 4px;
		padding: 0 0.3rem;
	}

	button.token:hover {
		background: #e8d4b0;
	}

	.breakdown-table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.95rem;
		border: 1px solid #e0d5c5;
		background: rgba(255, 255, 255, 0.7);
	}

	.breakdown-table th {
		background: #f0e8dd;
		color: #5a4835;
		text-align: left;
		padding: 0.6rem 0.75rem;
		border-bottom: 2px solid #d9cebb;
		font-weight: bold;
	}

	.breakdown-table td {
		padding: 0.5rem 0.75rem;
		border-bottom: 1px solid #e8e0d2;
		vertical-align: middle;
	}

	.col-char {
		font-family: 'Noto Serif SC', serif;
		font-size: 1.6rem;
		color: #5a4835;
		width: 3.5rem;
	}

	.col-pinyin {
		color: #7b6b56;
		font-style: italic;
		width: 6rem;
	}

	.col-gloss {
		color: #6d6355;
		width: 30%;
	}

	.col-parts {
		display: table-cell;
	}

	.col-parts .token {
		display: inline-block;
		margin: 0.1rem 0.25rem 0.1rem 0;
		font-family: 'Noto Serif', serif;
		font-size: 0.85rem;
	}

	.col-parts button.token {
		font-family: 'Noto Serif', serif;
		padding: 0.1rem 0.45rem;
	}

	.itself {
		color: #7a6c58;
		font-style: italic;
		font-size: 0.85rem;
	}

	.tally {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.4rem;
		margin-top: 1.5rem;
		padding-top: 1.25rem;
		border-top: 1px solid #e8e0d2;
	}

	.tally-chip {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		background: #f0e2c8;
		border: 1px solid #d9c39b;
		border-radius: 999px;
		padding: 0.15rem 0.65rem;
		color: #6b5334;
		cursor: pointer;
	}

	.tally-chip:hover {
		background: #e8d4b0;
	}

	.tally-glyph {
		font-family: 'Noto Serif SC', serif;
		font-size: 1.15rem;
	}

	.tally-text {
		font-size: 0.8rem;
	}

	.tally-count {
		color: #6b5334;
		font-size: 0.75rem;
	}

	@media (max-width: 500px) {
		.sentence {
			padding: 1rem;
		}

		.copy {
			margin-left: 0;
		}

		.cell-char {
			font-size: 1.4rem;
		}

		.col-gloss {
			display: none;
		}
	}
</style>
