<template>
	<div class="bars-container" ref="containerRef">
		<div
			v-for="(val, idx) in values"
			:key="idx"
			class="bar"
			:class="barClass(idx)"
			:style="barStyle(val)"
		/>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
	values: number[]
	comparing: number[]
	swapping: number[]
	sorted: number[]
	panic?: number[]
}>()

const maxVal = computed(() => Math.max(...props.values, 1))

function barClass(idx: number): string {
	if (props.swapping.includes(idx)) return 'bar--swap'
	if (props.comparing.includes(idx)) return 'bar--compare'
	if (props.sorted.includes(idx)) return 'bar--sorted'
	if (props.panic?.includes(idx)) return 'bar--panic'
	return ''
}

function barStyle(val: number): Record<string, string> {
	const pct = (val / maxVal.value) * 100
	return { height: `${pct}%` }
}
</script>

<style scoped>
.bars-container {
	display: flex;
	align-items: flex-end;
	gap: 2px;
	width: 100%;
	height: 100%;
	padding: 8px;
	background: var(--crust);
	border-radius: var(--radius);
}

.bar {
	flex: 1;
	background: var(--surface1);
	border-radius: 3px 3px 0 0;
	min-width: 2px;
}

.bar--compare { background: var(--blue); }
.bar--swap    { background: var(--mauve); box-shadow: 0 0 8px var(--accent-glow); }
.bar--sorted  { background: var(--green); }
.bar--panic { background: var(--red); box-shadow: 0 0 8px rgba(243, 139, 168, 0.5); }
</style>
