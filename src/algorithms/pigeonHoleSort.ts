import type { AlgorithmModule, SortStep } from '../types'

function* pigeonholeSort(arr: number[]): Generator<SortStep> {
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

export const pigeonholeSortModule: AlgorithmModule = {
	meta: {
		id: 'pigeonhole-sort',
		name: 'Pigeonhole Sort',
		category: 'fast',
		tag: 'serious',
		description: '',
		howItWorks: '',
		complexity: {
			best: 'O(n + 2^k)',
			average: 'O(n + 2^k)',
			worst: 'O(n + 2^k)',
		},
	},
	sort: pigeonholeSort,
}
