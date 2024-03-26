<template>
  <div v-if="auth" class="container mx-auto">
    <h1 class="text-3xl font-bold mb-6">Tareas</h1>
    <ul>
      <li v-for="task in tasks" :key="task.id" class="bg-gray-100 rounded-lg p-4 mb-2">
        <div class="font-bold">{{ task.title }}</div>
        <div class="text-gray-600">{{ task.description }}</div>
        <div class="text-sm text-gray-500">{{ task.status }}</div>
        <div class="mt-2">
          <button @click="changeStatus(task.id, 'Pendiente')" class="bg-yellow-500 text-white px-4 py-1 rounded mr-2">Pendiente</button>
          <button @click="changeStatus(task.id, 'En Progreso')" class="bg-blue-500 text-white px-4 py-1 rounded mr-2">En Progreso</button>
          <button @click="changeStatus(task.id, 'Completada')" class="bg-green-500 text-white px-4 py-1 rounded mr-2">Completada</button>
          <button @click="changeStatus(task.id, 'Bloqueado')" class="bg-red-500 text-white px-4 py-1 rounded mr-2">Bloqueada</button>
        </div>
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
    //  // Método para cambiar el estado de una tarea
    // const changeStatus = (taskId: number, newStatus: string) => {
    //   // Aquí deberías implementar la lógica para cambiar el estado de la tarea en tu base de datos
    //   console.log(`Cambiando estado de la tarea ${taskId} a ${newStatus}`);
    //   // Por ejemplo, podrías llamar a una acción de Vuex para actualizar el estado de la tarea en el store
    //   store.dispatch('changeTaskStatus', { taskId, newStatus });
    // };

    
    return {
      tasks,
      auth,
      // changeStatus
    };
  },
  
});

</script>
