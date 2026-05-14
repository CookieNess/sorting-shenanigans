import type { AlgorithmModule, SortStep } from '../types'

function* shellSort(arr: number[]): Generator<SortStep> {
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

export const shellSortModule: AlgorithmModule = {
	meta: {
		id: 'shell-sort',
		name: 'Shell Sort',
		category: 'medium',
		tag: 'serious',
		description: '',
		howItWorks: '',
		complexity: {
			best: 'O(n log n)',
			average: 'O(n log n)',
			worst: 'O(n log n²)',
		},
	},
	sort: shellSort,
}
