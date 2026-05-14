import type { AlgorithmModule, SortStep } from '../types'

function* manualSort(arr: number[]): Generator<SortStep> {
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

export const manualSortModule: AlgorithmModule = {
	meta: {
		id: 'manual-sort',
		name: 'Manual Sort',
		category: 'slow',
		tag: 'joke',
		description: '',
		howItWorks: '',
		complexity: {
			best: 'O(n + human effort)',
			average: 'O(n + human effort)',
			worst: 'O(n + human effort)',
		},
	},
	sort: manualSort,
}
