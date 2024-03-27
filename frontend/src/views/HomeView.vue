<template>
<div v-if="messageUser" class="flex items-center p-4 mb-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-800 max-w-md mx-auto" role="alert">
  <span class="sr-only">Info</span>
  <div class="mx-auto">
    <span class="font-medium text-gray-700 dark:text-gray-400">{{ messageUser }}</span> 
  </div>
</div>
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
  <div class="w-full">
    <TaskComponent/>
  </div>
</template>


<script lang="ts">

import { ref, onMounted } from 'vue';
import AuthController from '@/controllers/AuthController';
import TaskComponent from '@/components/TaskComponent.vue';

export default {
  name: 'HomeView',
  components: { TaskComponent },
  setup() {
    const messageAlert = ref('');
    const messageUser = ref('');

    const fetchUserData = async () => {
      const authController = new AuthController();
      const { messageAlert: alertValue, messageUser: userValue } = await authController.getUserData();
      messageAlert.value = alertValue.value; 
      messageUser.value = userValue.value; 
    };

    onMounted(fetchUserData);

    return {
      messageAlert,
      messageUser,
    };
  },
};
</script>