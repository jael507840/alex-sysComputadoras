<script setup lang="ts">
import { computed } from 'vue'
import type { Product } from '@/stores/shop'

const props = defineProps<{ product: Product | null }>()
const emit = defineEmits<{ (e: 'close'): void; (e: 'buy', product: Product): void }>()

const isVisible = computed(() => !!props.product)
</script>

<template>
  <div v-if="isVisible" class="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/70 px-4">
    <div class="w-full max-w-4xl rounded-[2rem] bg-white p-6 shadow-2xl lg:p-8">
      <div class="flex justify-end">
        <button class="rounded-full bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700" @click="emit('close')">✕</button>
      </div>
      <div v-if="props.product" class="mt-4 grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <img :src="props.product.image" :alt="props.product.name" class="h-80 w-full rounded-[1.5rem] object-cover" />
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-500">Vista rápida</p>
          <h2 class="mt-2 text-3xl font-bold text-slate-900">{{ props.product.name }}</h2>
          <p class="mt-4 text-slate-600">{{ props.product.description }}</p>
          <div class="mt-6 flex items-center justify-between rounded-2xl bg-slate-100 p-4">
            <div>
              <p class="text-sm text-slate-500">Precio</p>
              <p class="text-2xl font-bold text-cyan-600">$ {{ props.product.price }}</p>
            </div>
            <div class="text-right">
              <p class="text-sm text-slate-500">Stock</p>
              <p class="font-semibold text-slate-900">{{ props.product.stock }} disponibles</p>
            </div>
          </div>
          <div class="mt-6 flex flex-wrap gap-3">
            <button class="rounded-full bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-cyan-600" @click="emit('buy', props.product)">Comprar ahora</button>
            <button class="rounded-full border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:border-cyan-500 hover:text-cyan-600" @click="emit('close')">Seguir explorando</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
