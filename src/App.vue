<script setup lang="ts">
import { useShopStore } from '@/stores/shop'

const store = useShopStore()
</script>

<template>
  <div class="min-h-screen bg-transparent text-slate-900">
    <header class="sticky top-0 z-20 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <router-link to="/" class="flex items-center gap-3">
          <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 via-sky-500 to-indigo-600 text-lg font-bold text-white shadow-lg shadow-cyan-500/20">A</div>
          <div>
            <p class="text-lg font-bold tracking-wide text-slate-900">Alex@sys</p>
            <p class="text-xs font-medium uppercase tracking-[0.3em] text-slate-500">Tecnología premium</p>
          </div>
        </router-link>
        <nav class="hidden gap-6 text-sm font-medium text-slate-600 md:flex">
          <router-link to="/" class="transition hover:text-cyan-600">Inicio</router-link>
          <router-link to="/nosotros" class="transition hover:text-cyan-600">Nosotros</router-link>
          <router-link to="/catalogo" class="transition hover:text-cyan-600">Catálogo</router-link>
          <router-link to="/carrito" class="transition hover:text-cyan-600">Carrito</router-link>
          <router-link to="/admin" class="transition hover:text-cyan-600">Admin</router-link>
        </nav>
        <router-link to="/carrito" class="rounded-full bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-700 px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90">
          Carrito ({{ store.totalItems }})
        </router-link>
      </div>
    </header>

    <main>
      <router-view />
    </main>

    <footer class="border-t border-slate-200 bg-slate-950 px-6 py-12 text-slate-300 lg:px-8">
      <div class="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
        <div>
          <h3 class="text-lg font-semibold text-white">Alex@sys</h3>
          <p class="mt-3 text-sm leading-7 text-slate-400">Tienda especializada en computadoras, accesorios gamer, redes y soluciones tecnológicas para hogar y empresa.</p>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-white">Enlaces rápidos</h3>
          <ul class="mt-3 space-y-2 text-sm">
            <li><router-link to="/catalogo" class="transition hover:text-cyan-400">Catálogo</router-link></li>
            <li><router-link to="/nosotros" class="transition hover:text-cyan-400">Nosotros</router-link></li>
            <li><router-link to="/carrito" class="transition hover:text-cyan-400">Carrito</router-link></li>
          </ul>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-white">Promociones</h3>
          <p class="mt-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-sm leading-7 text-slate-400">Descuento del 10% en accesorios gamer durante este mes y asesoría especializada sin costo.</p>
        </div>
      </div>
    </footer>
  </div>
</template>
