<template>
	<div class="image-picker">
		<h4 class="picker-label">Choose an image</h4>

		<div class="preset-grid">
			<button
				v-for="preset in presets"
				:key="preset.id"
				class="preset-btn"
				:class="{ active: selected === preset.id }"
				@click="selectPreset(preset)"
			>
				<img :src="preset.thumb" :alt="preset.label" />
				<span>{{ preset.label }}</span>
			</button>
		</div>

		<div class="divider"><span>or</span></div>

		<label class="upload-area" :class="{ dragging }">
			<input
				type="file"
				accept="image/*"
				class="sr-only"
				@change="onFileChange"
			/>
			<span class="upload-icon">📁</span>
			<span class="upload-text">Drop / click to upload</span>
		</label>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Preset {
	id: string
	label: string
	thumb: string
	src: string
}

const presets: Preset[] = [
	{ id: 'mountain', label: 'Mountains', thumb: 'https://picsum.photos/seed/mountain/120/120', src: 'https://picsum.photos/seed/mountain/512/512' },
	{ id: 'city',     label: 'Cityscape', thumb: 'https://picsum.photos/seed/city42/120/120',   src: 'https://picsum.photos/seed/city42/512/512' },
	{ id: 'forest',   label: 'Forest',    thumb: 'https://picsum.photos/seed/forest7/120/120',  src: 'https://picsum.photos/seed/forest7/512/512' },
	{ id: 'ocean',    label: 'Ocean',     thumb: 'https://picsum.photos/seed/ocean99/120/120',  src: 'https://picsum.photos/seed/ocean99/512/512' },
]

const emit = defineEmits<{ (e: 'select', src: string): void }>()

const selected = ref<string | null>(null)
const dragging = ref(false)

function selectPreset(preset: Preset) {
	selected.value = preset.id
	emit('select', preset.src)
}

function onFileChange(ev: Event) {
	const file = (ev.target as HTMLInputElement).files?.[0]
	if (!file) return
	const reader = new FileReader()
	reader.onload = (e) => {
		selected.value = 'upload'
		emit('select', e.target!.result as string)
	}
	reader.readAsDataURL(file)
}
</script>

<style scoped>
.image-picker {
	display: flex;
	flex-direction: column;
	gap: 16px;
}

.picker-label {
	font-size: 0.85rem;
	font-weight: 600;
	color: var(--subtext0);
	text-transform: uppercase;
	letter-spacing: 0.06em;
}

.preset-grid {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 8px;
}

.preset-btn {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 4px;
	padding: 6px;
	background: var(--surface0);
	border: 2px solid transparent;
	border-radius: var(--radius);
	cursor: pointer;
	color: var(--subtext0);
	font-size: 0.72rem;
	transition: var(--transition);
}

.preset-btn img {
	width: 100%;
	aspect-ratio: 1;
	object-fit: cover;
	border-radius: 6px;
}

.preset-btn:hover { border-color: var(--mauve-dark); color: var(--text); }
.preset-btn.active { border-color: var(--mauve); color: var(--mauve); }

.divider {
	display: flex;
	align-items: center;
	gap: 10px;
	color: var(--overlay0);
	font-size: 0.8rem;
}
.divider::before, .divider::after {
	content: '';
	flex: 1;
	height: 1px;
	background: var(--surface1);
}

.upload-area {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 6px;
	padding: 24px;
	border: 2px dashed var(--surface1);
	border-radius: var(--radius);
	cursor: pointer;
	color: var(--overlay1);
	font-size: 0.85rem;
	transition: var(--transition);
}

.upload-area:hover, .upload-area.dragging {
	border-color: var(--mauve-dark);
	background: rgba(203,166,247,0.05);
	color: var(--mauve);
}

.upload-icon { font-size: 1.5rem; }

.sr-only {
	position: absolute;
	width: 1px; height: 1px;
	overflow: hidden;
	clip: rect(0,0,0,0);
	white-space: nowrap;
}
</style>
