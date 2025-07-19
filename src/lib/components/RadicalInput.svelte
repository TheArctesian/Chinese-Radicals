<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	
	const dispatch = createEventDispatcher<{
		analyze: { text: string };
	}>();

	let inputText = $state('');
	let isLoading = $state(false);
	let error = $state('');

	const handleSubmit = () => {
		if (!inputText.trim()) {
			error = 'Please enter some Chinese characters';
			return;
		}
		
		// Basic validation for Chinese characters
		const chineseRegex = /[\u4e00-\u9fff\u3400-\u4dbf]/;
		if (!chineseRegex.test(inputText)) {
			error = 'Please enter at least one Chinese character';
			return;
		}

		error = '';
		isLoading = true;
		
		dispatch('analyze', { text: inputText.trim() });
		
		// Reset loading state after a timeout (will be handled by parent)
		setTimeout(() => {
			isLoading = false;
		}, 5000);
	};

	const handleKeypress = (event: KeyboardEvent) => {
		if (event.key === 'Enter') {
			handleSubmit();
		}
	};

	const clearInput = () => {
		inputText = '';
		error = '';
	};

	// Reset loading state when input changes
	$effect(() => {
		if (inputText) {
			isLoading = false;
		}
	});

	export const setLoading = (loading: boolean) => {
		isLoading = loading;
	};

	export const setError = (errorMessage: string) => {
		error = errorMessage;
		isLoading = false;
	};
</script>

<div class="input-container">
	<div class="input-header">
		<h2 class="input-title">Enter Chinese Characters</h2>
		<p class="input-subtitle">Discover the radical components and their meanings</p>
	</div>
	
	<div class="input-wrapper" class:error={error} class:loading={isLoading}>
		<div class="input-group">
			<input
				type="text"
				bind:value={inputText}
				placeholder="输入中文字符... (Enter Chinese characters)"
				class="main-input"
				class:error={error}
				onkeypress={handleKeypress}
				disabled={isLoading}
				maxlength="50"
			/>
			
			{#if inputText}
				<button
					type="button"
					class="clear-button"
					onclick={clearInput}
					disabled={isLoading}
					aria-label="Clear input"
				>
					<svg viewBox="0 0 20 20" class="clear-icon">
						<path
							fill="currentColor"
							d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"
						/>
					</svg>
				</button>
			{/if}
		</div>
		
		<button
			type="button"
			class="analyze-button"
			onclick={handleSubmit}
			disabled={!inputText.trim() || isLoading}
		>
			{#if isLoading}
				<div class="loading-spinner"></div>
				<span>Analyzing...</span>
			{:else}
				<svg viewBox="0 0 20 20" class="analyze-icon">
					<path
						fill="currentColor"
						d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"
					/>
				</svg>
				<span>Analyze</span>
			{/if}
		</button>
	</div>
	
	{#if error}
		<div class="error-message" transition:fade={{ duration: 200 }}>
			<svg viewBox="0 0 20 20" class="error-icon">
				<path
					fill="currentColor"
					d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"
				/>
			</svg>
			{error}
		</div>
	{/if}
</div>

<style>
	.input-container {
		max-width: 600px;
		margin: 0 auto;
		padding: 2rem 0;
	}

	.input-header {
		text-align: center;
		margin-bottom: 2rem;
	}

	.input-title {
		font-size: 1.8rem;
		color: #5a4835;
		margin: 0 0 0.5rem 0;
		font-weight: 600;
		letter-spacing: 0.5px;
	}

	.input-subtitle {
		color: #7b6b56;
		font-size: 1rem;
		margin: 0;
		font-style: italic;
	}

	.input-wrapper {
		display: flex;
		gap: 1rem;
		align-items: flex-start;
		padding: 1.5rem;
		background: rgba(255, 255, 255, 0.8);
		border-radius: 12px;
		border: 2px solid #e8e0d2;
		box-shadow: 0 4px 20px rgba(90, 72, 53, 0.1);
		transition: all 0.3s ease;
	}

	.input-wrapper:focus-within {
		border-color: #7b6b56;
		box-shadow: 0 4px 25px rgba(90, 72, 53, 0.15);
	}

	.input-wrapper.error {
		border-color: #d73502;
		box-shadow: 0 4px 20px rgba(215, 53, 2, 0.1);
	}

	.input-wrapper.loading {
		opacity: 0.8;
	}

	.input-group {
		flex: 1;
		position: relative;
	}

	.main-input {
		width: 100%;
		padding: 1rem 1.5rem;
		font-size: 1.1rem;
		border: 2px solid transparent;
		border-radius: 8px;
		background: #fff;
		color: #3a3a3a;
		transition: all 0.3s ease;
		font-family: 'Noto Serif SC', serif;
		box-sizing: border-box;
	}

	.main-input:focus {
		outline: none;
		border-color: #7b6b56;
		box-shadow: 0 0 0 3px rgba(123, 107, 86, 0.1);
	}

	.main-input.error {
		border-color: #d73502;
	}

	.main-input::placeholder {
		color: #a0a0a0;
		font-style: italic;
	}

	.clear-button {
		position: absolute;
		right: 0.5rem;
		top: 50%;
		transform: translateY(-50%);
		background: none;
		border: none;
		color: #7b6b56;
		cursor: pointer;
		padding: 0.5rem;
		border-radius: 4px;
		transition: all 0.2s ease;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.clear-button:hover {
		background: rgba(123, 107, 86, 0.1);
		color: #5a4835;
	}

	.clear-icon {
		width: 16px;
		height: 16px;
	}

	.analyze-button {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 1rem 2rem;
		background: linear-gradient(135deg, #7b6b56 0%, #5a4835 100%);
		color: white;
		border: none;
		border-radius: 8px;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		white-space: nowrap;
		min-height: 54px;
		box-sizing: border-box;
	}

	.analyze-button:hover:not(:disabled) {
		background: linear-gradient(135deg, #5a4835 0%, #4a3d2b 100%);
		transform: translateY(-1px);
		box-shadow: 0 4px 15px rgba(90, 72, 53, 0.3);
	}

	.analyze-button:active:not(:disabled) {
		transform: translateY(0);
	}

	.analyze-button:disabled {
		opacity: 0.6;
		cursor: not-allowed;
		transform: none;
	}

	.analyze-icon {
		width: 18px;
		height: 18px;
	}

	.loading-spinner {
		width: 18px;
		height: 18px;
		border: 2px solid rgba(255, 255, 255, 0.3);
		border-top: 2px solid white;
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.error-message {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-top: 1rem;
		padding: 0.75rem 1rem;
		background: rgba(215, 53, 2, 0.1);
		border: 1px solid rgba(215, 53, 2, 0.3);
		border-radius: 6px;
		color: #d73502;
		font-size: 0.9rem;
	}

	.error-icon {
		width: 16px;
		height: 16px;
		flex-shrink: 0;
	}

	/* Responsive styles */
	@media (max-width: 768px) {
		.input-container {
			padding: 1rem;
		}

		.input-wrapper {
			flex-direction: column;
			gap: 1rem;
		}

		.analyze-button {
			width: 100%;
			justify-content: center;
		}

		.input-title {
			font-size: 1.5rem;
		}

		.main-input {
			font-size: 1rem;
		}
	}

	/* Animation utilities */
	@keyframes fade {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Ensure proper font loading for Chinese characters */
	.main-input {
		font-feature-settings: 'liga' off;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
</style>