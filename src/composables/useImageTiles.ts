import { ref, computed } from 'vue'
import type { Tile } from '../types'

export const GRID_SIZE = 5

export function useImageTiles() {
  const tiles = ref<Tile[]>([])
  const originalImage = ref<string | null>(null)
  const tileSize = ref(0)

  async function splitImage(src: string): Promise<Tile[]> {
    return new Promise((resolve) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        const side = Math.min(img.width, img.height)
        const step = Math.floor(side / GRID_SIZE)
        tileSize.value = step
        const result: Tile[] = []

        for (let row = 0; row < GRID_SIZE; row++) {
          for (let col = 0; col < GRID_SIZE; col++) {
            const canvas = document.createElement('canvas')
            canvas.width = step
            canvas.height = step
            const ctx = canvas.getContext('2d')!
            // Centre-crop the source image
            const sx = (img.width - side) / 2 + col * step
            const sy = (img.height - side) / 2 + row * step
            ctx.drawImage(img, sx, sy, step, step, 0, 0, step, step)
            const idx = row * GRID_SIZE + col
            result.push({ correctIndex: idx, currentIndex: idx, dataUrl: canvas.toDataURL() })
          }
        }
        resolve(result)
      }
      img.src = src
    })
  }

  async function loadImage(src: string) {
    originalImage.value = src
    const t = await splitImage(src)
    tiles.value = t
  }

  function shuffleTiles() {
    const indices = tiles.value.map((_, i) => i)
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[indices[i], indices[j]] = [indices[j], indices[i]]
    }
    tiles.value = tiles.value.map((tile, i) => ({ ...tile, currentIndex: indices[i] }))
  }

  function applyOrder(order: number[]) {
    const newTiles = [...tiles.value]
    order.forEach((correctIdx, position) => {
      const tile = newTiles.find((t) => t.correctIndex === correctIdx)
      if (tile) tile.currentIndex = position
    })
    tiles.value = [...newTiles]
  }

  const isSorted = computed(() =>
    tiles.value.every((t) => t.correctIndex === t.currentIndex),
  )

  return { tiles, originalImage, tileSize, loadImage, shuffleTiles, applyOrder, isSorted }
}
