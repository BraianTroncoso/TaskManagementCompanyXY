<template>
  <div v-if="auth" class="container mx-auto">
    <h2 class="text-3xl font-bold ml-3 text-gray-600">Tareas</h2>
    <ul v-if="isAdmin" class="flex mr-2 justify-end">
		<li class="nav-item mb-4">
		<router-link to="/task" class="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 font-bold transition duration-200">Agregar Tarea</router-link>
		</li>
	</ul>
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="task in tasks" :key="task.id">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm font-medium text-gray-900">{{ task.title }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-500">{{ task.description }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span v-if="task.status === 'Pendiente'" class="text-yellow-500">Pendiente</span>
              <span v-if="task.status === 'En proceso'" class="text-blue-500">En Proceso</span>
              <span v-if="task.status === 'Completado'" class="text-green-500">Completada</span>
              <span v-if="task.status === 'Bloqueado'" class="text-red-600">Bloqueada</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
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
 
    const isAdmin = computed(() => {
    const user = store.state.user;
    return user && user.role === 'admin';
    });

    return {
      tasks,
      auth,
      isAdmin
    };
  },
  
});

</script>
