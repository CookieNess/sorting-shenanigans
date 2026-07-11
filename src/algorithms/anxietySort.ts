import type { AlgorithmModule, SortStep } from '../types'

function* anxietySort(arr: number[]): Generator<SortStep> {
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
				;[inputArray[j], inputArray[j + 1]] = [inputArray[j + 1], inputArray[j]]
				yield {
					array: [...inputArray],
					comparing: [],
					swapping: [j, j + 1],
					sorted: [...sorted]
				}
			}
		}

		sorted.unshift(n - 1 - i)

		const randomNumber = Math.floor(Math.random() * 10)

		if (randomNumber % 3 === 0 && sorted.length >= 2) {
			// anxious
			for (let k = 0; k < sorted.length - 1; k++) {
				const a = sorted[k]
				const b = sorted[k + 1]

				yield {
					array: [...inputArray],
					comparing: [a, b],
					swapping: [],
					sorted: [...sorted]
				}
			}
		} else if (randomNumber % 5 === 0) {
			// panic
			for (let flash = 0; flash < 3; flash++) {
				yield {
					array: [...inputArray],
					comparing: [],
					swapping: [],
					sorted: [],
					panic: Array.from({ length: n }, (_, idx) => idx)
				}
				yield {
					array: [...inputArray],
					comparing: [],
					swapping: [],
					sorted: [],
					panic: []
				}
			}

			i = -1
			sorted.length = 0
		}
	}

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
		description: 'Bubble sort, but the algorithm is anxious and keeps checking if the array is sorted. Sometimes it might even panic and start over from scratch!',
		howItWorks: 'Runs bubble sort, but after each pass it might be paranoid and check if what is sorted is actually correct. It might even panic and start over with the checks, just to be sure.',
		complexity: {
			best: {
				value: 'O(n²)',
				note: 'In the best case, the algorithm keeps calm and only checks if the array is sorted after each pass, which is still O(n²) due to the nature of bubble sort.'
			},
			average: {
				value: 'O(n² + paranoia)',
				note: 'In the average case, the algorithm is just a little anxious and checks if the array is sorted after each pass, which adds some overhead to the O(n²) complexity of bubble sort.'
			},
			worst: {
				value: 'O(n² + panic)',
				note: 'In the worst case, the algorithm panics and regards nothing as sorted, forving it to recheck, which can lead to a complexity worse than O(n²).'
			}
		},
	},
	sort: anxietySort,
}
