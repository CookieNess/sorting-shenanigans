<template>
  <div class="algo-view">
    <div v-if="!mod" class="not-found">
      <p>Algorithm not found: <code>{{ id }}</code></p>
      <RouterLink to="/" class="btn btn-ghost">← Back home</RouterLink>
    </div>

    <template v-else>
      <div class="nav-bar">
        <RouterLink to="/" class="back-link">
          <span>←</span> All algorithms
        </RouterLink>
        <div class="nav-badges">
          <span :class="`badge badge-${mod.meta.category}`">{{ mod.meta.category }}</span>
          <span :class="`badge badge-${mod.meta.tag}`">{{ mod.meta.tag }}</span>
        </div>
      </div>

      <div class="page-layout">

        <aside class="viz-panel">
          <div class="mode-toggle">
            <button
              class="mode-btn"
              :class="{ active: mode === 'bars' }"
              @click="mode = 'bars'"
            >Bars</button>
            <button
              class="mode-btn"
              :class="{ active: mode === 'image' }"
              @click="mode = 'image'"
            >Image</button>
          </div>

          <Transition name="slide-down">
            <div v-if="mode === 'image'" class="image-picker-wrapper">
              <ImagePicker @select="onImageSelect" />
            </div>
          </Transition>

          <div class="speed-row">
            <span class="speed-label">Speed</span>
            <input type="range" min="20" max="500" step="10" v-model.number="rawDelay" class="speed-slider" />
            <span class="speed-value mono">{{ displaySpeed }}</span>
          </div>

          <div class="viz-area" :class="{ 'viz-area--image': mode === 'image' }">
            <div v-if="mode === 'bars'" class="viz-inner">
              <BarsVisualizer
                :values="barValues"
                :comparing="([...(step?.comparing ?? [])] as number[])"
                :swapping="([...(step?.swapping ?? [])] as number[])"
                :sorted="([...(step?.sorted ?? [])] as number[])"
              />
            </div>
            <div v-else class="viz-inner viz-inner--image">
              <div v-if="!imageSrc" class="image-placeholder">
                <span>Choose an image to get started</span>
              </div>
              <TileVisualizer
                v-else
                :tiles="tiles"
                :comparing="tileComparing"
                :swapping="tileSwapping"
                :sorted="tileSorted"
              />
            </div>
          </div>

          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: progressPct + '%' }" />
          </div>

          <div class="controls">
            <button class="btn btn-ghost" :disabled="sorter.isRunning.value" @click="shuffle">
              Shuffle
            </button>
            <button
              class="btn btn-primary"
              :disabled="!canSort"
              @click="toggleSort"
            >
              {{ sorter.isRunning.value ? '⏸ Pause' : sorter.isDone.value ? '↩ Reset' : '▶ Sort' }}
            </button>
          </div>

          <p v-if="sorter.isDone.value" class="done-message">
            Sorted in {{ sorter.totalSteps.value.length }} steps
          </p>
        </aside>

        <main class="info-panel">
          <div class="algo-title-row">
            <h1 class="algo-name">{{ mod.meta.name }}</h1>
          </div>

          <p class="algo-description">{{ mod.meta.description }}</p>

          <section class="info-section">
            <h2 class="info-section-title">How it works</h2>
            <p class="info-text">{{ mod.meta.howItWorks }}</p>
          </section>

          <section class="info-section">
            <h2 class="info-section-title">Complexity</h2>
            <div class="complexity-grid">
              <div class="complexity-row" v-for="(val, key) in complexityRows" :key="key">
                <span class="complexity-key">{{ val.label }}</span>
                <span class="complexity-val mono" :style="{ color: val.color }">{{ val.value }}</span>
              </div>
            </div>
          </section>
        </main>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import BarsVisualizer from '../components/BarsVisualizer.vue'
import TileVisualizer from '../components/TileVisualizer.vue'
import ImagePicker from '../components/ImagePicker.vue'
import { getAlgorithm } from '../algorithms'
import { useSorter } from '../composables/useSorter'
import { useImageTiles } from '../composables/useImageTiles'

const props = defineProps<{ id: string }>()
const mod = computed(() => getAlgorithm(props.id))

const mode = ref<'bars' | 'image'>('bars')
const imageSrc = ref<string | null>(null)
const rawDelay = ref(120)

const displaySpeed = computed(() => {
  if (rawDelay.value <= 50) return 'Fast'
  if (rawDelay.value <= 200) return 'Medium'
  return 'Slow'
})

const delay = computed(() => rawDelay.value)

const BAR_COUNT = 32
const barValues = ref<number[]>(generateBars())

function generateBars(): number[] {
  return Array.from({ length: BAR_COUNT }, (_, i) => i + 1)
}

function shuffleBars() {
  const arr = [...barValues.value]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  barValues.value = arr
}

const { tiles, loadImage, shuffleTiles, applyOrder } = useImageTiles()

const tileComparing = ref<number[]>([])
const tileSwapping  = ref<number[]>([])
const tileSorted    = ref<number[]>([])

const sorter = useSorter()
const step = computed(() => sorter.currentStep.value)

const progressPct = computed(() => {
  const total = sorter.totalSteps.value.length
  return total ? (sorter.stepIndex.value / total) * 100 : 0
})

const canSort = computed(() => {
  if (sorter.isDone.value) return true
  if (mode.value === 'image' && (!imageSrc.value || tiles.value.length === 0)) return false
  return true
})

const complexityRows = computed(() => {
  if (!mod.value) return []
  const c = mod.value.meta.complexity
  return [
    { label: 'Best case',    value: c.best,    color: 'var(--green)' },
    { label: 'Average case', value: c.average, color: 'var(--yellow)' },
    { label: 'Worst case',   value: c.worst,   color: 'var(--red)' },
  ]
})

function shuffle() {
  sorter.reset()
  tileComparing.value = []
  tileSwapping.value = []
  tileSorted.value = []
  if (mode.value === 'bars') {
    shuffleBars()
  } else {
    shuffleTiles()
  }
}

async function onImageSelect(src: string) {
  imageSrc.value = src
  sorter.reset()
  await loadImage(src)
}

function toggleSort() {
  if (!mod.value) return

  if (sorter.isDone.value) {
    sorter.reset()
    tileComparing.value = []
    tileSwapping.value = []
    tileSorted.value = []
    barValues.value = generateBars()
    return
  }

  if (sorter.isRunning.value) {
    sorter.pause()
    return
  }

  if (sorter.stepIndex.value === 0) {
    if (mode.value === 'bars') {
      sorter.prepare(mod.value.sort, [...barValues.value])
    } else {
      const posToCorrect = new Array(tiles.value.length)
      tiles.value.forEach((t) => { posToCorrect[t.currentIndex] = t.correctIndex })
      sorter.prepare(mod.value.sort, posToCorrect)
    }
  }

  sorter.play((s) => {
    if (mode.value === 'bars') {
      barValues.value       = s.array
    } else {
      applyOrder(s.array)
      tileComparing.value = [...s.comparing]
      tileSwapping.value = [...s.swapping]
      tileSorted.value = [...s.sorted]
    }
  }, delay.value)
}

onUnmounted(() => sorter.pause())
</script>

<style scoped>
.algo-view { min-height: 80vh; }

.not-found {
  padding: 80px 40px;
  text-align: center;
  color: var(--subtext0);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 40px;
  border-bottom: 1px solid var(--surface0);
  background: var(--mantle);
  flex-wrap: wrap;
  gap: 12px;
}

.back-link {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--subtext0);
  font-size: 0.9rem;
  text-decoration: none;
  transition: var(--transition);
}
.back-link:hover { color: var(--mauve); }

.nav-badges { display: flex; gap: 8px; flex-wrap: wrap; }

.page-layout {
  display: grid;
  grid-template-columns: 420px 1fr;
  gap: 0;
  min-height: calc(100vh - 140px);
}

.viz-panel {
  background: var(--mantle);
  border-right: 1px solid var(--surface0);
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  position: sticky;
  top: 0;
  height: calc(100vh - 61px);
  overflow-y: auto;
}

.mode-toggle {
  display: flex;
  background: var(--surface0);
  border-radius: var(--radius);
  padding: 4px;
  gap: 4px;
}

.mode-btn {
  flex: 1;
  padding: 8px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: var(--subtext0);
  font-family: var(--font-body);
  font-size: 0.85rem;
  cursor: pointer;
  transition: var(--transition);
}

.mode-btn.active {
  background: var(--base);
  color: var(--mauve);
  font-weight: 600;
}

.slide-down-enter-active,
.slide-down-leave-active { transition: all 0.25s ease; }
.slide-down-enter-from,
.slide-down-leave-to { opacity: 0; transform: translateY(-8px); }

.image-picker-wrapper {
  background: var(--base);
  border-radius: var(--radius);
  padding: 16px;
}

.speed-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.speed-label {
  font-size: 0.78rem;
  color: var(--overlay1);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  white-space: nowrap;
}

.speed-slider {
  flex: 1;
  accent-color: var(--mauve);
  cursor: pointer;
}

.speed-value {
  font-size: 0.8rem;
  color: var(--mauve);
  min-width: 48px;
  text-align: right;
}

.viz-area {
  flex: 1;
  min-height: 200px;
  max-height: 360px;
  background: var(--crust);
  border-radius: var(--radius);
  overflow: hidden;
}

.viz-inner {
  width: 100%;
  height: 100%;
}

.viz-inner--image {
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-placeholder {
  color: var(--overlay0);
  font-size: 0.85rem;
  text-align: center;
  padding: 20px;
}

.progress-bar {
  height: 4px;
  background: var(--surface0);
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--mauve);
  border-radius: 2px;
  transition: width 0.1s linear;
}

.controls {
  display: flex;
  gap: 10px;
}

.controls .btn { flex: 1; justify-content: center; }

.done-message {
  text-align: center;
  font-size: 0.85rem;
  color: var(--green);
}

.info-panel {
  padding: 40px 48px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  max-width: 680px;
}

.algo-title-row {
  display: flex;
  align-items: center;
  gap: 20px;
}

.algo-emoji { font-size: 3rem; line-height: 1; }

.algo-name {
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  font-weight: 700;
  color: var(--text);
  line-height: 1.1;
}

.algo-description {
  font-size: 1.05rem;
  color: var(--subtext0);
  line-height: 1.7;
}

.info-section { display: flex; flex-direction: column; gap: 12px; }

.info-section-title {
  font-size: 0.78rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--mauve);
}

.info-text {
  color: var(--subtext1);
  line-height: 1.75;
  font-size: 0.95rem;
}

.complexity-grid {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.complexity-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  background: var(--mantle);
  border-radius: var(--radius);
  border: 1px solid var(--surface0);
}

.complexity-key {
  font-size: 0.85rem;
  color: var(--subtext0);
}

.complexity-val {
  font-size: 0.95rem;
  font-weight: 600;
}

@media (max-width: 900px) {
  .page-layout {
    grid-template-columns: 1fr;
  }

  .viz-panel {
    position: static;
    height: auto;
    border-right: none;
    border-bottom: 1px solid var(--surface0);
  }

  .viz-area { max-height: 280px; }

  .info-panel { padding: 28px 20px; }
  .nav-bar { padding: 14px 20px; }
}

@media (max-width: 500px) {
  .viz-area { max-height: 240px; }
  .algo-name { font-size: 1.6rem; }
}
</style>
