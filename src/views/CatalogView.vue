<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useShopStore, type Product } from '@/stores/shop'
import ProductModal from '@/components/ProductModal.vue'

const store = useShopStore()
const router = useRouter()
const categories = ['computadoras', 'accesorios'] as const
const selectedCategory = ref<'all' | 'computadoras' | 'accesorios'>('all')
const searchQuery = ref('')
const selectedProduct = ref<Product | null>(null)
const animatedProductId = ref<number | null>(null)

const filteredProducts = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  return store.products.filter((product) => {
    const matchesCategory = selectedCategory.value === 'all' || product.category === selectedCategory.value
    const matchesSearch = !query || product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query)
    return matchesCategory && matchesSearch
  })
})

const groupedProducts = computed(() => {
  return categories.reduce((acc, category) => {
    acc[category] = filteredProducts.value.filter((product) => product.category === category)
    return acc
  }, {} as Record<string, Product[]>)
})

const triggerCartAnimation = (product: Product) => {
  store.addToCart(product)
  animatedProductId.value = product.id
  setTimeout(() => {
    animatedProductId.value = null
  }, 500)
}

const buyNow = (product: Product) => {
  triggerCartAnimation(product)
  router.push('/carrito')
}

const addToCartAnimated = (product: Product) => {
  triggerCartAnimation(product)
}

const openProduct = (product: Product) => {
  selectedProduct.value = product
}
</script>

<template>
  <section class="mx-auto max-w-7xl px-6 py-16 lg:px-8">
    <div class="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p class="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-500">Catálogo</p>
        <h1 class="text-4xl font-bold text-slate-900">Explora nuestro inventario</h1>
      </div>
      <p class="max-w-2xl text-slate-600">Encuentra productos ideales para trabajo, estudio y gaming con filtros rápidos y disponibilidad en tiempo real.</p>
    </div>

    <div class="mb-10 rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div class="flex flex-wrap gap-2">
          <button class="rounded-full px-4 py-2 text-sm font-semibold transition" :class="selectedCategory === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'" @click="selectedCategory = 'all'">Todos</button>
          <button v-for="category in categories" :key="category" class="rounded-full px-4 py-2 text-sm font-semibold capitalize transition" :class="selectedCategory === category ? 'bg-cyan-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'" @click="selectedCategory = category">{{ category }}</button>
        </div>
        <label class="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600">
          <span>🔎</span>
          <input v-model="searchQuery" type="text" placeholder="Buscar producto" class="w-full bg-transparent outline-none" />
        </label>
      </div>
    </div>

    <div v-if="filteredProducts.length" class="space-y-10">
      <div v-for="category in categories" :key="category" v-show="groupedProducts[category]?.length" class="mb-8">
        <div class="mb-6 flex items-center justify-between">
          <h2 class="text-2xl font-semibold capitalize text-slate-800">{{ category }}</h2>
          <span class="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">{{ groupedProducts[category]?.length ?? 0 }} productos</span>
        </div>
        <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <article v-for="product in groupedProducts[category]" :key="product.id" class="overflow-hidden rounded-[1.5rem] border border-cyan-300 bg-cyan-50/80 shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:border-cyan-500">
            <img :src="product.image" :alt="product.name" class="h-56 w-full object-cover transition duration-300 hover:scale-105" />
            <div class="space-y-4 p-5">
              <div>
                <div class="flex items-center justify-between gap-2">
                  <h3 class="text-xl font-semibold text-slate-900">{{ product.name }}</h3>
                  <span class="rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-600">{{ product.category }}</span>
                </div>
                <p class="mt-2 text-sm text-slate-600">{{ product.description }}</p>
              </div>
              <router-link :to="`/producto/${product.id}`" class="text-sm font-semibold text-cyan-600 transition hover:text-cyan-700">Ver detalle</router-link>
              <div class="flex items-center justify-between text-sm text-slate-500">
                <span>Stock: {{ product.stock }}</span>
                <span>Vendidos: {{ product.sold }}</span>
              </div>
              <div class="flex items-center justify-between gap-3 pt-2">
                <span class="text-2xl font-bold text-cyan-600">Bs. {{ product.price }}</span>
                <div class="flex gap-2">
                  <button class="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-600" :class="animatedProductId === product.id ? 'animate-pulse' : ''" @click="addToCartAnimated(product)">Agregar</button>
                  <button class="rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400" @click="buyNow(product)">Comprar</button>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>

    <div v-else class="rounded-[2rem] border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-600">
      No se encontraron productos con ese criterio. Prueba con otra búsqueda o categoría.
    </div>
  </section>

  <ProductModal :product="selectedProduct" @close="selectedProduct = null" @buy="buyNow" />
</template>
