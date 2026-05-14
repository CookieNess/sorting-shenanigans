import type { AlgorithmModule, SortStep } from '../types'

function* burstSort(arr: number[]): Generator<SortStep> {
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

export const burstSortModule: AlgorithmModule = {
	meta: {
		id: 'burst-sort',
		name: 'Burst Sort',
		category: 'fast',
		tag: 'serious',
		description: '',
		howItWorks: '',
		complexity: {
			best: 'O(n * (k / d))',
			average: 'O(n * (k / d))',
			worst: 'O(n * (k / d))',
		},
	},
	sort: burstSort,
}
