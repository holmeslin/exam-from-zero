import HomeView from './HomeView.vue'
import AboutView from './AboutView.vue'
import NotFoundView from './NotFoundView.vue'

export const routes = [
  { path: '/', component: HomeView },
  { path: '/about', component: AboutView },
  { path: '/:pathMatch(.*)*', component: NotFoundView },
]
