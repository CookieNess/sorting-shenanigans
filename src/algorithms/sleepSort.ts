import type { AlgorithmModule, SortStep } from '../types'

function* sleepSort(arr: number[]): Generator<SortStep> {
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

export const sleepSortModule: AlgorithmModule = {
	meta: {
		id: 'sleep-sort',
		name: 'Sleep Sort',
		category: 'slow',
		tag: 'joke',
		description: '',
		howItWorks: '',
		complexity: {
			best: 'O(n) (if we ignore the sleeping time)',
			average: 'O(n) (if we ignore the sleeping time)',
			worst: 'O(n) (if we ignore the sleeping time)',
		},
	},
	sort: sleepSort,
}
