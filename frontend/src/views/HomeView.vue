<template>

<div v-if="!messageUser" class="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800 max-w-md mx-auto" role="alert">
  <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
  </svg>
  <span class="sr-only">Info</span>
  <div>
    <span class="font-medium">Alerta</span> 
{{ messageAlert }}
  </div>
</div>
<div v-if="messageUser" class="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800 max-w-md mx-auto" role="alert">
  <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
  </svg>
  <span class="sr-only">Info</span>
  <div>
    <span  class="font-medium"></span> 
    {{ messageUser }}
  </div>
</div>
  <div class="w-full">
    <TaskComponent/>
  </div>
</template>
<script lang="ts">
import { onMounted, ref } from 'vue';
import { useStore } from "vuex";
import User from '@/models/User';
import TaskComponent from '@/components/TaskComponent.vue';

export default {
  name: "HomeView",
  components: { TaskComponent },
  setup() {
    const messageAlert = ref('No has iniciado sesión');
    const messageUser = ref('');
    const store = useStore();

    onMounted(async () => {
      try {
        const response = await fetch('http://localhost:8000/api/user', {
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include'
        });
        
        const userData = await response.json();

        const user = new User(userData.id, userData.name, userData.email, userData.role);

        // Almacena la instancia del usuario en Vuex
        store.dispatch('setUser', user);
        
        messageUser.value = `Hola ${user.name}`;

        
      } catch (e) {
        // Manejar el error si ocurre alguna excepción
        await store.dispatch('setAuth', false);
      }
    });


    return {
      messageAlert,
      messageUser
    }
  }
}
</script>
