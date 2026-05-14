import type { AlgorithmModule, SortStep } from "../types";

function* insertionSort(arr: number[]): Generator<SortStep> {
	const inputArray = [...arr];
	const n = inputArray.length;
	const sorted: number[] = [];

	for (let i = 1; i < n; i++) {
		let key = inputArray[i];
		let j = i - 1;

		while (j >= 0 && inputArray[j] > key) {
			yield {
				array: [...inputArray],
				comparing: [j, j + 1],
				swapping: [],
				sorted: [...sorted]
			}

			inputArray[j + 1] = inputArray[j];
			j--;
		}
		inputArray[j + 1] = key;

		yield {
			array: [...inputArray],
			comparing: [],
			swapping: [j + 1, i],
			sorted: [...sorted]
		}

		sorted.push(i);
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
		description: 'Insertion sort is a simple sorting algorithm that builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort.',
		howItWorks:
			'The algorithm works by iterating through the input array and growing a sorted output array. For each element in the input array, it compares it with the elements in the sorted output array and inserts it into the correct position. This process is repeated until all elements are sorted.',
		complexity: {
			best: 'O(n)',
			average: 'O(n²)',
			worst: 'O(n²)',
		},
	},
	sort: insertionSort,
}