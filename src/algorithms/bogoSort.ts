import type { AlgorithmModule, SortStep } from '../types'

function* bogoSort(arr: number[]): Generator<SortStep> {
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

export const bogoSortModule: AlgorithmModule = {
	meta: {
		id: 'bogo-sort',
		name: 'Bogo Sort',
		category: 'slow',
		tag: 'joke',
		description: '',
		howItWorks: '',
		complexity: {
			best: 'O(n)',
			average: 'O(n * n!)',
			worst: 'O(∞) (unbounded)',
		},
	},
	sort: bogoSort,
}
