import AppLayout from './AppLayout.vue'
import HomeView from './HomeView.vue'
import AboutView from './AboutView.vue'

export const routes = [
  {
    path: '/',
    component: AppLayout,
    children: [
      { path: '', component: HomeView },
      { path: 'about', component: AboutView },
    ],
  },
]
