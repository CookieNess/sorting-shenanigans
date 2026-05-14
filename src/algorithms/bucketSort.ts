import type { AlgorithmModule, SortStep } from '../types'

function* bucketSort(arr: number[]): Generator<SortStep> {
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

export const bucketSortModule: AlgorithmModule = {
	meta: {
		id: 'bucket-sort',
		name: 'Bucket Sort',
		category: 'medium',
		tag: 'serious',
		description: '',
		howItWorks: '',
		complexity: {
			best: 'O(n + k)',
			average: 'O(n + k)',
			worst: 'O(n²) (when all elements are in the same bucket)',
		},
	},
	sort: bucketSort,
}
