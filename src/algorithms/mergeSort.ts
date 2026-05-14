import type { AlgorithmModule, SortStep } from "../types";

function* mergeSort(arr: number[]): Generator<SortStep> {
	const workingArray = [...arr]

	function* sort(
		left: number,
		right: number
	): Generator<SortStep> {
		if (left >= right) return

		const mid = Math.floor((left + right) / 2)

		yield* sort(left, mid)
		yield* sort(mid + 1, right)

		const temp: number[] = []

		let i = left
		let j = mid + 1

		while (i <= mid && j <= right) {
			yield {
				array: [...workingArray],
				comparing: [i, j],
				swapping: [],
				sorted: []
			}

			if (workingArray[i] <= workingArray[j]) {
				temp.push(workingArray[i++])
			} else {
				temp.push(workingArray[j++])
			}
		}

		while (i <= mid) {
			temp.push(workingArray[i++])
		}

		while (j <= right) {
			temp.push(workingArray[j++])
		}

		for (let k = 0; k < temp.length; k++) {
			workingArray[left + k] = temp[k]

			yield {
				array: [...workingArray],
				comparing: [],
				swapping: [left + k],
				sorted: []
			}
		}
	}

	yield* sort(0, workingArray.length - 1)

	yield {
		array: [...workingArray],
		comparing: [],
		swapping: [],
		sorted: Array.from(
			{ length: workingArray.length },
			(_, i) => i
		)
	}
}

export const mergeSortModule: AlgorithmModule = {
	meta: {
		id: 'merge-sort',
		name: 'Merge Sort',
		category: 'fast',
		tag: 'serious',
		description: 'Merge sort is an efficient, stable, divide-and-conquer sorting algorithm that works by recursively splitting the input array into smaller subarrays until each subarray contains a single element. Then, it merges those subarrays back together in a sorted order to produce the final sorted array.',
		howItWorks:
			'The algorithm works by recursively dividing the input array into two halves until we reach arrays of size one (which are inherently sorted). Then, it merges those halves back together in a sorted manner. The merging process involves comparing the elements of the two halves and building a new sorted array by selecting the smaller element from either half at each step.',
		complexity: {
			best: 'O(n log n)',
			average: 'O(n log n)',
			worst: 'O(n log n)',
		},
	},
	sort: mergeSort,
}