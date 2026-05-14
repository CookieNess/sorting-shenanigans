import type { AlgorithmModule, SortStep } from '../types'

function* selectionSort(arr: number[]): Generator<SortStep> {
	const inputArray = [...arr]
	const n = inputArray.length
	const sorted: number[] = []

	for (let i = 0; i < n - 1; i++) {
		let minIndex = i;
		for (let j = i + 1; j < n; j++) {
			yield {
				array: [...inputArray],
				comparing: [minIndex, j],
				swapping: [],
				sorted: [...sorted]
			}

			if (inputArray[j] < inputArray[minIndex]) {
				minIndex = j;
			}
		}

		if (minIndex !== i) {
			[inputArray[i], inputArray[minIndex]] = [inputArray[minIndex], inputArray[i]]
			yield {
				array: [...inputArray],
				comparing: [],
				swapping: [i, minIndex],
				sorted: [...sorted]
			}
		}

		sorted.push(i)
	}

	yield {
		array: [...inputArray],
		comparing: [],
		swapping: [],
		sorted: Array.from({ length: n }, (_, i) => i)
	}
}

export const selectionSortModule: AlgorithmModule = {
	meta: {
		id: 'selection-sort',
		name: 'Selection Sort',
		category: 'slow',
		tag: 'serious',
		description: 'Selection sort is a comparison-based sorting algorithm that divides the input list into two parts: the sorted part at the left end and the unsorted part at the right end.',
		howItWorks:
			'The algorithm works by iterating through the unsorted portion of the array to find the minimum element. Once the minimum element is found, it is swapped with the first element of the unsorted portion. This process is repeated for the next position in the array until the entire array is sorted.',
		complexity: {
			best: 'O(n²)',
			average: 'O(n²)',
			worst: 'O(n²)',
		},
	},
	sort: selectionSort,
}
