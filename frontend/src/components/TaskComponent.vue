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
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Opciones</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="task in tasks" :key="task.id">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm font-medium text-gray-900">{{ task.title }}</div>
            </td>
            <td class="px-6 py-4 whitespace-normal overflow-visible">
              <div class="text-sm text-gray-500">{{ task.description }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span v-if="task.status === 'Pendiente'" class="text-yellow-500">Pendiente</span>
              <span v-if="task.status === 'En proceso'" class="text-blue-500">En Proceso</span>
              <span v-if="task.status === 'Completado'" class="text-green-500">Completada</span>
              <span v-if="task.status === 'Bloqueado'" class="text-red-600">Bloqueada</span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <!-- Ícono de editar -->
              <router-link :to="`/task/${task.id}`" class="text-gray-500 hover:text-gray-700 mr-3">
                <svg class="w-5 h-5 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M15 3l6 6-9 9-6-6 9-9z"></path>
                  <path d="M10 17h-4v-4"></path>
                  <path d="M14 7l-4 4"></path>
                </svg>
              </router-link>
              <!-- Ícono de eliminar -->
              <button v-if="isAdmin" @click="deleteTask(task.id)" class="text-gray-500 hover:text-gray-700">
                <svg class="w-5 h-5 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 6l3 15h12l3-15H3zm2.5 0L9 4h6l3.5 2M9 4V2m6 2V2"></path>
                </svg>
              </button>
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
import TaskController from '../controllers/TaskController';


export default defineComponent({
  name: 'TaskComponent',
  setup() {
    const store = useStore();
    const tasks = computed(() => store.state.tasks);
    const auth = computed(() => store.state.authenticated);
    const isAdmin = computed(() => {
    const user = store.state.user;
    return user && user.role === 'admin';
    });
    const taskController = new TaskController();

    onMounted(async () => {
      try { 
        await taskController.fetchTasks();
      } catch (error) {
        console.log('Error fetching tasks:', error);
      }
    });

    const deleteTask = async (taskId: number) => {
      try {
        await taskController.deleteTask(taskId);
        await taskController.fetchTasks(); 
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    };
    return {
      tasks,
      auth,
      isAdmin,
      deleteTask
    };
  },
  
});

</script>
