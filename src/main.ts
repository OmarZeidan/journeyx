import "@/assets/global.css"

import { createApp } from "vue"
import App from "./App.vue"

import { createConvexVue } from "@convex-vue/core"

export const convexVue = createConvexVue({
  convexUrl: import.meta.env.VITE_CONVEX_URL,
})

const app = createApp(App)
app.use(convexVue)
app.mount("#app")
