import type { AlgorithmModule, SortStep } from "../types";

function* stalinSort(arr: number[]): Generator<SortStep> {
	const inputArray = [...arr];
	let n = inputArray.length;
	const sorted: number[] = [];

	let i = 1;
	while (i < n) {
		yield {
			array: [...inputArray],
			comparing: [i - 1, i],
			swapping: [],
			sorted: [...sorted]
		}

		if (inputArray[i] >= inputArray[i - 1]) {
			sorted.push(i - 1);
			i++;
		} else {
			inputArray.splice(i, 1);
			n--;
		}
	}

	yield {
		array: [...inputArray],
		comparing: [],
		swapping: [],
		sorted: Array.from({ length: inputArray.length }, (_, i) => i)
	}
}

export const stalinSortModule: AlgorithmModule = {
	meta: {
		id: 'stalin-sort',
		name: 'Stalin Sort',
		category: 'fast',
		tag: 'joke',
		description: 'The "sorting" algorithm that throws out any elements that are out of order, leaving only the sorted ones behind.',
		howItWorks:
			'Iterates through the list and keeps only the elements that are greater than or equal to the last kept element. Any element that is smaller than the last kept element is discarded.',
		complexity: {
			best: 'O(n)',
			average: 'O(n)',
			worst: 'O(n)',
		},
	},
	sort: stalinSort,
}