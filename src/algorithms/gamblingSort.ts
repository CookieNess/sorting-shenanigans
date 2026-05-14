import type { AlgorithmModule, SortStep } from '../types'

function* gamblingSort(arr: number[]): Generator<SortStep> {
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

export const gamblingSortModule: AlgorithmModule = {
	meta: {
		id: 'gambling-sort',
		name: 'Gambling Sort',
		category: 'slow',
		tag: 'joke',
		description: '',
		howItWorks: '',
		complexity: {
			best: 'O(n)',
			average: 'O(n² * luck)',
			worst: 'O(∞) (unbounded)',
		},
	},
	sort: gamblingSort,
}
