<template>
	<div class="tile-grid" :style="gridStyle">
		<div
			v-for="tile in sortedTiles"
			:key="tile.correctIndex"
			class="tile"
			:class="tileClass(tile.currentIndex)"
			:style="tileStyle(tile)"
		>
			<img :src="tile.dataUrl" :alt="`tile ${tile.correctIndex}`" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Tile } from '../types'
import { GRID_SIZE } from '../composables/useImageTiles'

const props = defineProps<{
	tiles: Tile[]
	comparing: number[]
	swapping: number[]
	sorted: number[]
}>()

const sortedTiles = computed(() => [...props.tiles].sort((a, b) => a.correctIndex - b.correctIndex))

const gridStyle = computed(() => ({
	gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
	gridTemplateRows:    `repeat(${GRID_SIZE}, 1fr)`,
}))

function tileStyle(tile: Tile): Record<string, string | number> {
	const row = Math.floor(tile.currentIndex / GRID_SIZE)
	const col = tile.currentIndex % GRID_SIZE
	return {
		gridRow:    `${row + 1}`,
		gridColumn: `${col + 1}`,
	}
}

function tileClass(pos: number): string {
	if (props.swapping.includes(pos)) return 'tile--swap'
	if (props.comparing.includes(pos)) return 'tile--compare'
	if (props.sorted.includes(pos)) return 'tile--sorted'
	return ''
}
</script>

<style scoped>
.tile-grid {
	display: grid;
	width: 100%;
	aspect-ratio: 1;
	background: var(--crust);
	border-radius: var(--radius);
	overflow: hidden;
	gap: 2px;
}

.tile {
	overflow: hidden;
	position: relative;
	transition: box-shadow 0.15s ease;
}

.tile img {
	width: 100%;
	height: 100%;
	object-fit: cover;
	display: block;
}

.tile--compare {
	box-shadow: inset 0 0 0 2px var(--blue);
	z-index: 2;
}
.tile--swap {
	box-shadow: inset 0 0 0 3px var(--mauve);
	z-index: 3;
}
.tile--sorted {
	box-shadow: inset 0 0 0 2px var(--green);
}
</style>
