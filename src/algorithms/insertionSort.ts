import type { AlgorithmModule, SortStep } from '../types'

function* insertionSort(arr: number[]): Generator<SortStep> {
	const inputArray = [...arr]
	const n = inputArray.length

	for (let i = 1; i < n; i++) {
		const key = inputArray[i]
		let j = i - 1

		yield {
			array: [...inputArray],
			comparing: [i],
			swapping: [],
			sorted: Array.from({ length: i }, (_, index) => index)
		}

		while (j >= 0 && inputArray[j] > key) {
			yield {
				array: [...inputArray],
				comparing: [j, j + 1],
				swapping: [],
				sorted: []
			}

			inputArray[j + 1] = inputArray[j]

			yield {
				array: [...inputArray],
				comparing: [],
				swapping: [j, j + 1],
				sorted: []
			}

			j--
		}

		inputArray[j + 1] = key
	}

	yield {
		array: [...inputArray],
		comparing: [],
		swapping: [],
		sorted: Array.from({ length: n }, (_, i) => i)
	}
}

export const insertionSortModule: AlgorithmModule = {
	meta: {
		id: 'insertion-sort',
		name: 'Insertion Sort',
		category: 'slow',
		tag: 'serious',
		description:
			'',
		howItWorks:
			'',
		complexity: {
			best: '',
			average: '',
			worst: '',
			note: ''
		},
	},
	sort: insertionSort,
}