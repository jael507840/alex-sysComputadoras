import { defineStore } from 'pinia'

export interface Product {
  id: number
  name: string
  category: 'computadoras' | 'accesorios'
  price: number
  stock: number
  sold: number
  image: string
  description: string
}

export const useShopStore = defineStore('shop', {
  state: () => ({
    products: [
      {
        id: 1,
        name: 'Laptop Gamer Pro',
        category: 'computadoras',
        price: 1299,
        stock: 8,
        sold: 24,
        image: '/images/computadoras/laptop-gamer-pro.jpg',
        description: 'Laptop potente para gaming y diseño profesional.',
      },
      {
        id: 2,
        name: 'All in One Elite',
        category: 'computadoras',
        price: 999,
        stock: 5,
        sold: 14,
        image: '/images/computadoras/all-in-one-elite.jpg',
        description: 'Equipo compacto con excelente rendimiento para oficina.',
      },
      {
        id: 3,
        name: 'PC Escritorio X10',
        category: 'computadoras',
        price: 849,
        stock: 12,
        sold: 21,
        image: '/images/computadoras/pc-escritorio-x10.jpg',
        description: 'Computadora de escritorio ideal para trabajo diario y estudio.',
      },
      {
        id: 4,
        name: 'Combo Gamer Red Dragon',
        category: 'accesorios',
        price: 149,
        stock: 20,
        sold: 37,
        image: '/images/accesorios/combo-gamer-red-dragon.jpg',
        description: 'Mouse, teclado y auriculares diseñados para gaming.',
      },
      {
        id: 5,
        name: 'Disco Duro SSD 1TB',
        category: 'accesorios',
        price: 89,
        stock: 15,
        sold: 11,
        image: '/images/accesorios/ssd-1tb.jpg',
        description: 'Almacenamiento rápido y fiable para tu equipo.',
      },
      {
        id: 6,
        name: 'Mouse Inalámbrico Genius',
        category: 'accesorios',
        price: 39,
        stock: 30,
        sold: 18,
        image: '/images/accesorios/mouse-inalambrico-genius.jpg',
        description: 'Diseño ergonómico y conexión inalámbrica sencilla.',
      },
    ] as Product[],
    cart: [] as Array<{ product: Product; quantity: number }>,
  }),
  getters: {
    featuredProducts: (state) => state.products.slice(0, 3),
    totalItems: (state) => state.cart.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: (state) => state.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    totalProducts: (state) => state.products.length,
    bestSeller: (state) => [...state.products].sort((a, b) => b.sold - a.sold)[0],
    totalRevenue: (state) => state.products.reduce((sum, product) => sum + product.price * product.sold, 0),
    productsByCategory: (state) => {
      return state.products.reduce((groups, product) => {
        const categoryProducts = groups[product.category]
        if (!categoryProducts) {
          groups[product.category] = []
        }
        groups[product.category]?.push(product)
        return groups
      }, {} as Record<string, Product[]>)
    },
  },
  actions: {
    addToCart(product: Product) {
      const existing = this.cart.find((item) => item.product.id === product.id)
      if (existing) {
        existing.quantity += 1
      } else {
        this.cart.push({ product, quantity: 1 })
      }
    },
    removeFromCart(productId: number) {
      this.cart = this.cart.filter((item) => item.product.id !== productId)
    },
    updateQuantity(productId: number, quantity: number) {
      const existing = this.cart.find((item) => item.product.id === productId)
      if (existing) {
        existing.quantity = Math.max(0, quantity)
        if (existing.quantity === 0) {
          this.removeFromCart(productId)
        }
      }
    },
    clearCart() {
      this.cart = []
    },
  },
})
