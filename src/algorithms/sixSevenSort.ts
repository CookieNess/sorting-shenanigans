import type { AlgorithmModule, SortStep } from '../types'

function* sixSevenSort(arr: number[]): Generator<SortStep> {
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

export const sixSevenSortModule: AlgorithmModule = {
	meta: {
		id: 'six-seven-sort',
		name: 'Six Seven Sort',
		category: 'fast',
		tag: 'serious',
		description: '',
		howItWorks: '',
		complexity: {
			best: 'O(n)',
			average: 'O(n)',
			worst: 'O(n)',
		},
	},
	sort: sixSevenSort,
}
