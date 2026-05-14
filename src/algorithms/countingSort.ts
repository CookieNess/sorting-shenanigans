import type { AlgorithmModule, SortStep } from '../types'

function* countingSort(arr: number[]): Generator<SortStep> {
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

export const countingSortModule: AlgorithmModule = {
	meta: {
		id: 'counting-sort',
		name: 'Counting Sort',
		category: 'fast',
		tag: 'serious',
		description: '',
		howItWorks: '',
		complexity: {
			best: 'O(n + k)',
			average: 'O(n + k)',
			worst: 'O(n + k)',
		},
	},
	sort: countingSort,
}
