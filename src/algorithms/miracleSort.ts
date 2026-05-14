import type { AlgorithmModule, SortStep } from '../types'

function delay(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

async function* miracleSort(arr: number[]): AsyncGenerator<SortStep> {
	const inputArray = [...arr]
	const n = inputArray.length

	const miracleNumber = 42

	while (true) {
		await delay(1000)

		const randomNumber = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)

		if (randomNumber === miracleNumber) {
			inputArray.sort((a, b) => a - b)

			yield {
				array: [...inputArray],
				comparing: [],
				swapping: [],
				sorted: Array.from(
					{ length: n },
					(_, i) => i
				)
			}

			return
		}

		yield {
			array: [...inputArray],
			comparing: [],
			swapping: [],
			sorted: []
		}
	}
}

export const miracleSortModule: AlgorithmModule = {
	meta: {
		id: 'miracle-sort',
		name: 'Miracle Sort',
		category: 'slow',
		tag: 'joke',
		description: 'Miracle Sort is waiting for a miracle to happen to sort the array. Let\'s hope for the best!',
		howItWorks: 'We wait for a miracle to happen - do not blink, or you might miss it!',
		complexity: {
			best: 'O(1) (miracle happens)',
			average: 'O(?) (unbounded, depends on miracles)',
			worst: 'O(∞) (unbounded, no miracles)',
		},
	},
	sort: miracleSort,
}
