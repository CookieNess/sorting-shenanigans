import type { AlgorithmModule, SortStep } from '../types'

function* slowSort(arr: number[]): Generator<SortStep> {
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

export const slowSortModule: AlgorithmModule = {
	meta: {
		id: 'slow-sort',
		name: 'Slow Sort',
		category: 'slow',
		tag: 'joke',
		description: '',
		howItWorks: '',
		complexity: {
			best: 'O(n ^ (log(n) / 2))',
			average: 'O(n ^ (log(n) / 2))',
			worst: 'O(n ^ (log(n) / 2))',
		},
	},
	sort: slowSort,
}
