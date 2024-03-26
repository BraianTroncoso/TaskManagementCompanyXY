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
    
    const fetchTasks = async () => {
      try {
        
      const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local
      console.log('SOY EL TOKEN EN TASK COMPONENT: ', token);
        
      if (!token) {
      throw new Error('Token not found');
    }

    const headers = {
      'Authorization': `Bearer ${token}`, // Incluir el token en el encabezado de autorización
      'Content-Type': 'application/json'
    };
        const response = await fetch('http://localhost:8000/api/tasks', { headers });

        if (!response.ok) {
          throw new Error('Error fetching tasks');
        }

        const tasksData = await response.json();
        store.commit('SET_TASKS', tasksData);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        // Manejar errores de obtención de tareas
      }
    };

    onMounted(async () => {
      try { 
        await fetchTasks();
      } catch (error) {
        console.log('Error fetching tasks:', error);
        // Manejar errores de obtención de tareas
      }
    });

    const tasks = computed(() => store.state.tasks);
    const auth = computed(() => store.state.authenticated);

    return {
      tasks,
      auth
    };
  },
});

</script>
