import type { AlgorithmModule, SortStep } from '../types'

function* adhdSort(arr: number[]): Generator<SortStep> {
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
			// Gets distracted — performs 6 random swaps on already sorted elements
			const swapCount = Math.min(6, Math.floor(sorted.length / 2))
			for (let s = 0; s < swapCount; s++) {
				const idxA = Math.floor(Math.random() * sorted.length)
				let idxB = Math.floor(Math.random() * sorted.length)
				while (idxB === idxA) idxB = Math.floor(Math.random() * sorted.length)

				const a = sorted[idxA]
				const b = sorted[idxB]

				yield {
					array: [...inputArray],
					comparing: [a, b],
					swapping: [],
					sorted: [...sorted]
				}

				;[inputArray[a], inputArray[b]] = [inputArray[b], inputArray[a]]

				sorted.splice(sorted.indexOf(a), 1)
				sorted.splice(sorted.indexOf(b), 1)

				yield {
					array: [...inputArray],
					comparing: [],
					swapping: [a, b],
					sorted: [...sorted]
				}
			}
		} else if (randomNumber === 1) {
			// Hyperfocuses — insertion sorts a random subsection of the unsorted portion
			const unsortedEnd = n - sorted.length
			if (unsortedEnd >= 4) {
				const start = Math.floor(Math.random() * (unsortedEnd - 2))
				const end = start + Math.floor(Math.random() * Math.min(6, unsortedEnd - start)) + 2

				for (let k = start + 1; k < end; k++) {
					const key = inputArray[k]
					let m = k - 1

					yield {
						array: [...inputArray],
						comparing: [m, k],
						swapping: [],
						sorted: [...sorted]
					}

					while (m >= start && inputArray[m] > key) {
						inputArray[m + 1] = inputArray[m]

						yield {
							array: [...inputArray],
							comparing: [],
							swapping: [m, m + 1],
							sorted: [...sorted]
						}

						m--
					}

					inputArray[m + 1] = key
				}
			}
		}
	}

	yield {
		array: [...inputArray],
		comparing: [],
		swapping: [],
		sorted: Array.from({ length: n }, (_, i) => i)
	}
}

export const adhdSortModule: AlgorithmModule = {
	meta: {
		id: 'adhd-sort',
		name: 'ADHD Sort',
		category: 'slow',
		tag: 'joke',
		description: 'Bubble Sort, kinda. It tries its best, but sometimes gets distracted and swaps random elements, or suddenly hyperfocuses and sorts a whole section before losing interest again.',
		howItWorks: 'Runs Bubble Sort as normal, but after each pass there is a chance it gets distracted and randomly swaps two unsorted elements, undoing some of its own work. There is also a chance it hyperfocuses and runs a full Insertion Sort pass on the unsorted portion, making unexpected progress before going back to its usual routine.',
		complexity: {
			best: {
				value: 'O(n² + hyperfocus)',
				note: 'No distractions - just clean Bubble Sort with some hyperfocusing.',
			},
			average: {
				value: 'O(n² + distraction + hyperfocus)',
				note: 'Both events occur. Chaotic, but the hyperfocus bursts partially compensate for the distractions.',
			},
			worst: {
				value: 'O(n² + distraction)',
				note: 'Only distractions, no hyperfocus to compensate. Constantly undoing its own progress. Don\'t blame it, it is trying its best.',
			},
		},
	},
	sort: adhdSort,
}