import type { AlgorithmModule } from '../types'
import { bubbleSortModule } from './bubbleSort'
import { stalinSortModule } from './stalinSort'

export const algorithms: AlgorithmModule[] = [
  bubbleSortModule,
  stalinSortModule,
]

export function getAlgorithm(id: string): AlgorithmModule | undefined {
  return algorithms.find((a) => a.meta.id === id)
}
