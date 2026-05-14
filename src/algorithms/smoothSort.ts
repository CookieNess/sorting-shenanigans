import type { AlgorithmModule, SortStep } from '../types'

function* smoothSort(arr: number[]): Generator<SortStep> {
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

export const smoothSortModule: AlgorithmModule = {
	meta: {
		id: 'smooth-sort',
		name: 'Smooth Sort',
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
	sort: smoothSort,
}
