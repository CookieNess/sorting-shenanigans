import type { AlgorithmModule, SortStep } from '../types'

function* yahtzeeSort(arr: number[]): Generator<SortStep> {
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

export const yahtzeeSortModule: AlgorithmModule = {
	meta: {
		id: 'yahtzee-sort',
		name: 'Yahtzee Sort',
		category: 'slow',
		tag: 'joke',
		description: '',
		howItWorks: '',
		complexity: {
			best: 'O(n* n!)',
			average: 'O(n * n!)',
			worst: 'O(n * n!)',
		},
	},
	sort: yahtzeeSort,
}
