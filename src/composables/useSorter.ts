import { ref, readonly } from 'vue'
import type { SortGenerator, SortIterator, SortStep } from '../types'

export type SortMode = 'bars' | 'image'

export function useSorter() {
	const isRunning = ref(false)
	const isDone = ref(false)
	const currentStep = ref<SortStep | null>(null)
	const stepIndex = ref(0)
	const steps = ref<SortStep[]>([])

	let timeoutId: ReturnType<typeof setTimeout> | null = null
	let iterator: SortIterator | null = null
	let runId = 0

	function isAsyncIterator(
		value: SortIterator
	): value is AsyncGenerator<SortStep> {
		return Symbol.asyncIterator in value
	}

	function prepare(sortFn: SortGenerator, arr: number[]) {
		if (timeoutId) clearTimeout(timeoutId)
		runId++
		isRunning.value = false
		isDone.value = false
		stepIndex.value = 0
		steps.value = []
		currentStep.value = null
		iterator = null

		iterator = sortFn([...arr])
	}

	function play(onStep: (step: SortStep) => void, delayMs = 80) {
		if (isRunning.value) return
		isRunning.value = true
		isDone.value = false
		const currentRunId = runId

		const playSteps = async () => {
			if (!iterator || currentRunId !== runId) return

			const result = await iterator.next()

			if (currentRunId !== runId) return

			if (result.done) {
				isRunning.value = false
				isDone.value = true
				iterator = null
				return
			}

			const step = result.value
			steps.value.push(step)
			currentStep.value = step
			onStep(step)
			stepIndex.value++

			timeoutId = setTimeout(() => {
				void playSteps()
			}, delayMs)
		}

		void playSteps()
	}

	function pause() {
		if (timeoutId) clearTimeout(timeoutId)
		runId++
		isRunning.value = false
	}

	function reset() {
		if (timeoutId) clearTimeout(timeoutId)
		runId++
		isRunning.value = false
		isDone.value = false
		stepIndex.value = 0
		steps.value = []
		currentStep.value = null
		iterator = null
	}

	return {
		isRunning: readonly(isRunning),
		isDone: readonly(isDone),
		currentStep: readonly(currentStep),
		stepIndex: readonly(stepIndex),
		totalSteps: readonly(steps),
		prepare,
		play,
		pause,
		reset,
	}
}
