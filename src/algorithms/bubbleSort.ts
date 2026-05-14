import type { AlgorithmModule, SortStep } from '../types'

function* bubbleSort(arr: number[]): Generator<SortStep> {
	const inputArray = [...arr]
	const n = inputArray.length
	const sorted: number[] = []

	for (let i = 0; i < n - 1; i++) {
		for (let j = 0; j < n - i - 1; j++) {
			yield {
				array: [...inputArray],
				comparing: [j, j + 1],
				swapping: [],
				sorted: [...sorted]
			}

			if (inputArray[j] > inputArray[j + 1]) {
				[inputArray[j], inputArray[j + 1]] = [inputArray[j + 1], inputArray[j]]
				yield {
					array: [...inputArray],
					comparing: [],
					swapping: [j, j + 1],
					sorted: [...sorted]
				}
			}
		}
		sorted.unshift(n - 1 - i)
	}

	yield {
		array: [...inputArray],
		comparing: [],
		swapping: [],
		sorted: Array.from({ length: n }, (_, i) => i)
	}
}

export const bubbleSortModule: AlgorithmModule = {
	meta: {
		id: 'bubble-sort',
		name: 'Bubble Sort',
		category: 'slow',
		tag: 'serious',
		description: 'The classic sorting algorithm everyone learns first - slow and simple.',
		howItWorks:
			'Repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The largest unsorted element "bubbles up" to its correct position each pass.',
		complexity: {
			best: 'O(n)',
			average: 'O(n²)',
			worst: 'O(n²)',
		},
	},
	sort: bubbleSort,
}
