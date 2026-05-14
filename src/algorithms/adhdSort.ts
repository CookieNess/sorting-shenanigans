import type { AlgorithmModule, SortStep } from '../types'

function* adhdSort(arr: number[]): Generator<SortStep> {
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

export const adhdSortModule: AlgorithmModule = {
	meta: {
		id: 'adhd-sort',
		name: 'ADHD Sort',
		category: 'slow',
		tag: 'joke',
		description: '',
		howItWorks: '',
		complexity: {
			best: 'O(n²)',
			average: 'O(n² + distraction)',
			worst: 'O(n² + distraction + hyperfocus)',
		},
	},
	sort: adhdSort,
}
