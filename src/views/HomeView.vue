<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useShopStore, type Product } from '@/stores/shop'
import ProductModal from '@/components/ProductModal.vue'

const store = useShopStore()
const router = useRouter()
const selectedProduct = ref<Product | null>(null)
const animatedProductId = ref<number | null>(null)

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

const openProduct = (product: Product) => {
  selectedProduct.value = product
}
</script>

<template>
  <section class="bg-slate-950 text-white">
    <div class="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
      <div class="space-y-6">
        <span class="inline-flex rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300">Alex@sys • Tecnología confiable para tu empresa</span>
        <h1 class="text-4xl font-bold tracking-tight sm:text-5xl">Equipos, accesorios y soluciones de red para trabajar mejor</h1>
        <p class="max-w-2xl text-lg text-slate-300">Descubre laptops, PCs de escritorio, accesorios gamer, discos de almacenamiento, mouse, teclados y más, con asesoría especializada y envíos rápidos.</p>
        <div class="flex flex-wrap gap-4">
          <router-link to="/catalogo" class="rounded-full bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400">Comprar ahora</router-link>
          <router-link to="/nosotros" class="rounded-full border border-slate-700 px-6 py-3 font-semibold text-white transition hover:border-cyan-400 hover:text-cyan-300">Conocer más</router-link>
        </div>
        <div class="grid gap-4 pt-4 sm:grid-cols-3">
          <div class="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <p class="text-2xl font-bold text-white">+100</p>
            <p class="text-sm text-slate-400">productos disponibles</p>
          </div>
          <div class="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <p class="text-2xl font-bold text-white">24h</p>
            <p class="text-sm text-slate-400">entrega rápida</p>
          </div>
          <div class="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <p class="text-2xl font-bold text-white">4.9</p>
            <p class="text-sm text-slate-400">valoración clientes</p>
          </div>
        </div>
      </div>

      <div class="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-6 shadow-2xl">
        <div class="flex items-center justify-between">
          <h2 class="text-2xl font-semibold">Productos destacados</h2>
          <router-link to="/catalogo" class="text-sm font-semibold text-cyan-400">Ver todo</router-link>
        </div>
        <div class="mt-6 space-y-4">
          <div v-for="product in store.featuredProducts" :key="product.id" class="flex items-center justify-between rounded-2xl bg-slate-800/70 p-4">
            <div>
              <p class="font-semibold">{{ product.name }}</p>
              <p class="text-sm text-slate-400">{{ product.category }}</p>
              <p class="mt-1 text-sm font-semibold text-cyan-400">$ {{ product.price }}</p>
            </div>
            <div class="flex gap-2">
              <button class="rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400" @click="buyNow(product)">Comprar ahora</button>
              <button class="rounded-full border border-slate-600 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300" @click="openProduct(product)">Ver detalle</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="mx-auto max-w-7xl px-6 py-16 lg:px-8">
    <div class="grid gap-6 md:grid-cols-3">
      <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 class="text-xl font-semibold text-slate-900">Asesoría técnica</h3>
        <p class="mt-3 text-slate-600">Te ayudamos a elegir la mejor opción según tus necesidades.</p>
      </div>
      <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 class="text-xl font-semibold text-slate-900">Marcas reconocidas</h3>
        <p class="mt-3 text-slate-600">Trabajamos con equipos y accesorios de alto rendimiento.</p>
      </div>
      <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 class="text-xl font-semibold text-slate-900">Soporte y garantía</h3>
        <p class="mt-3 text-slate-600">Tu compra cuenta con respaldo y soporte postventa.</p>
      </div>
    </div>

    <div class="mt-12 rounded-[2rem] bg-gradient-to-r from-cyan-600 to-slate-900 p-8 text-white shadow-xl">
      <div class="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200">Ofertas del día</p>
          <h3 class="mt-2 text-3xl font-semibold">Ahorra hasta un 15% en accesorios gamer</h3>
          <p class="mt-3 max-w-2xl text-slate-200">Combos especiales, mouse, teclados y auriculares con envío gratis hoy.</p>
        </div>
        <router-link to="/catalogo" class="rounded-full bg-white px-5 py-3 font-semibold text-slate-900 transition hover:bg-slate-100">Ver ofertas</router-link>
      </div>
    </div>

    <div class="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
      <div class="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <h3 class="text-2xl font-semibold text-slate-900">Contáctanos</h3>
        <p class="mt-3 text-slate-600">¿Necesitas asesoría para tu próxima compra? Escríbenos y te responderemos pronto.</p>
        <form class="mt-6 space-y-4">
          <input class="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-cyan-500" placeholder="Tu nombre" />
          <input class="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-cyan-500" placeholder="Tu correo" />
          <textarea class="min-h-28 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-cyan-500" placeholder="Escribe tu mensaje"></textarea>
          <button class="rounded-full bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-cyan-600">Enviar mensaje</button>
        </form>
      </div>

      <div class="rounded-[2rem] border border-slate-200 bg-slate-900 p-8 text-white shadow-sm">
        <h3 class="text-2xl font-semibold">¿Qué incluye tu compra?</h3>
        <ul class="mt-6 space-y-4 text-slate-300">
          <li>• Garantía y soporte postventa.</li>
          <li>• Envío rápido y seguimiento del pedido.</li>
          <li>• Asesoría para elegir la mejor solución.</li>
          <li>• Productos de marcas reconocidas y rendimiento probado.</li>
        </ul>
      </div>
    </div>
  </section>

  <ProductModal :product="selectedProduct" @close="selectedProduct = null" @buy="buyNow" />
</template>
