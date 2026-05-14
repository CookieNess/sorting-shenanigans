import type { AlgorithmModule, SortStep } from '../types'

function* miracleSort(arr: number[]): Generator<SortStep> {
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

export const miracleSortModule: AlgorithmModule = {
	meta: {
		id: 'miracle-sort',
		name: 'Miracle Sort',
		category: 'slow',
		tag: 'joke',
		description: '',
		howItWorks: '',
		complexity: {
			best: 'O(1) (miracle happens)',
			average: 'O(∞) (unbounded, depends on miracles)',
			worst: 'O(∞) (unbounded, no miracles)',
		},
	},
	sort: miracleSort,
}
