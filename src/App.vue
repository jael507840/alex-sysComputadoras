<script setup lang="ts">
import { useShopStore } from '@/stores/shop'

const store = useShopStore()
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-900">
    <header class="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <router-link to="/" class="flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-600 text-lg font-bold text-white">A</div>
          <div>
            <p class="text-lg font-bold tracking-wide text-slate-900">Alex@sys</p>
            <p class="text-xs text-slate-500">Tienda tecnológica</p>
          </div>
        </router-link>
        <nav class="hidden gap-6 text-sm font-medium text-slate-600 md:flex">
          <router-link to="/" class="transition hover:text-cyan-600">Inicio</router-link>
          <router-link to="/nosotros" class="transition hover:text-cyan-600">Nosotros</router-link>
          <router-link to="/catalogo" class="transition hover:text-cyan-600">Catálogo</router-link>
          <router-link to="/carrito" class="transition hover:text-cyan-600">Carrito</router-link>
          <router-link to="/admin" class="transition hover:text-cyan-600">Admin</router-link>
        </nav>
        <router-link to="/carrito" class="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-600">
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
          <p class="mt-3 text-sm text-slate-400">Tienda especializada en computadoras, accesorios gamer, redes y soluciones tecnológicas para hogar y empresa.</p>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-white">Enlaces rápidos</h3>
          <ul class="mt-3 space-y-2 text-sm">
            <li><router-link to="/catalogo" class="hover:text-cyan-400">Catálogo</router-link></li>
            <li><router-link to="/nosotros" class="hover:text-cyan-400">Nosotros</router-link></li>
            <li><router-link to="/carrito" class="hover:text-cyan-400">Carrito</router-link></li>
          </ul>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-white">Promociones</h3>
          <p class="mt-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-sm text-slate-400">Descuento del 10% en accesorios gamer durante este mes.</p>
        </div>
      </div>
    </footer>
  </div>
</template>
