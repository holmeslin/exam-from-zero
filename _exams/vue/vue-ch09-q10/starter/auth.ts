import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const userName = ref('')
  const isLoggedIn = computed(() => userName.value !== '')

  function login(name: string) {
    userName.value = name
  }

  function logout() {
    userName.value = ''
  }

  return { userName, isLoggedIn, login, logout }
})
