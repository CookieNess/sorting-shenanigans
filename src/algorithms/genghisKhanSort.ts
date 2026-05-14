import type { AlgorithmModule, SortStep } from '../types'

function* genghisKhanSort(arr: number[]): Generator<SortStep> {
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

export const genghisKhanSortModule: AlgorithmModule = {
	meta: {
		id: 'genghis-khan-sort',
		name: 'Genghis Khan Sort',
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
	sort: genghisKhanSort,
}
