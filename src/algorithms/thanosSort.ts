import type { AlgorithmModule, SortStep } from '../types'

function* thanosSort(arr: number[]): Generator<SortStep> {
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

export const thanosSortModule: AlgorithmModule = {
	meta: {
		id: 'thanos-sort',
		name: 'Thanos Sort',
		category: 'fast',
		tag: 'joke',
		description: '',
		howItWorks: '',
		complexity: {
			best: 'O(n)',
			average: 'O(n)',
			worst: 'O(n)',
		},
	},
	sort: thanosSort,
}
