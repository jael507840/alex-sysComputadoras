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

const recentSalesDisplay = computed(() => store.recentSales.map((sale) => ({
  name: sale.productName,
  quantity: sale.quantity,
  time: new Date(sale.timestamp).toLocaleTimeString('es-ES'),
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
        <div class="flex items-center justify-between">
          <p class="text-sm text-slate-400">Productos disponibles</p>
          <div class="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">Stock</div>
        </div>
        <p class="mt-4 text-4xl font-semibold">{{ totalProducts }}</p>
        <p class="mt-2 text-sm text-slate-400">Productos con inventario activo</p>
      </div>

      <div class="rounded-3xl bg-gradient-to-br from-cyan-600 to-sky-700 p-6 text-white shadow-xl">
        <div class="flex items-center justify-between">
          <p class="text-sm text-cyan-100">Producto más vendido</p>
          <div class="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em]">Top</div>
        </div>
        <p class="mt-4 text-2xl font-semibold">{{ bestSeller?.name }}</p>
        <p class="mt-2 text-sm text-cyan-100">{{ bestSeller?.sold }} unidades vendidas</p>
        <p class="mt-3 text-xs uppercase tracking-[0.25em] text-cyan-50/80">Rendimiento destacado</p>
      </div>

      <div class="rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-700 p-6 text-white shadow-xl">
        <div class="flex items-center justify-between">
          <p class="text-sm text-emerald-100">Ingresos totales</p>
          <div class="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em]">Bs</div>
        </div>
        <p class="mt-4 text-4xl font-semibold">Bs. {{ revenue }}</p>
        <p class="mt-2 text-sm text-emerald-100">Estimación basada en ventas registradas</p>
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
        <h2 class="text-xl font-semibold text-slate-900">Ventas recientes</h2>
        <div class="mt-6 space-y-3">
          <div v-if="recentSalesDisplay.length > 0" class="max-h-64 space-y-3 overflow-y-auto">
            <div v-for="(sale, index) in recentSalesDisplay" :key="index" class="rounded-lg bg-slate-50 p-3 text-sm">
              <div class="flex justify-between">
                <span class="font-medium text-slate-900">{{ sale.name }}</span>
                <span class="text-cyan-600 font-semibold">+{{ sale.quantity }}</span>
              </div>
              <p class="text-xs text-slate-500 mt-1">{{ sale.time }}</p>
            </div>
          </div>
          <div v-else class="text-center text-slate-400 py-8">
            <p class="text-sm">No hay ventas registradas aún</p>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 class="text-xl font-semibold text-slate-900 mb-4">Información del sistema</h2>
      <div class="space-y-3 text-slate-600 text-sm">
        <p>✅ El dashboard se actualiza en tiempo real según las transacciones del carrito.</p>
        <p>✅ Cuando se confirma una compra, los contadores de ventas se incrementan automáticamente.</p>
        <p>✅ El producto más vendido se recalcula dinámicamente en base a los datos actualizados.</p>
        <p>✅ Los ingresos totales se actualizan reflejando todas las ventas registradas.</p>
        <p>✅ El historial de ventas recientes muestra las últimas 10 transacciones con timestamp.</p>
      </div>
    </div>
  </section>
</template>
