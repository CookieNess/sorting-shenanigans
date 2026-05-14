import type { AlgorithmModule, SortStep } from '../types'

function* flashSort(arr: number[]): Generator<SortStep> {
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

export const flashSortModule: AlgorithmModule = {
	meta: {
		id: 'flash-sort',
		name: 'Flash Sort',
		category: 'medium',
		tag: 'serious',
		description: '',
		howItWorks: '',
		complexity: {
			best: 'O(n)',
			average: 'O(n + k)',
			worst: 'O(n²)',
		},
	},
	sort: flashSort,
}
