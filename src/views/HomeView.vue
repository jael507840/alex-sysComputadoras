<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useShopStore, type Product } from '@/stores/shop'
import ProductModal from '@/components/ProductModal.vue'

const store = useShopStore()
const router = useRouter()
const selectedProduct = ref<Product | null>(null)
const animatedProductId = ref<number | null>(null)
const contactForm = ref({
  name: '',
  email: '',
  phone: '',
  message: '',
})
const contactErrors = ref({
  name: '',
  email: '',
  phone: '',
})
const isSubmittingContact = ref(false)
const contactSuccess = ref(false)
const contactError = ref('')

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

const validateContactForm = () => {
  const name = contactForm.value.name.trim()
  const email = contactForm.value.email.trim()
  const phone = contactForm.value.phone.trim()

  contactErrors.value.name = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{1,40}$/.test(name)
    ? ''
    : 'Ingresa un nombre válido (solo letras y hasta 40 caracteres).'

  contactErrors.value.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ? ''
    : 'Ingresa un correo electrónico válido.'

  contactErrors.value.phone = /^\d{1,12}$/.test(phone)
    ? ''
    : 'Ingresa un teléfono válido con solo números y máximo 12 dígitos.'
}

const onPhoneInput = () => {
  contactForm.value.phone = contactForm.value.phone.replace(/\D/g, '').slice(0, 12)
  validateContactForm()
}

const submitContactForm = async () => {
  validateContactForm()

  if (contactErrors.value.name || contactErrors.value.email || contactErrors.value.phone) {
    return
  }

  isSubmittingContact.value = true
  contactError.value = ''
  contactSuccess.value = false

  try {
    const response = await fetch('https://formsubmit.co/ajax/jaelmaryquispemarca@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        _subject: 'Nuevo mensaje de contacto',
        name: contactForm.value.name,
        email: contactForm.value.email,
        message: contactForm.value.message || 'Sin mensaje adicional',
      }),
    })

    if (!response.ok) {
      throw new Error('No se pudo enviar el mensaje')
    }

    contactSuccess.value = true
    contactForm.value = { name: '', email: '', phone: '', message: '' }
  } catch (error) {
    contactError.value = 'No se pudo enviar el mensaje. Inténtalo de nuevo.'
  } finally {
    isSubmittingContact.value = false
  }
}
</script>

<template>
  <section class="bg-slate-950 text-white">
    <div class="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
      <div class="space-y-6 animate-float-in">
        <span class="inline-flex rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300">Alex@sys • Tecnología confiable para tu empresa</span>
        <h1 class="text-4xl font-bold tracking-tight sm:text-5xl">Equipos, accesorios y soluciones de red para trabajar mejor</h1>
        <p class="max-w-2xl text-lg text-slate-300">Descubre laptops, PCs de escritorio, accesorios gamer, discos de almacenamiento, mouse, teclados y más, con asesoría especializada y envíos rápidos.</p>
        <div class="flex flex-wrap gap-4">
          <router-link to="/catalogo" class="animate-glow rounded-full bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-400">Comprar ahora</router-link>
          <router-link to="/nosotros" class="rounded-full border border-slate-700 px-6 py-3 font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-cyan-400 hover:text-cyan-300">Conocer más</router-link>
        </div>
        <div class="grid gap-4 pt-4 sm:grid-cols-3">
          <div class="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 transition duration-300 hover:-translate-y-1 hover:border-cyan-500/40">
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

      <div class="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-6 shadow-2xl transition duration-500 hover:-translate-y-1">
        <div class="flex items-center justify-between">
          <h2 class="text-2xl font-semibold">Productos destacados</h2>
          <router-link to="/catalogo" class="text-sm font-semibold text-cyan-400">Ver todo</router-link>
        </div>
        <div class="mt-6 space-y-4">
          <div v-for="product in store.featuredProducts" :key="product.id" class="flex items-center justify-between rounded-2xl bg-slate-800/70 p-4 transition duration-300 hover:-translate-y-0.5 hover:border hover:border-cyan-500/30">
            <div>
              <p class="font-semibold">{{ product.name }}</p>
              <p class="text-sm text-slate-400">{{ product.category }}</p>
              <p class="mt-1 text-sm font-semibold text-cyan-400">Bs. {{ product.price }}</p>
            </div>
            <div class="flex gap-2">
              <button class="rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-400" @click="buyNow(product)">Comprar ahora</button>
              <button class="rounded-full border border-slate-600 px-4 py-2 text-sm font-semibold text-slate-200 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-400 hover:text-cyan-300" @click="openProduct(product)">Ver detalle</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="mx-auto max-w-7xl px-6 py-16 lg:px-8">
    <div class="grid gap-6 md:grid-cols-3">
      <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_40px_-20px_rgba(15,23,42,0.35)] transition hover:-translate-y-1">
        <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-500/10 text-xl text-cyan-600">⚙️</div>
        <h3 class="mt-4 text-xl font-semibold text-slate-900">Asesoría técnica</h3>
        <p class="mt-3 text-slate-600">Te ayudamos a elegir la mejor solución tecnológica según tu estilo de trabajo o gaming.</p>
      </div>
      <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_40px_-20px_rgba(15,23,42,0.35)] transition hover:-translate-y-1">
        <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-fuchsia-500/10 text-xl text-fuchsia-600">🧠</div>
        <h3 class="mt-4 text-xl font-semibold text-slate-900">Marcas reconocidas</h3>
        <p class="mt-3 text-slate-600">Trabajamos con equipos y accesorios de alto rendimiento pensados para usuarios exigentes.</p>
      </div>
      <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_40px_-20px_rgba(15,23,42,0.35)] transition hover:-translate-y-1">
        <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-xl text-emerald-600">🛡️</div>
        <h3 class="mt-4 text-xl font-semibold text-slate-900">Soporte y garantía</h3>
        <p class="mt-3 text-slate-600">Tu compra cuenta con respaldo, soporte postventa y una experiencia más confiable.</p>
      </div>
    </div>

    <div class="mt-12 rounded-[2rem] bg-gradient-to-r from-cyan-600 via-sky-600 to-slate-900 p-8 text-white shadow-[0_20px_60px_-20px_rgba(2,132,199,0.45)] transition duration-500 hover:-translate-y-1">
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
      <div class="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-cyan-50 p-8 shadow-[0_20px_60px_-20px_rgba(2,132,199,0.35)] transition duration-500 hover:-translate-y-1">
        <div class="flex items-center gap-3">
          <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-500/10 text-xl text-cyan-600">✉️</div>
          <div>
            <h3 class="text-2xl font-semibold text-slate-900">Contáctanos</h3>
            <p class="mt-1 text-sm text-slate-600">¿Necesitas asesoría para tu próxima compra? Escríbenos y te responderemos pronto.</p>
          </div>
        </div>

        <form class="mt-6 space-y-4" @submit.prevent="submitContactForm">
          <div>
            <label class="mb-2 block text-sm font-semibold text-slate-700">Nombre</label>
            <div class="flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20">
              <span class="mr-3 text-cyan-600">👤</span>
              <input v-model="contactForm.name" @input="validateContactForm" class="w-full bg-transparent outline-none" placeholder="Tu nombre" />
            </div>
            <p v-if="contactErrors.name" class="mt-2 text-sm text-red-600">{{ contactErrors.name }}</p>
          </div>

          <div>
            <label class="mb-2 block text-sm font-semibold text-slate-700">Correo</label>
            <div class="flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20">
              <span class="mr-3 text-cyan-600">✉️</span>
              <input v-model="contactForm.email" @input="validateContactForm" class="w-full bg-transparent outline-none" placeholder="Tu correo" />
            </div>
            <p v-if="contactErrors.email" class="mt-2 text-sm text-red-600">{{ contactErrors.email }}</p>
          </div>

          <div>
            <label class="mb-2 block text-sm font-semibold text-slate-700">Teléfono</label>
            <div class="flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20">
              <span class="mr-3 text-cyan-600">📱</span>
              <input v-model="contactForm.phone" @input="onPhoneInput" type="tel" inputmode="numeric" maxlength="12" class="w-full bg-transparent outline-none" placeholder="Tu teléfono" />
            </div>
            <p v-if="contactErrors.phone" class="mt-2 text-sm text-red-600">{{ contactErrors.phone }}</p>
          </div>

          <div>
            <label class="mb-2 block text-sm font-semibold text-slate-700">Mensaje</label>
            <textarea v-model="contactForm.message" class="min-h-32 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20" placeholder="Escribe tu mensaje"></textarea>
          </div>

          <button class="w-full rounded-full bg-gradient-to-r from-cyan-600 to-slate-900 px-5 py-3 font-semibold text-white shadow-lg shadow-cyan-600/20 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70" :disabled="isSubmittingContact">
            {{ isSubmittingContact ? 'Enviando...' : 'Enviar mensaje' }}
          </button>
        </form>

        <div v-if="contactSuccess" class="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
          Tu mensaje fue enviado correctamente. Nos pondremos en contacto pronto.
        </div>
        <div v-if="contactError" class="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {{ contactError }}
        </div>
      </div>

      <div class="rounded-[2rem] border border-slate-800 bg-slate-900 p-8 text-white shadow-[0_20px_60px_-20px_rgba(15,23,42,0.7)] transition duration-500 hover:-translate-y-1">
        <h3 class="text-2xl font-semibold">¿Qué incluye tu compra?</h3>
        <div class="mt-6 space-y-4 text-slate-300">
          <div class="flex items-start gap-3 rounded-2xl border border-slate-800 bg-slate-800/60 p-4">
            <div class="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500/20 text-2xl text-emerald-400">🛡️</div>
            <div>
              <h4 class="font-semibold text-white">Garantía y soporte</h4>
              <p class="mt-1 text-sm text-slate-400">Tu compra cuenta con respaldo y asistencia postventa.</p>
            </div>
          </div>

          <div class="flex items-start gap-3 rounded-2xl border border-slate-800 bg-slate-800/60 p-4">
            <div class="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-500/20 text-2xl text-cyan-400">🚚</div>
            <div>
              <h4 class="font-semibold text-white">Envío rápido</h4>
              <p class="mt-1 text-sm text-slate-400">Seguimiento del pedido y entrega ágil para tu comodidad.</p>
            </div>
          </div>

          <div class="flex items-start gap-3 rounded-2xl border border-slate-800 bg-slate-800/60 p-4">
            <div class="flex h-11 w-11 items-center justify-center rounded-full bg-amber-500/20 text-2xl text-amber-400">💡</div>
            <div>
              <h4 class="font-semibold text-white">Asesoría experta</h4>
              <p class="mt-1 text-sm text-slate-400">Te ayudamos a elegir la mejor solución según tus necesidades.</p>
            </div>
          </div>

          <div class="flex items-start gap-3 rounded-2xl border border-slate-800 bg-slate-800/60 p-4">
            <div class="flex h-11 w-11 items-center justify-center rounded-full bg-fuchsia-500/20 text-2xl text-fuchsia-400">⭐</div>
            <div>
              <h4 class="font-semibold text-white">Calidad garantizada</h4>
              <p class="mt-1 text-sm text-slate-400">Productos de marcas reconocidas y rendimiento probado.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <ProductModal :product="selectedProduct" @close="selectedProduct = null" @buy="buyNow" />
</template>
