<script setup lang="ts">
import { computed } from 'vue'
import { useShopStore } from '@/stores/shop'

const store = useShopStore()

const totalProducts = computed(() => store.totalProducts)
const bestSeller = computed(() => store.bestSeller)
const revenue = computed(() => store.totalRevenue)

const salesData = computed(() => store.products.map((product) => ({
  name: product.name,
  sold: product.sold,
})))
</script>

<template>
  <section class="mx-auto max-w-7xl px-6 py-16 lg:px-8">
    <div class="mb-8">
      <p class="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-500">Panel de administración</p>
      <h1 class="text-4xl font-bold text-slate-900">Dashboard en tiempo real</h1>
    </div>

    <div class="grid gap-6 md:grid-cols-3">
      <div class="rounded-3xl bg-slate-900 p-6 text-white shadow-xl">
        <p class="text-sm text-slate-400">Productos en catálogo</p>
        <p class="mt-3 text-4xl font-semibold">{{ totalProducts }}</p>
      </div>
      <div class="rounded-3xl bg-cyan-600 p-6 text-white shadow-xl">
        <p class="text-sm text-cyan-100">Producto más vendido</p>
        <p class="mt-3 text-2xl font-semibold">{{ bestSeller?.name }}</p>
        <p class="text-sm text-cyan-100">{{ bestSeller?.sold }} unidades</p>
      </div>
      <div class="rounded-3xl bg-emerald-600 p-6 text-white shadow-xl">
        <p class="text-sm text-emerald-100">Ingresos totales</p>
        <p class="mt-3 text-4xl font-semibold">Bs. {{ revenue }}</p>
      </div>
    </div>

    <div class="mt-8 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
      <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 class="text-xl font-semibold text-slate-900">Ventas por producto</h2>
        <div class="mt-6 space-y-4">
          <div v-for="item in salesData" :key="item.name" class="space-y-2">
            <div class="flex justify-between text-sm text-slate-600">
              <span>{{ item.name }}</span>
              <span>{{ item.sold }} vendidas</span>
            </div>
            <div class="h-3 rounded-full bg-slate-100">
              <div class="h-3 rounded-full bg-cyan-500" :style="{ width: `${Math.min(item.sold * 2, 100)}%` }"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 class="text-xl font-semibold text-slate-900">Resumen rápido</h2>
        <div class="mt-6 space-y-4 text-slate-600">
          <p>El catálogo se actualiza en tiempo real según el estado global del carrito y los productos.</p>
          <p>El producto más vendido se calcula automáticamente a partir de las ventas simuladas registradas en cada artículo.</p>
          <p>Los ingresos totales representan la suma del precio por cantidad vendida de todos los productos.</p>
        </div>
      </div>
    </div>
  </section>
</template>
