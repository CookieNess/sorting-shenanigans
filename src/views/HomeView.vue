<template>
  <div class="home">
    <!-- Hero -->
    <section class="hero">
      <div class="hero-inner">
        <h1 class="hero-title">
          Sorting Algorithms<br />
          <span class="hero-sub">from <span class="accent">serious</span> to <span style="color:var(--yellow)">not so serious</span></span>
        </h1>
        <p class="hero-desc">
          Pick an algorithm, choose your visualization (bars or image), and watch it work.<br />
        </p>
      </div>
      <div class="hero-stats">
        <div class="stat">
          <span class="stat-value">{{ algorithms.length }}</span>
          <span class="stat-label">algorithms</span>
        </div>
        <div class="stat-divider" />
        <div class="stat">
          <span class="stat-value">{{ seriousCount }}</span>
          <span class="stat-label">serious</span>
        </div>
        <div class="stat-divider" />
        <div class="stat">
          <span class="stat-value">{{ jokeCount }}</span>
          <span class="stat-label">jokes</span>
        </div>
      </div>
    </section>

    <!-- Filters -->
    <section class="filters-bar">
      <div class="filter-group">
        <span class="filter-label">Tag</span>
        <button
          v-for="t in tagFilters"
          :key="t.value"
          class="filter-btn"
          :class="{ active: activeTag === t.value }"
          @click="activeTag = t.value"
        >{{ t.label }}</button>
      </div>
      <div class="filter-group">
        <span class="filter-label">Type</span>
        <button
          v-for="c in categoryFilters"
          :key="c.value"
          class="filter-btn"
          :class="{ active: activeCategory === c.value }"
          @click="activeCategory = c.value"
        >{{ c.label }}</button>
      </div>
    </section>

    <!-- Algorithm grid — grouped by category -->
    <section class="algo-sections">
      <div v-for="group in filteredGroups" :key="group.category" class="algo-group">
        <div class="group-header">
          <h2 class="group-title">{{ group.label }}</h2>
          <span class="group-count">{{ group.algos.length }}</span>
        </div>
        <div class="algo-grid">
          <AlgoCard v-for="mod in group.algos" :key="mod.meta.id" :meta="mod.meta" />
        </div>
      </div>

      <div v-if="filteredGroups.length === 0" class="empty-state">
        <span>No algorithms match your filters — yet 👀</span>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import AlgoCard from '../components/AlgoCard.vue'
import { algorithms } from '../algorithms'
import type { AlgorithmCategory, AlgorithmTag } from '../types'

const activeTag      = ref<AlgorithmTag | 'all'>('all')
const activeCategory = ref<AlgorithmCategory | 'all'>('all')

const tagFilters = [
  { value: 'all',     label: 'All' },
  { value: 'serious', label: 'Serious' },
  { value: 'joke',    label: 'Joke' },
] as const

const categoryFilters = [
  { value: 'all',    label: 'All' },
  { value: 'fast',   label: 'Fast' },
  { value: 'medium', label: 'Medium' },
  { value: 'slow',   label: 'Slow' },
] as const

const categoryMeta: Record<AlgorithmCategory, { label: string; order: number }> = {
  'fast':   { label: 'Fast Algorithms',   order: 0 },
  'medium': { label: 'Medium Algorithms', order: 1 },
  'slow':   { label: 'Slow Algorithms',   order: 2 },
}

const filtered = computed(() =>
  algorithms.filter((mod) => {
    const tagOk = activeTag.value === 'all' || mod.meta.tag === activeTag.value
    const catOk = activeCategory.value === 'all' || mod.meta.category === activeCategory.value
    return tagOk && catOk
  }),
)

const filteredGroups = computed(() => {
  const groups: Record<string, { category: AlgorithmCategory; label: string; order: number; algos: typeof algorithms }> = {}
  for (const mod of filtered.value) {
    const cat = mod.meta.category
    if (!groups[cat]) groups[cat] = { category: cat, ...categoryMeta[cat], algos: [] }
    groups[cat].algos.push(mod)
  }
  return Object.values(groups).sort((a, b) => a.order - b.order)
})

const seriousCount = computed(() => algorithms.filter((a) => a.meta.tag === 'serious').length)
const jokeCount    = computed(() => algorithms.filter((a) => a.meta.tag === 'joke').length)
</script>

<style scoped>
.home { padding-bottom: 80px; }

.hero {
  padding: 56px 40px 40px;
  background: linear-gradient(180deg, var(--mantle) 0%, var(--crust) 100%);
  border-bottom: 1px solid var(--surface0);
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 32px;
  flex-wrap: wrap;
}

.hero-inner { flex: 1; min-width: 260px; }

.hero-title {
  font-size: clamp(1.8rem, 4vw, 3rem);
  font-weight: 700;
  line-height: 1.15;
  color: var(--text);
  margin-bottom: 14px;
}

.hero-sub {
  font-size: 0.65em;
  font-weight: 400;
  color: var(--subtext0);
}

.hero-desc {
  color: var(--subtext0);
  font-size: 0.95rem;
  line-height: 1.7;
  max-width: 480px;
}

.hero-stats {
  display: flex;
  align-items: center;
  gap: 24px;
  flex-shrink: 0;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.stat-value {
  font-family: var(--font-mono);
  font-size: 2rem;
  font-weight: 600;
  color: var(--mauve);
  line-height: 1;
}

.stat-label {
  font-size: 0.72rem;
  color: var(--overlay1);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: var(--surface1);
}

.filters-bar {
  padding: 20px 40px;
  border-bottom: 1px solid var(--surface0);
  background: var(--mantle);
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.filter-label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--overlay0);
  margin-right: 4px;
}

.filter-btn {
  padding: 5px 14px;
  border-radius: 99px;
  border: 1px solid var(--surface1);
  background: transparent;
  color: var(--subtext0);
  font-family: var(--font-body);
  font-size: 0.8rem;
  cursor: pointer;
  transition: var(--transition);
}

.filter-btn:hover { border-color: var(--mauve-dark); color: var(--text); }
.filter-btn.active {
  background: var(--mauve);
  border-color: var(--mauve);
  color: var(--crust);
  font-weight: 600;
}

.algo-sections {
  padding: 40px 40px 0;
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.group-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.group-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--subtext1);
  text-transform: uppercase;
  letter-spacing: 0.07em;
}

.group-count {
  padding: 2px 10px;
  background: var(--surface0);
  border-radius: 99px;
  font-size: 0.75rem;
  font-family: var(--font-mono);
  color: var(--overlay1);
}

.algo-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.empty-state {
  padding: 80px 20px;
  text-align: center;
  color: var(--overlay0);
  font-size: 1rem;
}

@media (max-width: 1100px) {
  .algo-grid { grid-template-columns: repeat(3, 1fr); }
}

@media (max-width: 800px) {
  .hero { padding: 36px 20px 28px; }
  .filters-bar { padding: 16px 20px; }
  .algo-sections { padding: 28px 20px 0; }
  .algo-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 500px) {
  .hero-stats { display: none; }
  .algo-grid { grid-template-columns: 1fr; }
}
</style>
