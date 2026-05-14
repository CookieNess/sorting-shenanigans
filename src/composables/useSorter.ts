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

		const gen = sortFn([...arr])

		if (isAsyncIterator(gen)) {
			iterator = gen
			return
		}

		const collected: SortStep[] = []
		for (const step of gen) {
			collected.push(step)
		}
		steps.value = collected
	}

	function play(onStep: (step: SortStep) => void, delayMs = 80) {
		if (isRunning.value) return
		isRunning.value = true
		isDone.value = false
		const currentRunId = runId

		const playCollectedSteps = () => {
			if (stepIndex.value >= steps.value.length || currentRunId !== runId) {
				isRunning.value = false
				isDone.value = true
				return
			}
			const step = steps.value[stepIndex.value]
			currentStep.value = step
			onStep(step)
			stepIndex.value++
			timeoutId = setTimeout(playCollectedSteps, delayMs)
		}

		const playAsyncSteps = async () => {
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
				void playAsyncSteps()
			}, delayMs)
		}

		if (iterator) {
			void playAsyncSteps()
			return
		}

		playCollectedSteps()
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
