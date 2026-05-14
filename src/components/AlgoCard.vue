<template>
	<RouterLink :to="`/algorithm/${meta.id}`" class="algo-card">
		<div class="card-header">
			<div class="card-badges">
				<span :class="`badge badge-${meta.category}`">{{ categoryLabel }}</span>
				<span :class="`badge badge-${meta.tag}`">{{ meta.tag }}</span>
			</div>
		</div>

		<h3 class="card-name">{{ meta.name }}</h3>
		<p class="card-desc">{{ meta.description }}</p>

		<div class="card-complexity">
			<span class="complexity-label">avg</span>
			<span class="complexity-value mono">{{ meta.complexity.average }}</span>
		</div>

		<div class="card-arrow">→</div>
	</RouterLink>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import type { AlgorithmMeta } from '../types'

const props = defineProps<{ meta: AlgorithmMeta }>()

const categoryLabel = computed(() => {
	const map: Record<string, string> = {
		'fast':   'Fast',
		'medium': 'Medium',
		'slow':   'Slow',
	}
	return map[props.meta.category] ?? props.meta.category
})
</script>

<style scoped>
.algo-card {
	display: flex;
	flex-direction: column;
	gap: 10px;
	padding: 22px;
	background: var(--card-bg);
	border: 1px solid var(--card-border);
	border-radius: var(--radius-lg);
	text-decoration: none;
	color: var(--text);
	position: relative;
	overflow: hidden;
	transition: var(--transition);
	cursor: pointer;
}

.algo-card::before {
	content: '';
	position: absolute;
	inset: 0;
	background: linear-gradient(135deg, var(--accent-glow) 0%, transparent 60%);
	opacity: 0;
	transition: opacity 0.3s ease;
}

.algo-card:hover {
	border-color: var(--mauve-dark);
	transform: translateY(-4px);
	box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px var(--mauve-dark);
	color: var(--text);
}

.algo-card:hover::before { opacity: 1; }

.card-header {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	gap: 8px;
}

.card-emoji {
	font-size: 2rem;
	line-height: 1;
}

.card-badges {
	display: flex;
	flex-wrap: wrap;
	gap: 5px;
	justify-content: flex-end;
}

.card-name {
	font-size: 1.15rem;
	font-weight: 600;
	color: var(--text);
	line-height: 1.2;
}

.card-desc {
	font-size: 0.85rem;
	color: var(--subtext0);
	line-height: 1.5;
	flex: 1;
}

.card-complexity {
	display: flex;
	align-items: center;
	gap: 8px;
	margin-top: auto;
}

.complexity-label {
	font-size: 0.72rem;
	text-transform: uppercase;
	letter-spacing: 0.08em;
	color: var(--overlay0);
}

.complexity-value {
	font-size: 0.85rem;
	color: var(--mauve);
	font-weight: 600;
}

.card-arrow {
	position: absolute;
	bottom: 20px;
	right: 20px;
	color: var(--surface1);
	font-size: 1.1rem;
	transition: var(--transition);
}

.algo-card:hover .card-arrow {
	color: var(--mauve);
	transform: translateX(4px);
}
</style>
