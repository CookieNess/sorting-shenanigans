import type { AlgorithmModule } from '../types'
import { adhdSortModule } from './adhdSort'
import { anxietySortModule } from './anxietySort'
import { blockSortModule } from './blockSort'
import { bogoSortModule } from './bogoSort'
import { bozoSortModule } from './bozoSort'
import { bubbleSortModule } from './bubbleSort'
import { bucketSortModule } from './bucketSort'
import { burstSortModule } from './burstSort'
import { cocktailShakerSortModule } from './cocktailShakerSort'
import { countingSortModule } from './countingSort'
import { crumSortModule } from './crumSort'
import { cubeSortModule } from './cubeSort'
import { cycleSortModule } from './cycleSort'
import { flashSortModule } from './flashSort'
import { gamblingSortModule } from './gamblingSort'
import { gaslightSortModule } from './gaslightSort'
import { genghisKhanSortModule } from './genghisKhanSort'
import { gnomeSortModule } from './gnomeSort'
import { heapSortModule } from './heapSort'
import { insertionSortModule } from './insertionSort'
import { instantSortModule } from './instantSort'
import { introSortModule } from './introSort'
import { librarySortModule } from './librarySort'
import { manualSortModule } from './manualSort'
import { mergeSortModule } from './mergeSort'
import { miracleSortModule } from './miracleSort'
import { noSortModule } from './noSort'
import { patienceSortModule } from './patienceSort'
import { pigeonholeSortModule } from './pigeonHoleSort'
import { quickSortModule } from './quickSort'
import { radixSortModule } from './radixSort'
import { ragequitSortModule } from './ragequitSort'
import { selectionSortModule } from './selectionSort'
import { shellSortModule } from './shellSort'
import { sixSevenSortModule } from './sixSevenSort'
import { sleepSortModule } from './sleepSort'
import { slowSortModule } from './slowSort'
import { smoothSortModule } from './smoothSort'
import { solarBitflipSortModule } from './solarBitflipSort'
import { spreadSortModule } from './spreadSort'
import { stalinSortModule } from './stalinSort'
import { stoogeSortModule } from './stoogeSort'
import { thanosSortModule } from './thanosSort'
import { threeWaySortModule } from './threeWaySort'
import { timSortModule } from './timSort'
import { tournamentSortModule } from './tournamentSort'
import { treeSortModule } from './treeSort'
import { yahtzeeSortModule } from './yahtzeeSort'

export const algorithms: AlgorithmModule[] = [
	adhdSortModule,
	anxietySortModule,
	blockSortModule,
	bogoSortModule,
	bozoSortModule,
	bubbleSortModule,
	bucketSortModule,
	burstSortModule,
	cocktailShakerSortModule,
	countingSortModule,
	crumSortModule,
	cubeSortModule,
	cycleSortModule,
	flashSortModule,
	gamblingSortModule,
	gaslightSortModule,
	genghisKhanSortModule,
	gnomeSortModule,
	heapSortModule,
	insertionSortModule,
	instantSortModule,
	introSortModule,
	librarySortModule,
	manualSortModule,
	mergeSortModule,
	miracleSortModule,
	noSortModule,
	patienceSortModule,
	pigeonholeSortModule,
	quickSortModule,
	radixSortModule,
	ragequitSortModule,
	selectionSortModule,
	shellSortModule,
	sixSevenSortModule,
	sleepSortModule,
	slowSortModule,
	smoothSortModule,
	solarBitflipSortModule,
	spreadSortModule,
	stalinSortModule,
	stoogeSortModule,
	thanosSortModule,
	threeWaySortModule,
	timSortModule,
	tournamentSortModule,
	treeSortModule,
	yahtzeeSortModule,
]

export function getAlgorithm(id: string): AlgorithmModule | undefined {
	return algorithms.find((a) => a.meta.id === id)
}
