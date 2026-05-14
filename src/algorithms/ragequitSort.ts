import type { AlgorithmModule, SortStep } from '../types'

function* ragequitSort(arr: number[]): Generator<SortStep> {
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

export const ragequitSortModule: AlgorithmModule = {
	meta: {
		id: 'ragequit-sort',
		name: 'Ragequit Sort',
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
	sort: ragequitSort,
}
