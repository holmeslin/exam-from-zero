import HomeView from './HomeView.vue'
import AboutView from './AboutView.vue'
import NotFoundView from './NotFoundView.vue'

export const routes = [
  { path: '/', component: HomeView },
  { path: '/about', component: AboutView },
  // TODO: 加一條符合任何網址的路由，顯示 NotFoundView
]
