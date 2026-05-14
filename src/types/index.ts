export type AlgorithmCategory = 'fast' | 'medium' | 'slow'
export type AlgorithmTag = 'serious' | 'joke'

export interface ComplexityInfo {
	best: string
	average: string
	worst: string
}

export interface AlgorithmMeta {
	id: string
	name: string
	category: AlgorithmCategory
	tag: AlgorithmTag
	description: string
	howItWorks: string
	complexity: ComplexityInfo
}

export interface SortStep {
	array: number[]
	comparing: number[]
	swapping: number[]
	sorted: number[]
}

export type SortGenerator = (arr: number[]) => Generator<SortStep>

export interface AlgorithmModule {
	meta: AlgorithmMeta
	sort: SortGenerator
}

export interface Tile {
	correctIndex: number
	currentIndex: number
	dataUrl: string
}
