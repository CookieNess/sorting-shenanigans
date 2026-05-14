import type { AlgorithmModule, SortStep } from '../types'

function* randomSort(arr: number[]): Generator<SortStep> {
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

export const randomSortModule: AlgorithmModule = {
	meta: {
		id: 'random-sort',
		name: 'Random Sort',
		category: 'slow',
		tag: 'joke',
		description: '',
		howItWorks: '',
		complexity: {
			best: 'O(n log n) (if we get lucky)',
			average: 'O(n * n!)',
			worst: 'O(∞) (unbounded)',
		},
	},
	sort: randomSort,
}
