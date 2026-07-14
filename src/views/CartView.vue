<script setup lang="ts">
import { computed, ref } from 'vue'
import { useShopStore } from '@/stores/shop'

const store = useShopStore()
const total = computed(() => store.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0))
const showModal = ref(false)

const checkout = () => {
  store.clearCart()
  showModal.value = true
}
</script>

<template>
  <section class="mx-auto max-w-7xl px-6 py-16 lg:px-8">
    <div class="mb-8">
      <p class="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-500">Carrito</p>
      <h1 class="text-4xl font-bold text-slate-900">Revisa tus productos</h1>
    </div>

    <div v-if="store.cart.length" class="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <div class="space-y-4">
        <div v-for="item in store.cart" :key="item.product.id" class="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md sm:flex-row sm:items-center sm:justify-between">
          <div class="flex items-center gap-4">
            <img :src="item.product.image" :alt="item.product.name" class="h-20 w-20 rounded-2xl object-cover" />
            <div>
              <h3 class="font-semibold text-slate-900">{{ item.product.name }}</h3>
              <p class="text-sm text-slate-500">Bs. {{ item.product.price }} c/u</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <input type="number" min="1" class="w-20 rounded-xl border border-slate-300 px-3 py-2" :value="item.quantity" @change="(event) => store.updateQuantity(item.product.id, Number((event.target as HTMLInputElement).value))" />
            <button class="rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-600" @click="store.removeFromCart(item.product.id)">Eliminar</button>
          </div>
        </div>
      </div>

      <aside class="rounded-3xl bg-slate-900 p-8 text-white shadow-xl">
        <h2 class="text-2xl font-semibold">Resumen</h2>
        <div class="mt-6 space-y-3 text-slate-300">
          <div class="flex justify-between"><span>Productos</span><span>{{ store.totalItems }}</span></div>
          <div class="flex justify-between"><span>Subtotal</span><span>Bs. {{ total }}</span></div>
          <div class="flex justify-between"><span>Envío</span><span>Gratis</span></div>
        </div>
        <div class="mt-6 border-t border-slate-700 pt-4">
          <div class="flex justify-between text-lg font-semibold"><span>Total</span><span>Bs. {{ total }}</span></div>
          <button class="mt-6 w-full rounded-full bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400" @click="checkout">Finalizar compra</button>
          <button class="mt-3 w-full rounded-full border border-slate-700 px-4 py-3 font-semibold text-white transition hover:border-cyan-400 hover:text-cyan-300" @click="store.clearCart">Vaciar carrito</button>
        </div>
      </aside>
    </div>

    <div v-else class="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-600">
      Tu carrito está vacío. Explora el catálogo para agregar productos.
    </div>

    <div v-if="showModal" class="fixed inset-0 z-30 flex items-center justify-center bg-slate-950/70 px-4">
      <div class="w-full max-w-md rounded-[2rem] bg-white p-8 text-center shadow-2xl">
        <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-3xl">✅</div>
        <h3 class="mt-4 text-2xl font-semibold text-slate-900">¡Compra confirmada!</h3>
        <p class="mt-3 text-slate-600">Gracias por tu compra en Alex@sys. Recibirás un correo con los detalles del pedido.</p>
        <button class="mt-6 rounded-full bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-cyan-600" @click="showModal = false">Seguir comprando</button>
      </div>
    </div>
  </section>
</template>
