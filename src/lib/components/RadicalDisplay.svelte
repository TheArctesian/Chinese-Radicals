<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	interface RadicalInfo {
		radical: string;
		pinyin: string;
		english: string;
		variant?: string;
		stroke_count?: number;
		position?: string;
	}

	interface CharacterAnalysis {
		character: string;
		unicode_point: string;
		radicals: RadicalInfo[];
		primary_radical?: RadicalInfo;
		decomposition?: string;
	}

	interface AnalysisResult {
		input_text: string;
		characters: CharacterAnalysis[];
		total_characters: number;
	}

	let { result = $bindable(), isVisible = false }: { result: AnalysisResult | null, isVisible: boolean } = $props();

	const getPositionColor = (position?: string) => {
		switch (position) {
			case 'primary': return '#7b6b56';
			case 'component': return '#8c7c68';
			case 'detected': return '#9d8d7a';
			default: return '#7b6b56';
		}
	};

	const getPositionLabel = (position?: string) => {
		switch (position) {
			case 'primary': return 'Primary Radical';
			case 'component': return 'Component';
			case 'detected': return 'Detected';
			default: return 'Radical';
		}
	};
</script>

{#if result && isVisible}
	<div class="results-container" transition:fade={{ duration: 400, easing: quintOut }}>
		<div class="results-header">
			<h2 class="results-title">Radical Analysis</h2>
			<div class="input-display">
				<span class="input-label">Analyzed text:</span>
				<span class="input-text">{result.input_text}</span>
			</div>
		</div>

		<div class="characters-grid">
			{#each result.characters as character, index}
				<div 
					class="character-card"
					transition:fly={{ 
						delay: index * 150,
						duration: 500,
						x: -50,
						easing: quintOut
					}}
				>
					<div class="character-header">
						<div class="character-main">
							<span class="character-large">{character.character}</span>
							<span class="unicode-point">{character.unicode_point}</span>
						</div>
						
						{#if character.decomposition}
							<div class="decomposition">
								<span class="decomposition-label">Structure:</span>
								<span class="decomposition-text">{character.decomposition}</span>
							</div>
						{/if}
					</div>

					<div class="radicals-section">
						<h3 class="section-title">
							Radical Components ({character.radicals.length})
						</h3>
						
						{#if character.radicals.length === 0}
							<div class="no-radicals">
								<span class="no-radicals-text">No radical data available</span>
								<small>This character may be a basic radical itself or not in our database.</small>
							</div>
						{:else}
							<div class="radicals-list">
								{#each character.radicals as radical, radicalIndex}
									<div 
										class="radical-item"
										style="border-left-color: {getPositionColor(radical.position)}"
										transition:fly={{
											delay: (index * 150) + (radicalIndex * 100) + 200,
											duration: 400,
											y: 20,
											easing: quintOut
										}}
									>
										<div class="radical-header">
											<div class="radical-char-info">
												<span class="radical-char">{radical.radical}</span>
												{#if radical.variant}
													<span class="radical-variant">({radical.variant})</span>
												{/if}
											</div>
											<span 
												class="position-badge"
												style="background-color: {getPositionColor(radical.position)}"
											>
												{getPositionLabel(radical.position)}
											</span>
										</div>
										
										<div class="radical-details">
											<div class="radical-pronunciation">
												<span class="pronunciation-label">Pinyin:</span>
												<span class="pronunciation-text">{radical.pinyin}</span>
											</div>
											<div class="radical-meaning">
												<span class="meaning-label">Meaning:</span>
												<span class="meaning-text">{radical.english}</span>
											</div>
											{#if radical.stroke_count}
												<div class="radical-strokes">
													<span class="strokes-label">Strokes:</span>
													<span class="strokes-text">{radical.stroke_count}</span>
												</div>
											{/if}
										</div>
									</div>
								{/each}
							</div>
						{/if}
					</div>
				</div>
			{/each}
		</div>

		<div class="results-footer">
			<div class="stats">
				Analyzed {result.total_characters} character{result.total_characters !== 1 ? 's' : ''}
			</div>
		</div>
	</div>
{/if}

<style>
	.results-container {
		max-width: 1000px;
		margin: 2rem auto 0;
		padding: 0 1rem;
	}

	.results-header {
		text-align: center;
		margin-bottom: 2rem;
		padding: 1.5rem;
		background: rgba(255, 255, 255, 0.9);
		border-radius: 12px;
		border: 1px solid #e8e0d2;
		box-shadow: 0 2px 10px rgba(90, 72, 53, 0.1);
	}

	.results-title {
		font-size: 1.8rem;
		color: #5a4835;
		margin: 0 0 1rem 0;
		font-weight: 600;
		letter-spacing: 0.5px;
	}

	.input-display {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.input-label {
		color: #7b6b56;
		font-size: 0.9rem;
		font-weight: 500;
	}

	.input-text {
		font-family: 'Noto Serif SC', serif;
		font-size: 1.5rem;
		color: #5a4835;
		font-weight: 600;
		padding: 0.25rem 0.75rem;
		background: rgba(123, 107, 86, 0.1);
		border-radius: 6px;
	}

	.characters-grid {
		display: grid;
		gap: 2rem;
		grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
	}

	.character-card {
		background: rgba(255, 255, 255, 0.95);
		border-radius: 16px;
		padding: 2rem;
		border: 2px solid #e8e0d2;
		box-shadow: 0 4px 20px rgba(90, 72, 53, 0.1);
		transition: all 0.3s ease;
	}

	.character-card:hover {
		box-shadow: 0 6px 30px rgba(90, 72, 53, 0.15);
		transform: translateY(-2px);
	}

	.character-header {
		text-align: center;
		margin-bottom: 2rem;
		padding-bottom: 1.5rem;
		border-bottom: 2px solid #e8e0d2;
	}

	.character-main {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	.character-large {
		font-family: 'Noto Serif SC', serif;
		font-size: 4rem;
		color: #5a4835;
		font-weight: 400;
		line-height: 1;
	}

	.unicode-point {
		font-family: 'Monaco', 'Menlo', monospace;
		font-size: 0.9rem;
		color: #7b6b56;
		background: rgba(123, 107, 86, 0.1);
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
		align-self: flex-start;
	}

	.decomposition {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.decomposition-label {
		font-size: 0.9rem;
		color: #7b6b56;
		font-weight: 500;
	}

	.decomposition-text {
		font-family: 'Noto Serif SC', serif;
		font-size: 1.1rem;
		color: #5a4835;
		background: rgba(90, 72, 53, 0.1);
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
	}

	.radicals-section {
		/* No additional styles needed */
	}

	.section-title {
		font-size: 1.2rem;
		color: #5a4835;
		margin: 0 0 1.5rem 0;
		font-weight: 600;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.section-title::before {
		content: '';
		width: 4px;
		height: 20px;
		background: linear-gradient(to bottom, #7b6b56, #5a4835);
		border-radius: 2px;
	}

	.no-radicals {
		text-align: center;
		padding: 2rem;
		color: #7b6b56;
	}

	.no-radicals-text {
		display: block;
		font-size: 1.1rem;
		font-weight: 500;
		margin-bottom: 0.5rem;
	}

	.radicals-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.radical-item {
		padding: 1.5rem;
		background: rgba(255, 255, 255, 0.8);
		border-radius: 10px;
		border-left: 4px solid #7b6b56;
		transition: all 0.3s ease;
	}

	.radical-item:hover {
		background: rgba(255, 255, 255, 0.95);
		transform: translateX(4px);
	}

	.radical-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 1rem;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.radical-char-info {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.radical-char {
		font-family: 'Noto Serif SC', serif;
		font-size: 2rem;
		color: #5a4835;
		font-weight: 500;
	}

	.radical-variant {
		font-family: 'Noto Serif SC', serif;
		font-size: 1.2rem;
		color: #8c7c68;
		font-style: italic;
	}

	.position-badge {
		background-color: #7b6b56;
		color: white;
		padding: 0.25rem 0.75rem;
		border-radius: 20px;
		font-size: 0.8rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.radical-details {
		display: grid;
		gap: 0.75rem;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
	}

	.radical-pronunciation,
	.radical-meaning,
	.radical-strokes {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.pronunciation-label,
	.meaning-label,
	.strokes-label {
		font-size: 0.8rem;
		color: #7b6b56;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.pronunciation-text {
		font-size: 1rem;
		color: #5a4835;
		font-style: italic;
		font-weight: 500;
	}

	.meaning-text {
		font-size: 1rem;
		color: #5a4835;
		font-weight: 500;
		text-transform: capitalize;
	}

	.strokes-text {
		font-size: 1rem;
		color: #5a4835;
		font-weight: 600;
	}

	.results-footer {
		text-align: center;
		margin-top: 2rem;
		padding: 1rem;
		color: #7b6b56;
		font-size: 0.9rem;
		font-style: italic;
	}

	.stats {
		padding: 0.5rem 1rem;
		background: rgba(123, 107, 86, 0.1);
		border-radius: 20px;
		display: inline-block;
	}

	/* Responsive styles */
	@media (max-width: 768px) {
		.results-container {
			padding: 0 0.5rem;
		}

		.characters-grid {
			grid-template-columns: 1fr;
		}

		.character-card {
			padding: 1.5rem;
		}

		.character-large {
			font-size: 3rem;
		}

		.character-main {
			flex-direction: column;
			gap: 0.5rem;
		}

		.radical-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 1rem;
		}

		.radical-details {
			grid-template-columns: 1fr;
		}

		.input-display {
			flex-direction: column;
			gap: 0.5rem;
		}
	}

	@media (max-width: 480px) {
		.character-card {
			padding: 1rem;
		}

		.radical-item {
			padding: 1rem;
		}

		.character-large {
			font-size: 2.5rem;
		}
	}
</style>