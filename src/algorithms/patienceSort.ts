import type { AlgorithmModule, SortStep } from '../types'

function* patienceSort(arr: number[]): Generator<SortStep> {
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

export const patienceSortModule: AlgorithmModule = {
	meta: {
		id: 'patience-sort',
		name: 'Patience Sort',
		category: 'fast',
		tag: 'serious',
		description: '',
		howItWorks: '',
		complexity: {
			best: 'O(n)',
			average: 'O(n log n)',
			worst: 'O(n log n)',
		},
	},
	sort: patienceSort,
}
