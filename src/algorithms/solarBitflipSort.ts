import type { AlgorithmModule, SortStep } from '../types'

function* solarBitflipSort(arr: number[]): Generator<SortStep> {
	const inputArray = [...arr]
	const n = inputArray.length
	const sorted: number[] = []

	yield {
		array: [...inputArray],
		comparing: [],
		swapping: [],
		sorted: Array.from({ length: n }, (_, i) => i)
	}
}

export const solarBitflipSortModule: AlgorithmModule = {
	meta: {
		id: 'solar-bitflip-sort',
		name: 'Solar Bitflip Sort',
		category: 'slow',
		tag: 'joke',
		description: '',
		howItWorks: '',
		complexity: {
			best: 'O(1) (if a solar flare hits the computer at the right time)',
			average: 'O(n * solar-flare-probability) (since it relies on random solar flares)',
			worst: 'O(∞) (if we wait indefinitely for a solar flare that never comes)',
		},
	},
	sort: solarBitflipSort,
}
