<template >
  <div v-if="auth" class="container mx-auto">
    <h1 class="text-3xl font-bold mb-6">Tareas</h1>
    <ul>
      <li v-for="task in tasks" :key="task.id" class="bg-gray-100 rounded-lg p-4 mb-2">
        <div class="font-bold">{{ task.title }}</div>
        <div class="text-gray-600">{{ task.description }}</div>
        <div class="text-sm text-gray-500">{{ task.status }}</div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">

import { onMounted, computed, defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'TaskComponent',
  setup() {

    const store = useStore();
    
    const auth = computed(() => store.state.authenticated);
    onMounted(async () => {
      try { 
        await store.dispatch('fetchTasks');
      } catch (e) {
        // Manejar el error si ocurre alguna excepción
        console.log('No se recibieron las task');
      }
    });
    const tasks = computed(() => store.state.tasks);
    
    return {
      tasks,
      auth
    };
  },
});
</script>
