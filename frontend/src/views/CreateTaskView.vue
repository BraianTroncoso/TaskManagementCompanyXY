<template>
  <form @submit.prevent="submit" class="flex flex-col w-full">
    <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
      <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
        <h1 class="mb-8 text-3xl text-center">Nueva Tarea</h1>

        <input 
          v-model="data.title"
          type="text"
          class="block border border-gray-400 w-full p-3 rounded mb-4"
          name="title"
          placeholder="Título"
          required />

        <textarea 
          v-model="data.description"
          class="block border border-gray-400 w-full p-3 rounded mb-4"
          name="description"
          placeholder="Descripción"
          required ></textarea>

          <select 
          v-model="data.status"
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

<script lang="ts">
import { reactive } from 'vue';
import {useRouter} from "vue-router";

export default {
  name: 'CreateTaskView',
  setup() {
    const data = reactive({
      title: '',
      description: '',
      status: ''
    });
    const router = useRouter();

    const submit = async () => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('Token not found');
    }

    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    
    // Verifica que los campos requeridos estén presentes en el objeto data
    if (!data.title) {
      throw new Error('Title is required');
    }

    await fetch('http://localhost:8000/api/tasks', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
    });
    
    await router.push('/');
       
  } catch (error) {
    console.error('Error creating task:', error);
  }
};
    return {
      data,
      submit
    };
  }
};
</script>
