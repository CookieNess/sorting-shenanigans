import type { AlgorithmModule } from '../types'
import { bubbleSortModule } from './bubbleSort'
import { selectionSortModule } from './selectionSort'
import { stalinSortModule } from './stalinSort'

export const algorithms: AlgorithmModule[] = [
	bubbleSortModule,
	stalinSortModule,
	selectionSortModule,
]

export function getAlgorithm(id: string): AlgorithmModule | undefined {
	return algorithms.find((a) => a.meta.id === id)
}
