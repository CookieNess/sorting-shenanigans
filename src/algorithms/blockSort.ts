import type { AlgorithmModule, SortStep } from '../types'

function* blockSort(arr: number[]): Generator<SortStep> {
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

export const blockSortModule: AlgorithmModule = {
	meta: {
		id: 'block-sort',
		name: 'Block Sort',
		category: 'fast',
		tag: 'serious',
		description: '',
		howItWorks: '',
		complexity: {
			best: {
				value: '',
				note: ''
			},
			average: {
				value: '',
				note: ''
			},
			worst: {
				value: '',
				note: ''
			}
		},
	},
	sort: blockSort,
}
