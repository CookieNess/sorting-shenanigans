import type { AlgorithmModule, SortStep } from '../types'

function* quickSort(arr: number[]): Generator<SortStep> {
	const inputArray = [...arr]
	const sorted: number[] = []

	function* partition(low: number, high: number): Generator<SortStep, number> {
		const pivot = inputArray[high]
		let i = low

		for (let j = low; j < high; j++) {
			yield {
				array: [...inputArray],
				comparing: [j, high],
				swapping: [],
				sorted: [...sorted]
			}

			if (inputArray[j] < pivot) {
				[inputArray[i], inputArray[j]] = [inputArray[j], inputArray[i]]

				yield {
					array: [...inputArray],
					comparing: [],
					swapping: [i, j],
					sorted: [...sorted]
				}

				i++
			}
		}

		[inputArray[i], inputArray[high]] = [inputArray[high], inputArray[i]]

		yield {
			array: [...inputArray],
			comparing: [],
			swapping: [i, high],
			sorted: [...sorted]
		}

		return i
	}

	function* sort(low: number, high: number): Generator<SortStep> {
		if (low >= high) {
			if (low === high) {
				sorted.push(low)
			}
			return
		}

		const pivotIndex = yield* partition(low, high)
		sorted.push(pivotIndex)

		yield* sort(low, pivotIndex - 1)
		yield* sort(pivotIndex + 1, high)
	}

	yield* sort(0, inputArray.length - 1)

	yield {
		array: [...inputArray],
		comparing: [],
		swapping: [],
		sorted: Array.from({ length: inputArray.length }, (_, i) => i)
	}
}

export const quickSortModule: AlgorithmModule = {
	meta: {
		id: 'quick-sort',
		name: 'Quick Sort',
		category: 'fast',
		tag: 'serious',
		description: '',
		howItWorks:
			'',
		complexity: {
			best: '',
			average: '',
			worst: '',
			note: ''
		},
	},
	sort: quickSort,
}