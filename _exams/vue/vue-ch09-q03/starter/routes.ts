import AppLayout from './AppLayout.vue'
import HomeView from './HomeView.vue'
import AboutView from './AboutView.vue'

// TODO: 改成巢狀路由，讓每一頁都包在 AppLayout 裡面
export const routes = [
  { path: '/', component: HomeView },
  { path: '/about', component: AboutView },
]
