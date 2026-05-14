import type { AlgorithmModule, SortStep } from '../types'

function* anxietySort(arr: number[]): Generator<SortStep> {
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

export const anxietySortModule: AlgorithmModule = {
	meta: {
		id: 'anxiety-sort',
		name: 'Anxiety Sort',
		category: 'slow',
		tag: 'joke',
		description: '',
		howItWorks: '',
		complexity: {
			best: 'O(n²)',
			average: 'O(n² + paranoia)',
			worst: 'O(n² + panic)',
		},
	},
	sort: anxietySort,
}
