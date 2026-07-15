<template>
  <section class="mx-auto max-w-7xl px-6 py-16 lg:px-8">
    <div class="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
      <div class="space-y-6">
        <p class="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-500">Nosotros</p>
        <h1 class="text-4xl font-bold text-slate-900">Alex@sys, tu aliado tecnológico</h1>
        <p class="text-lg text-slate-600">Somos una tienda especializada en equipos de cómputo, accesorios y soluciones de red para hogares, oficinas y gamers. Ofrecemos productos de marcas reconocidas con garantía oficial.</p>
        <p class="text-slate-600">Brindamos computadoras de escritorio, all in one, portátiles, mouse, teclados, discos duros, fuentes de poder, routers, cables y componentes para potenciar tu experiencia digital.</p>

        <div class="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
          <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80" alt="Equipo comprometido con la responsabilidad y eficiencia en el servicio" class="h-64 w-full object-cover" />
          <div class="p-5">
            <h3 class="text-xl font-semibold text-slate-900">Compromiso institucional</h3>
            <p class="mt-2 text-slate-600">Nos caracterizamos por la responsabilidad, puntualidad y eficiencia en cada atención, garantizando confianza y soporte real para nuestros clientes.</p>
          </div>
        </div>

        <div class="grid gap-4 md:grid-cols-2">
          <div class="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm">
            <img :src="`${baseUrl}images/computadoras/all-in-one-elite.jpg`" alt="Equipo All in One de Alex@sys" class="h-44 w-full object-cover" />
            <div class="p-4">
              <h3 class="font-semibold text-slate-900">Soluciones modernas</h3>
              <p class="mt-2 text-sm text-slate-600">Equipos pensados para trabajo, estudio y entretenimiento con excelente rendimiento.</p>
            </div>
          </div>

          <div class="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm">
            <img :src="`${baseUrl}images/accesorios/ssd-1tb.jpg`" alt="Accesorio tecnológico de Alex@sys" class="h-44 w-full object-cover" />
            <div class="p-4">
              <h3 class="font-semibold text-slate-900">Accesorios confiables</h3>
              <p class="mt-2 text-sm text-slate-600">Mouse, teclados, almacenamiento y más para complementar tu setup.</p>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-6">
        <div class="rounded-3xl bg-slate-900 p-8 text-white shadow-xl">
          <h2 class="text-2xl font-semibold">¿Por qué elegirnos?</h2>
          <div class="mt-6 space-y-4 text-slate-300">
            <div class="flex items-start gap-3 rounded-2xl border border-slate-800 bg-slate-800/60 p-4">
              <div class="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-500/20 text-xl text-cyan-400">🛠️</div>
              <div>
                <h3 class="font-semibold text-white">Asesoría técnica</h3>
                <p class="mt-1 text-sm text-slate-400">Soporte especializado para cada necesidad.</p>
              </div>
            </div>
            <div class="flex items-start gap-3 rounded-2xl border border-slate-800 bg-slate-800/60 p-4">
              <div class="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500/20 text-xl text-emerald-400">⏱️</div>
              <div>
                <h3 class="font-semibold text-white">Puntualidad</h3>
                <p class="mt-1 text-sm text-slate-400">Atención ágil y respuestas oportunas para tu tranquilidad.</p>
              </div>
            </div>
            <div class="flex items-start gap-3 rounded-2xl border border-slate-800 bg-slate-800/60 p-4">
              <div class="flex h-11 w-11 items-center justify-center rounded-full bg-amber-500/20 text-xl text-amber-400">⚡</div>
              <div>
                <h3 class="font-semibold text-white">Eficiencia</h3>
                <p class="mt-1 text-sm text-slate-400">Procesos rápidos para que recibas lo que necesitas sin demoras.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 class="text-2xl font-semibold text-slate-900">Nuestra ubicación</h2>
          <p class="mt-3 text-slate-600">Estamos en Oruro, Bolivia, en la calle Presidente Montes entre Caro y Cochabamba, casa número 1145.</p>
          <div class="mt-5 overflow-hidden rounded-[1.25rem] border border-slate-200">
            <iframe
              title="Ubicación de Alex@sys"
              src="https://www.google.com/maps?q=Presidente%20Montes%20entre%20Caro%20y%20Cochabamba%201145%20Oruro%20Bolivia&z=16&output=embed"
              class="h-64 w-full"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const baseUrl = import.meta.env.BASE_URL;
</script>
