import { createMemoryHistory, createRouter } from 'vue-router'

import ChatView from '@/views/ChatView.vue'

const routes = [
  { path: '/', component: ChatView },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router