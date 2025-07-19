<script lang="ts">
	import { onMount } from 'svelte';
	import RadicalInput from '$lib/components/RadicalInput.svelte';
	import RadicalDisplay from '$lib/components/RadicalDisplay.svelte';
	import { radicalService, type AnalysisResult } from '$lib/services/radicalService';

	let inputComponent: any;
	let analysisResult: AnalysisResult | null = $state(null);
	let showResults = $state(false);
	let apiStatus = $state<'checking' | 'available' | 'unavailable'>('checking');
	let showRadicalTable = $state(false);

	// Check API availability on mount
	onMount(async () => {
		try {
			await radicalService.healthCheck();
			apiStatus = 'available';
		} catch (error) {
			console.warn('API not available, using fallback mode:', error);
			apiStatus = 'unavailable';
		}
	});

	const handleAnalyze = async (event: CustomEvent<{ text: string }>) => {
		const { text } = event.detail;
		
		try {
			showResults = false;
			analysisResult = null;

			let result: AnalysisResult;
			
			if (apiStatus === 'available') {
				result = await radicalService.analyzeText(text);
			} else {
				// Use fallback analysis
				result = await radicalService.analyzeTextFallback(text);
			}

			analysisResult = result;
			showResults = true;
			
			// Reset input loading state
			if (inputComponent) {
				inputComponent.setLoading(false);
			}
		} catch (error) {
			console.error('Analysis failed:', error);
			
			// Show error in input component
			if (inputComponent) {
				const errorMessage = error instanceof Error ? error.message : 'Analysis failed';
				inputComponent.setError(errorMessage);
			}
		}
	};

	const toggleRadicalTable = () => {
		showRadicalTable = !showRadicalTable;
		if (showRadicalTable) {
			showResults = false;
			analysisResult = null;
		}
	};

	const resetToAnalyzer = () => {
		showRadicalTable = false;
		showResults = false;
		analysisResult = null;
	};
</script>

<svelte:head>
	<title>Chinese Radical Analyzer - Discover Character Components</title>
	<meta name="description" content="Analyze Chinese characters and discover their radical components with meanings and pronunciations." />
</svelte:head>

<div class="main-container">
	<header class="page-header">
		<h1 class="main-title">Chinese Radical Analyzer</h1>
		<p class="main-subtitle">
			Discover the building blocks of Chinese characters through radical decomposition
		</p>
		
		{#if apiStatus === 'unavailable'}
			<div class="api-status-warning">
				<svg viewBox="0 0 20 20" class="warning-icon">
					<path
						fill="currentColor"
						d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"
					/>
				</svg>
				<span>Limited analysis mode - API server not available</span>
			</div>
		{/if}
	</header>

	<nav class="page-nav">
		<button 
			class="nav-button"
			class:active={!showRadicalTable}
			onclick={resetToAnalyzer}
		>
			<svg viewBox="0 0 20 20" class="nav-icon">
				<path
					fill="currentColor"
					d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"
				/>
			</svg>
			Character Analyzer
		</button>
		<button 
			class="nav-button"
			class:active={showRadicalTable}
			onclick={toggleRadicalTable}
		>
			<svg viewBox="0 0 20 20" class="nav-icon">
				<path
					fill="currentColor"
					d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
				/>
			</svg>
			Radical Reference
		</button>
	</nav>

	<main class="page-content">
		{#if showRadicalTable}
			<div class="reference-section">
				<h2 class="section-title">214 Kangxi Radicals Reference</h2>
				<p class="section-description">
					The complete set of traditional Chinese radicals used in character classification
				</p>
				
				<div class="radical-table-container">
					<table class="radical-table">
						<thead>
							<tr>
								<th>Pinyin</th>
								<th>Radical</th>
								<th>Variant <br />(Simplified)</th>
								<th>English</th>
							</tr>
						</thead>
						<tbody>
							<tr><td>yī</td><td>一</td><td></td><td>one</td></tr>
							<tr><td>shù</td><td>丨</td><td></td><td>line</td></tr>
							<tr><td>diǎn</td><td>丶</td><td></td><td>dot</td></tr>
							<tr><td>piě</td><td>丿</td><td>乀 乁</td><td>slash</td></tr>
							<tr><td>yǐ</td><td>乙</td><td>乚 乛</td><td>second</td></tr>
							<tr><td>gōu</td><td>亅</td><td></td><td>hook</td></tr>
							<tr><td>èr</td><td>二</td><td></td><td>two</td></tr>
							<tr><td>tóu</td><td>亠</td><td></td><td>lid</td></tr>
							<tr><td>rén</td><td>人</td><td>亻</td><td>person</td></tr>
							<tr><td>ér</td><td>儿</td><td></td><td>legs</td></tr>
							<tr><td>rù</td><td>入</td><td></td><td>enter</td></tr>
							<tr><td>bā</td><td>八</td><td>丷</td><td>eight</td></tr>
							<tr><td>jiǒng</td><td>冂</td><td></td><td>down box</td></tr>
							<tr><td>mì</td><td>冖</td><td></td><td>cover</td></tr>
							<tr><td>bīng</td><td>冫</td><td></td><td>ice</td></tr>
							<tr><td>jī, jǐ</td><td>几</td><td></td><td>table</td></tr>
							<tr><td>qǔ</td><td>凵</td><td></td><td>open box</td></tr>
							<tr><td>dāo</td><td>刀</td><td>刂</td><td>knife</td></tr>
							<tr><td>lì</td><td>力</td><td></td><td>power</td></tr>
							<tr><td>bāo</td><td>勹</td><td></td><td>wrap</td></tr>
							<!-- Truncated for brevity - in production, include all 214 radicals -->
							<tr><td>shuǐ</td><td>水</td><td>氵</td><td>water</td></tr>
							<tr><td>huǒ</td><td>火</td><td>灬</td><td>fire</td></tr>
							<tr><td>mù</td><td>木</td><td></td><td>tree</td></tr>
							<tr><td>jīn</td><td>金</td><td>钅</td><td>metal</td></tr>
							<tr><td>yán</td><td>言</td><td>讠</td><td>speech</td></tr>
						</tbody>
					</table>
				</div>
			</div>
		{:else}
			<div class="analyzer-section">
				<RadicalInput bind:this={inputComponent} onanalyze={handleAnalyze} />
				<RadicalDisplay {analysisResult} isVisible={showResults} />
				
				{#if !showResults && !analysisResult}
					<div class="example-section">
						<h3 class="example-title">Try these examples:</h3>
						<div class="example-buttons">
							<button 
								class="example-button"
								onclick={() => handleAnalyze(new CustomEvent('analyze', { detail: { text: '好' } }))}
							>
								好 (good)
							</button>
							<button 
								class="example-button"
								onclick={() => handleAnalyze(new CustomEvent('analyze', { detail: { text: '森林' } }))}
							>
								森林 (forest)
							</button>
							<button 
								class="example-button"
								onclick={() => handleAnalyze(new CustomEvent('analyze', { detail: { text: '明天' } }))}
							>
								明天 (tomorrow)
							</button>
							<button 
								class="example-button"
								onclick={() => handleAnalyze(new CustomEvent('analyze', { detail: { text: '漢字' } }))}
							>
								漢字 (Chinese characters)
							</button>
						</div>
					</div>
				{/if}
			</div>
		{/if}
	</main>
</div>

<style>
	.main-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.page-header {
		text-align: center;
		margin-bottom: 2rem;
	}

	.main-title {
		font-size: 2.5rem;
		color: #5a4835;
		margin: 0 0 1rem 0;
		font-weight: 700;
		letter-spacing: 1px;
		text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.8);
	}

	.main-subtitle {
		font-size: 1.2rem;
		color: #7b6b56;
		margin: 0 0 1.5rem 0;
		font-style: italic;
		max-width: 600px;
		margin-left: auto;
		margin-right: auto;
		line-height: 1.5;
	}

	.api-status-warning {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 0.75rem 1.5rem;
		background: rgba(255, 193, 7, 0.1);
		border: 1px solid rgba(255, 193, 7, 0.3);
		border-radius: 8px;
		color: #856404;
		font-size: 0.9rem;
		margin: 1rem auto;
		max-width: 400px;
	}

	.warning-icon {
		width: 18px;
		height: 18px;
		flex-shrink: 0;
	}

	.page-nav {
		display: flex;
		justify-content: center;
		gap: 1rem;
		margin-bottom: 2rem;
		padding: 0.5rem;
		background: rgba(255, 255, 255, 0.6);
		border-radius: 12px;
		border: 1px solid #e8e0d2;
	}

	.nav-button {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.5rem;
		background: transparent;
		border: 2px solid transparent;
		border-radius: 8px;
		color: #7b6b56;
		font-size: 1rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.nav-button:hover {
		background: rgba(123, 107, 86, 0.1);
		color: #5a4835;
	}

	.nav-button.active {
		background: linear-gradient(135deg, #7b6b56 0%, #5a4835 100%);
		color: white;
		border-color: #5a4835;
	}

	.nav-icon {
		width: 18px;
		height: 18px;
	}

	.page-content {
		flex: 1;
	}

	.analyzer-section {
		/* Inherits styles from components */
	}

	.reference-section {
		max-width: 1000px;
		margin: 0 auto;
	}

	.section-title {
		font-size: 2rem;
		color: #5a4835;
		text-align: center;
		margin: 0 0 1rem 0;
		font-weight: 600;
	}

	.section-description {
		text-align: center;
		color: #7b6b56;
		font-size: 1.1rem;
		margin: 0 0 2rem 0;
		font-style: italic;
	}

	.radical-table-container {
		background: rgba(255, 255, 255, 0.9);
		border-radius: 12px;
		padding: 2rem;
		border: 2px solid #e8e0d2;
		box-shadow: 0 4px 20px rgba(90, 72, 53, 0.1);
		overflow-x: auto;
	}

	.radical-table {
		width: 100%;
		border-collapse: collapse;
		font-size: 1rem;
		border: 1px solid #e0d5c5;
		background-color: rgba(255, 255, 255, 0.7);
		table-layout: fixed;
	}

	.radical-table thead {
		background-color: #f0e8dd;
	}

	.radical-table th {
		padding: 15px 10px;
		border-bottom: 2px solid #d9cebb;
		color: #5a4835;
		font-weight: bold;
		text-align: center;
	}

	.radical-table td {
		padding: 12px 10px;
		border-bottom: 1px solid #e8e0d2;
		vertical-align: middle;
		transition: background-color 0.3s;
		text-align: center;
	}

	.radical-table tr:nth-child(even) {
		background-color: rgba(245, 240, 232, 0.5);
	}

	.radical-table tr:hover {
		background-color: rgba(228, 219, 204, 0.5);
	}

	.radical-table td:nth-child(1) {
		color: #7b6b56;
		font-style: italic;
		width: 20%;
	}

	.radical-table td:nth-child(2) {
		font-family: 'Noto Serif SC', serif;
		font-size: 1.5rem;
		color: #5a4835;
		width: 15%;
	}

	.radical-table td:nth-child(3) {
		font-family: 'Noto Serif SC', serif;
		font-size: 1.3rem;
		color: #8c7c68;
		width: 25%;
	}

	.radical-table td:nth-child(4) {
		color: #5a4835;
		width: 40%;
	}

	.example-section {
		text-align: center;
		margin-top: 3rem;
		padding: 2rem;
		background: rgba(255, 255, 255, 0.8);
		border-radius: 12px;
		border: 1px solid #e8e0d2;
	}

	.example-title {
		font-size: 1.3rem;
		color: #5a4835;
		margin: 0 0 1.5rem 0;
		font-weight: 600;
	}

	.example-buttons {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		justify-content: center;
	}

	.example-button {
		padding: 0.75rem 1.5rem;
		background: linear-gradient(135deg, rgba(123, 107, 86, 0.1) 0%, rgba(90, 72, 53, 0.1) 100%);
		border: 2px solid #e8e0d2;
		border-radius: 8px;
		color: #5a4835;
		font-size: 1rem;
		font-family: 'Noto Serif SC', serif;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.example-button:hover {
		background: linear-gradient(135deg, #7b6b56 0%, #5a4835 100%);
		color: white;
		border-color: #5a4835;
		transform: translateY(-2px);
		box-shadow: 0 4px 15px rgba(90, 72, 53, 0.2);
	}

	/* Responsive styles */
	@media (max-width: 768px) {
		.main-container {
			padding: 1rem;
		}

		.main-title {
			font-size: 2rem;
		}

		.main-subtitle {
			font-size: 1rem;
		}

		.page-nav {
			flex-direction: column;
			gap: 0.5rem;
		}

		.nav-button {
			justify-content: center;
		}

		.radical-table-container {
			padding: 1rem;
		}

		.example-buttons {
			flex-direction: column;
			align-items: center;
		}

		.example-button {
			width: 200px;
		}
	}

	@media (max-width: 480px) {
		.radical-table th,
		.radical-table td {
			padding: 8px 5px;
			font-size: 0.9rem;
		}

		.radical-table td:nth-child(2) {
			font-size: 1.2rem;
		}

		.radical-table td:nth-child(3) {
			font-size: 1rem;
		}
	}
</style>