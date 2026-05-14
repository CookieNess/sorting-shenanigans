import type { AlgorithmModule, SortStep } from '../types'

function* bozoSort(arr: number[]): Generator<SortStep> {
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

export const bozoSortModule: AlgorithmModule = {
	meta: {
		id: 'bozo-sort',
		name: 'Bozo Sort',
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
	sort: bozoSort,
}
