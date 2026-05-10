import { ref, readonly } from 'vue'
import type { SortGenerator, SortStep } from '../types'

export type SortMode = 'bars' | 'image'

export function useSorter() {
  const isRunning = ref(false)
  const isDone = ref(false)
  const currentStep = ref<SortStep | null>(null)
  const stepIndex = ref(0)
  const steps = ref<SortStep[]>([])

  let timeoutId: ReturnType<typeof setTimeout> | null = null

  function prepare(sortFn: SortGenerator, arr: number[]) {
    if (timeoutId) clearTimeout(timeoutId)
    isRunning.value = false
    isDone.value = false
    stepIndex.value = 0
    steps.value = []
    currentStep.value = null

    const gen = sortFn([...arr])
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

    const tick = () => {
      if (stepIndex.value >= steps.value.length) {
        isRunning.value = false
        isDone.value = true
        return
      }
      const step = steps.value[stepIndex.value]
      currentStep.value = step
      onStep(step)
      stepIndex.value++
      timeoutId = setTimeout(tick, delayMs)
    }
    tick()
  }

  function pause() {
    if (timeoutId) clearTimeout(timeoutId)
    isRunning.value = false
  }

  function reset() {
    if (timeoutId) clearTimeout(timeoutId)
    isRunning.value = false
    isDone.value = false
    stepIndex.value = 0
    currentStep.value = null
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
