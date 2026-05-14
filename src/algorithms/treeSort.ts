import type { AlgorithmModule, SortStep } from '../types'

function* treeSort(arr: number[]): Generator<SortStep> {
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

export const treeSortModule: AlgorithmModule = {
	meta: {
		id: 'tree-sort',
		name: 'Tree Sort',
		category: 'fast',
		tag: 'serious',
		description: '',
		howItWorks: '',
		complexity: {
			best: 'O(n log n)',
			average: 'O(n log n)',
			worst: 'O(n log n)',
		},
	},
	sort: treeSort,
}
