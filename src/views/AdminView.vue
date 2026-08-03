<script setup lang="ts">
import { computed, watch, ref } from 'vue'
import { useShopStore } from '@/stores/shop'

const store = useShopStore()
const updateTrigger = ref(0)

// Computed properties con dependencias directas del store
const totalProducts = computed(() => {
  updateTrigger.value // Referenciar el trigger para forzar actualización
  return store.products.filter((p) => p.stock > 0).length
})

const bestSeller = computed(() => {
  updateTrigger.value // Referenciar el trigger
  const sorted = [...store.products].sort((a, b) => b.sold - a.sold)
  return sorted[0] || null
})

const revenue = computed(() => {
  updateTrigger.value // Referenciar el trigger
  return store.products.reduce((sum, product) => sum + product.price * product.sold, 0)
})

const salesData = computed(() => {
  updateTrigger.value // Referenciar el trigger
  return store.products.map((product) => ({
    name: product.name,
    sold: product.sold,
    stock: product.stock,
  }))
})

const recentSalesDisplay = computed(() => {
  updateTrigger.value // Referenciar el trigger
  return store.recentSales.map((sale) => ({
    name: sale.productName,
    quantity: sale.quantity,
    time: new Date(sale.timestamp).toLocaleTimeString('es-ES'),
  }))
})

// Watcher para monitorear cambios en el store y forzar actualización
watch(
  () => store.products,
  () => {
    updateTrigger.value++
  },
  { deep: true }
)

watch(
  () => store.recentSales,
  () => {
    updateTrigger.value++
  },
  { deep: true }
)
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
        <div class="mt-4 pt-4 border-t border-slate-700">
          <p class="text-xs text-slate-500">Stock total: <span class="text-emerald-400 font-semibold">{{ store.products.reduce((sum, p) => sum + p.stock, 0) }}</span></p>
        </div>
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
              <span class="font-medium">{{ item.name }}</span>
              <div class="flex gap-4 text-xs">
                <span class="text-cyan-600 font-semibold">{{ item.sold }} vendidas</span>
                <span class="text-emerald-600 font-semibold">{{ item.stock }} en stock</span>
              </div>
            </div>
            <div class="h-3 rounded-full bg-slate-100 overflow-hidden">
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
