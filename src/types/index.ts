export type AlgorithmCategory = 'fast' | 'medium' | 'slow'
export type AlgorithmTag = 'serious' | 'joke'
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
	panic?: number[]
}

export type SortIterator =
	| Generator<SortStep>
	| AsyncGenerator<SortStep>

export type SortGenerator = (arr: number[]) => SortIterator

export interface AlgorithmModule {
	meta: AlgorithmMeta
	sort: SortGenerator
}

export interface Tile {
	correctIndex: number
	currentIndex: number
	dataUrl: string
}

interface ComplexityCase {
	value: string
	note?: string
}

interface ComplexityInfo {
	best: ComplexityCase | string,
	average: ComplexityCase | string,
	worst: ComplexityCase | string,
	note?: ComplexityCase | string
}

