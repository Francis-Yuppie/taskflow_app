// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  runtimeConfig: {
  	auth: {
  		secret: process.env.AUTH_SECRET,
  		origin: process.env.AUTH_ORIGIN
  	},
    stripeSecretKey: process.env.STRIPE_SECRETE_KEY,
    stripeWebHookSecret: process.env.STRIPE_WEBHOOK_SECRETE,
    public: {
      pixabayApiKey: process.env.PIXABAY_API_KEY,
      stripePriceId: process.env.STRIPE_PRICE_ID,
      stripePublicKey: process.env.STRIPE_PUBLIC_KEY,
    }
  },
  plugins: [
    { src: '~/plugins/Quill.client.ts', mode: 'client' },
    '~/plugins/vue-stroll.js'
  ],
  devtools: { enabled: true },
  modules: ['@nuxt/ui', 'nuxt-server-utils', '@sidebase/nuxt-auth', "@nuxt/image"],
  ui: {},
  nuxtServerUtils: {
    mongodbUri: process.env.MONGODB_URI
  }, 
  auth: {
  	baseUrl: process.env.AUTH_ORIGIN,
  	provider: {
  		type: "authjs"
  	}
  }
})