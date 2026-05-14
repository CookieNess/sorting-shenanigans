import type { AlgorithmModule, SortStep } from '../types'

function* noSort(arr: number[]): Generator<SortStep> {
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

export const noSortModule: AlgorithmModule = {
	meta: {
		id: 'no-sort',
		name: 'No Sort',
		category: 'fast',
		tag: 'joke',
		description: '',
		howItWorks: '',
		complexity: {
			best: 'O(1)',
			average: 'O(1)',
			worst: 'O(1)',
		},
	},
	sort: noSort,
}
