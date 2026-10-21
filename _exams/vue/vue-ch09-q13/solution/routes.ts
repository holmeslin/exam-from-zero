import HomeView from './HomeView.vue'

export const routes = [
  { path: '/', component: HomeView },
  { path: '/about', component: () => import('./AboutView.vue') },
]
