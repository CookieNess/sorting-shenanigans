import type { AlgorithmModule, SortStep } from '../types'

function* bogoSort(arr: number[]): Generator<SortStep> {
	let inputArray = [...arr]
	const n = inputArray.length
	const maxAttempts = 1000000 // no infinite

	function isSorted(array: number[]): boolean {
		for (let i = 1; i < array.length; i++) {
			if (array[i - 1] > array[i]) {
				return false
			}
		}
		return true
	}

	function trySort(array: number[]): number[] {
		const result = [...array]

		for (let i = 0; i < result.length; i++) {
			const j = Math.floor(Math.random() * result.length)

			;[result[i], result[j]] = [result[j], result[i]]
		}

		return result
	}
	let attempts = 0

	while (!isSorted(inputArray)) {
		if (attempts >= maxAttempts) break
		inputArray = trySort(inputArray)

		yield {
			array: [...inputArray],
			comparing: [],
			swapping: [],
			sorted: Array.from({ length: n }, (_, i) => i)
		}
		attempts++
	}

	yield {
		array: [...inputArray],
		comparing: [],
		swapping: [],
		sorted: Array.from({ length: n }, (_, i) => i)
	}
}

export const bogoSortModule: AlgorithmModule = {
	meta: {
		id: 'bogo-sort',
		name: 'Bogo Sort',
		category: 'slow',
		tag: 'joke',
		description: '',
		howItWorks: '',
		complexity: {
			best: {
				value: 'O(n)'
			},
			average: {
				value: 'O(n * n!)'
			},
			worst: {
				value: 'O(∞) (unbounded)'
			}
		}
	},
	sort: bogoSort,
}
