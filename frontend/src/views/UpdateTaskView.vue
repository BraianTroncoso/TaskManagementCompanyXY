<template>
    <form @submit.prevent="submit" class="flex flex-col w-full">
      <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 class="mb-8 text-3xl text-center">Actualizar Tarea</h1>
          <input 
            v-model="updatedTask.title"
            type="text"
            class="block border border-gray-400 w-full p-3 rounded mb-4"
            name="title"
            placeholder="Título"
            required />
  
          <textarea 
            v-model="updatedTask.description"
            class="block border border-gray-400 w-full p-3 rounded mb-4"
            name="description"
            placeholder="Descripción"
            required ></textarea>
  
            <select 
            v-model="updatedTask.status"
            class="block border border-gray-400 w-full p-3 rounded mb-4"
            name="status"
            required >
            <option value="" disabled selected>Seleccione el estado</option>
            <option value="Pendiente">Pendiente</option>
            <option value="En proceso">En Proceso</option>
            <option value="Bloqueado">Bloqueado</option>
            <option value="Completado">Completado</option>
          </select>  
          <button
            type="submit"
            class="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-600 focus:outline-none my-1"
          >Crear Tarea</button>
        </div>
      </div>
    </form>
  </template>
    
  <script>import { reactive, ref } from 'vue';
import TaskController from '../controllers/TaskController';
import { useRoute } from 'vue-router';

export default {
  name: 'UpdateTaskView',
  setup() {
    const taskController = new TaskController();
    const route = useRoute(); // Usar useRoute para acceder a la ruta actual

    // Objeto reativo para almacenar la tarea actualizada
    const updatedTask = reactive({
      title: '',
      description: '',
      status: ''
    });

    // Extraer taskId de la URL
    const taskId = ref(route.params.id); // Suponiendo que el parámetro de la ruta se llama 'id'

    // Función para enviar la solicitud de actualización de la tarea
    const submit = async () => {
      try {
        console.log('ID de la tarea:', taskId.value);
        await taskController.getTask(taskId.value); // Pasar el valor de taskId a getTask
        console.log('Datos de la tarea:', updatedTask);
        await taskController.updateTask(updatedTask);
        // Redirigir a la página principal o a la vista de detalles de la tarea actualizada
      } catch (error) {
        console.error('Error updating task:', error);
      }
    };

    return {
      updatedTask,
      submit
    };
  }
};

  </script>
  