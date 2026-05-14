import type { AlgorithmModule, SortStep } from '../types'

function* spreadSort(arr: number[]): Generator<SortStep> {
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

export const spreadSortModule: AlgorithmModule = {
	meta: {
		id: 'spread-sort',
		name: 'Spread Sort',
		category: 'fast',
		tag: 'serious',
		description: '',
		howItWorks: '',
		complexity: {
			best: 'O(n)',
			average: 'O(n * (k / d))',
			worst: 'O(n * ((k / s) + d)))',
		},
	},
	sort: spreadSort,
}
