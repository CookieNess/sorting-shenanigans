import type { AlgorithmModule } from '../types'
import { bubbleSortModule } from './bubbleSort'

export const algorithms: AlgorithmModule[] = [
  bubbleSortModule,

  // stalinSortModule,
  // miracleSortModule,
  // mergeSortModule,
  // quickSortModule,
  // bogoSortModule,
]

export function getAlgorithm(id: string): AlgorithmModule | undefined {
  return algorithms.find((a) => a.meta.id === id)
}
