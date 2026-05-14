import type { AlgorithmModule, SortStep } from '../types'

function* radixSort(arr: number[]): Generator<SortStep> {
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

export const radixSortModule: AlgorithmModule = {
	meta: {
		id: 'radix-sort',
		name: 'Radix Sort',
		category: 'fast',
		tag: 'serious',
		description: '',
		howItWorks: '',
		complexity: {
			best: 'O(n * (k / d))',
			average: 'O(n * (k / d))',
			worst: 'O(n * (k / d))',
		},
	},
	sort: radixSort,
}
