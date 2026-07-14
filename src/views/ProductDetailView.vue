<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useShopStore, type Product } from '@/stores/shop'

const route = useRoute()
const router = useRouter()
const store = useShopStore()

const product = computed<Product | undefined>(() => store.products.find((item) => item.id === Number(route.params.id)))
const submitted = ref(false)
const isSending = ref(false)
const submitError = ref('')
const form = ref({
  name: '',
  email: '',
  phone: '',
  message: '',
})

const errors = ref({
  name: '',
  email: '',
  phone: '',
})

const validateName = () => {
  const value = form.value.name.trim()
  const valid = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{1,40}$/.test(value)
  errors.value.name = valid ? '' : 'El nombre solo debe contener letras y máximo 40 caracteres.'
}

const validateEmail = () => {
  const value = form.value.email.trim()
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  errors.value.email = valid ? '' : 'Ingresa un correo electrónico válido.'
}

const validatePhone = () => {
  const value = form.value.phone.trim()
  const valid = /^\d{10}$/.test(value)
  errors.value.phone = valid ? '' : 'El teléfono debe tener exactamente 10 números.'
}

const handleInput = () => {
  validateName()
  validateEmail()
  validatePhone()
}

const submitForm = async () => {
  validateName()
  validateEmail()
  validatePhone()

  if (!errors.value.name && !errors.value.email && !errors.value.phone) {
    isSending.value = true
    submitError.value = ''

    try {
      const response = await fetch('https://formsubmit.co/ajax/jaelmaryquispemarca@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `Cotización para ${product.value?.name ?? 'producto'}`,
          name: form.value.name,
          email: form.value.email,
          phone: form.value.phone,
          message: form.value.message || 'Sin mensaje adicional',
          product: product.value?.name ?? 'Sin producto',
        }),
      })

      if (!response.ok) {
        throw new Error('No se pudo enviar la solicitud')
      }

      submitted.value = true
      form.value = { name: '', email: '', phone: '', message: '' }
    } catch (error) {
      submitError.value = 'No se pudo enviar la solicitud. Inténtalo de nuevo.'
    } finally {
      isSending.value = false
    }
  }
}

const addToCart = () => {
  if (product.value) {
    store.addToCart(product.value)
    router.push('/carrito')
  }
}
</script>

<template>
  <section v-if="product" class="mx-auto max-w-7xl px-6 py-16 lg:px-8">
    <div class="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      <div class="space-y-4">
        <img :src="product.image" :alt="product.name" class="h-[420px] w-full rounded-[2rem] object-cover shadow-xl" />
        <div class="grid gap-3 sm:grid-cols-3">
          <img :src="product.image" :alt="product.name" class="h-24 w-full rounded-2xl object-cover shadow-sm" />
          <img :src="product.image" :alt="product.name" class="h-24 w-full rounded-2xl object-cover shadow-sm" />
          <img :src="product.image" :alt="product.name" class="h-24 w-full rounded-2xl object-cover shadow-sm" />
        </div>
      </div>
      <div class="space-y-6">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-500">Producto destacado</p>
          <h1 class="mt-2 text-4xl font-bold text-slate-900">{{ product.name }}</h1>
          <p class="mt-4 text-lg text-slate-600">{{ product.description }}</p>
        </div>
        <div class="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-slate-500">Precio</p>
              <p class="text-3xl font-bold text-cyan-600">Bs. {{ product.price }}</p>
            </div>
            <div class="text-right">
              <p class="text-sm text-slate-500">Stock</p>
              <p class="font-semibold text-slate-900">{{ product.stock }} disponibles</p>
            </div>
          </div>
          <div class="mt-6 flex flex-wrap gap-3">
            <button class="rounded-full bg-cyan-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-cyan-600/20 transition hover:bg-cyan-500" @click="addToCart">Solicitar cotización</button>
            <button class="rounded-full bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-cyan-600" @click="addToCart">Agregar al carrito</button>
            <router-link to="/catalogo" class="rounded-full border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:border-cyan-500 hover:text-cyan-600">Volver al catálogo</router-link>
          </div>
        </div>
        <div class="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
          <h2 class="text-xl font-semibold text-slate-900">Características</h2>
          <ul class="mt-4 space-y-3 text-slate-600">
            <li>• Rendimiento confiable para trabajo, estudio y gaming.</li>
            <li>• Diseño moderno con excelente relación calidad-precio.</li>
            <li>• Garantía y soporte especializado por parte de Alex@sys.</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
      <div class="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <h2 class="text-2xl font-semibold text-slate-900">Solicita información</h2>
        <p class="mt-3 text-slate-600">Completa el formulario y un asesor te contactará.</p>

        <form class="mt-6 space-y-4" @submit.prevent="submitForm">
          <div>
            <label class="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
              <span class="text-cyan-600">👤</span> Nombre completo
            </label>
            <input v-model="form.name" @input="handleInput" class="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-cyan-500" placeholder="Nombre completo" />
            <p v-if="errors.name" class="mt-2 text-sm text-red-600">{{ errors.name }}</p>
          </div>
          <div>
            <label class="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
              <span class="text-cyan-600">✉️</span> Correo electrónico
            </label>
            <input v-model="form.email" @input="handleInput" class="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-cyan-500" placeholder="Correo electrónico" />
            <p v-if="errors.email" class="mt-2 text-sm text-red-600">{{ errors.email }}</p>
          </div>
          <div>
            <label class="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
              <span class="text-cyan-600">📞</span> Teléfono
            </label>
            <input v-model="form.phone" @input="handleInput" maxlength="10" class="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-cyan-500" placeholder="Teléfono (10 dígitos)" />
            <p v-if="errors.phone" class="mt-2 text-sm text-red-600">{{ errors.phone }}</p>
          </div>
          <div>
            <label class="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
              <span class="text-cyan-600">💬</span> Mensaje
            </label>
            <textarea v-model="form.message" class="min-h-28 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-cyan-500" placeholder="¿En qué te podemos ayudar?"></textarea>
          </div>
          <button class="rounded-full bg-cyan-600 px-5 py-3 font-semibold text-white transition hover:bg-cyan-500" :disabled="isSending">
            {{ isSending ? 'Enviando...' : 'Enviar solicitud' }}
          </button>
        </form>

        <div v-if="submitted" class="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
          Tu solicitud fue enviada correctamente. Un asesor se comunicará contigo pronto.
        </div>
        <div v-if="submitError" class="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {{ submitError }}
        </div>
      </div>

      <div class="rounded-[2rem] border border-slate-200 bg-slate-900 p-8 text-white shadow-sm">
        <h2 class="text-2xl font-semibold">¿Por qué comprar aquí?</h2>
        <ul class="mt-6 space-y-4 text-slate-300">
          <li>• Atención personalizada y asesoría profesional.</li>
          <li>• Entrega rápida y seguimiento de pedido.</li>
          <li>• Precios competitivos y garantías reales.</li>
        </ul>
      </div>
    </div>
  </section>

  <section v-else class="mx-auto max-w-7xl px-6 py-24 text-center">
    <h1 class="text-3xl font-bold text-slate-900">Producto no encontrado</h1>
    <router-link to="/catalogo" class="mt-6 inline-block rounded-full bg-cyan-600 px-5 py-3 font-semibold text-white">Volver al catálogo</router-link>
  </section>
</template>
