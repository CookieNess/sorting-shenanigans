import { isSorted } from '../helpers/isSorted'
import type { AlgorithmModule, SortStep } from '../types'

function* bozoSort(arr: number[]): Generator<SortStep> {
	let inputArray = [...arr]
	const n = inputArray.length

	function trySort(array: number[]): number[] {
		const result = [...array]

		const i = Math.floor(Math.random() * result.length)
		const j = Math.floor(Math.random() * result.length)

		;[result[i], result[j]] = [result[j], result[i]]

		return result
	}

	while (!isSorted(inputArray)) {
		inputArray = trySort(inputArray)

		yield {
			array: [...inputArray],
			comparing: [],
			swapping: [],
			sorted: Array.from({ length: n }, (_, i) => i)
		}
	}

	yield {
		array: [...inputArray],
		comparing: [],
		swapping: [],
		sorted: Array.from({ length: n }, (_, i) => i)
	}
}

export const bozoSortModule: AlgorithmModule = {
	meta: {
		id: 'bozo-sort',
		name: 'Bozo Sort',
		category: 'slow',
		tag: 'joke',
		description: '',
		howItWorks: '',
		complexity: {
			best: 'O(n)',
			average: 'O(n * n!)',
			worst: 'O(∞) (unbounded)',
		},
	},
	sort: bozoSort,
}
