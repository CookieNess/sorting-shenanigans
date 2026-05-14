import type { AlgorithmModule, SortStep } from '../types'

function* gnomeSort(arr: number[]): Generator<SortStep> {
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

export const gnomeSortModule: AlgorithmModule = {
	meta: {
		id: 'gnome-sort',
		name: 'Gnome Sort',
		category: 'slow',
		tag: 'serious',
		description: '',
		howItWorks: '',
		complexity: {
			best: 'O(n)',
			average: 'O(n²)',
			worst: 'O(n²)',
		},
	},
	sort: gnomeSort,
}
