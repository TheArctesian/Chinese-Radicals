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

interface ApiError {
	detail: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

class RadicalService {
	async analyzeText(text: string): Promise<AnalysisResult> {
		try {
			const response = await fetch(`${API_BASE_URL}/analyze`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ text }),
			});

			if (!response.ok) {
				const errorData: ApiError = await response.json();
				throw new Error(errorData.detail || 'Failed to analyze text');
			}

			const result: AnalysisResult = await response.json();
			return result;
		} catch (error) {
			if (error instanceof Error) {
				throw error;
			}
			throw new Error('Network error occurred while analyzing text');
		}
	}

	async getAllRadicals(): Promise<Record<string, RadicalInfo>> {
		try {
			const response = await fetch(`${API_BASE_URL}/radicals`);

			if (!response.ok) {
				throw new Error('Failed to fetch radicals');
			}

			return await response.json();
		} catch (error) {
			if (error instanceof Error) {
				throw error;
			}
			throw new Error('Network error occurred while fetching radicals');
		}
	}

	async healthCheck(): Promise<{ status: string }> {
		try {
			const response = await fetch(`${API_BASE_URL}/health`);

			if (!response.ok) {
				throw new Error('Health check failed');
			}

			return await response.json();
		} catch (error) {
			throw new Error('API server is not responding');
		}
	}

	// Fallback analysis for when API is not available
	async analyzeTextFallback(text: string): Promise<AnalysisResult> {
		// This is a simple fallback that uses a basic character-to-radical mapping
		// In a production environment, you might want to include a subset of the radical data
		// directly in the frontend or use a simpler analysis method
		
		const characters: CharacterAnalysis[] = [];
		
		for (const char of text) {
			if (this.isChineseCharacter(char)) {
				// Basic analysis - just return the character with minimal info
				characters.push({
					character: char,
					unicode_point: `U+${char.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0')}`,
					radicals: [],
					decomposition: 'Fallback mode - limited analysis available'
				});
			}
		}

		return {
			input_text: text,
			characters,
			total_characters: characters.length
		};
	}

	private isChineseCharacter(char: string): boolean {
		const code = char.charCodeAt(0);
		// CJK Unified Ideographs
		if (0x4E00 <= code && code <= 0x9FFF) return true;
		// CJK Extension A
		if (0x3400 <= code && code <= 0x4DBF) return true;
		// CJK Extension B and beyond
		if (0x20000 <= code && code <= 0x2A6DF) return true;
		return false;
	}
}

// Export singleton instance
export const radicalService = new RadicalService();

// Export types for use in components
export type { AnalysisResult, CharacterAnalysis, RadicalInfo };