import type { AlgorithmModule, SortStep } from '../types'

function* stoogeSort(arr: number[]): Generator<SortStep> {
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

export const stoogeSortModule: AlgorithmModule = {
	meta: {
		id: 'stooge-sort',
		name: 'Stooge Sort',
		category: 'slow',
		tag: 'joke',
		description: '',
		howItWorks: '',
		complexity: {
			best: 'O(n^(log 3/log 1.5))',
			average: 'O(n^(log 3/log 1.5))',
			worst: 'O(n^(log 3/log 1.5))',
		},
	},
	sort: stoogeSort,
}
