import type { AlgorithmModule, SortStep } from '../types'

function* cubeSort(arr: number[]): Generator<SortStep> {
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

export const cubeSortModule: AlgorithmModule = {
	meta: {
		id: 'cube-sort',
		name: 'Cube Sort',
		category: 'fast',
		tag: 'serious',
		description: '',
		howItWorks: '',
		complexity: {
			best: 'O(n)',
			average: 'O(n log n)',
			worst: 'O(n log n)',
		},
	},
	sort: cubeSort,
}
