import type { AlgorithmModule } from '../types'
import { bubbleSortModule } from './bubbleSort'
import { insertionSortModule } from './insertionSort'
import { mergeSortModule } from './mergeSort'
import { selectionSortModule } from './selectionSort'
import { stalinSortModule } from './stalinSort'

export const algorithms: AlgorithmModule[] = [
	bubbleSortModule,
	stalinSortModule,
	selectionSortModule,
	insertionSortModule,
	mergeSortModule,
]

export function getAlgorithm(id: string): AlgorithmModule | undefined {
	return algorithms.find((a) => a.meta.id === id)
}
