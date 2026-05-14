import type { AlgorithmModule, SortStep } from '../types'

function* cocktailShakerSort(arr: number[]): Generator<SortStep> {
	const inputArray = [...arr]
	const n = inputArray.length
	const sorted: number[] = []

	yield {
		array: [...inputArray],
		comparing: [],
		swapping: [],
		sorted: Array.from({ length: n }, (_, i) => i)
	}
}

export const cocktailShakerSortModule: AlgorithmModule = {
	meta: {
		id: 'cocktail-shaker-sort',
		name: 'Cocktail Shaker Sort',
		category: 'slow',
		tag: 'serious',
		description: '',
		howItWorks: '',
		complexity: {
			best: 'O(n)',
			average: 'O(n²)',
			worst: 'O(n²)',
		},
	},
	sort: cocktailShakerSort,
}
