<template>
  <form @submit.prevent="submit" class="flex flex-col w-full">
    <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
      <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
        <h1 class="mb-8 text-3xl text-center">Register a new user</h1>

        <input 
          v-model="authController.dataRegister.name"
          type="text"
          class="block border border-gray-400 w-full p-3 rounded mb-4"
          name="name"
          placeholder="Name"
          required />

        <input 
          v-model="authController.dataRegister.email"
          type="email"
          class="block border border-gray-400 w-full p-3 rounded mb-4"
          name="email"
          placeholder="Email"
          required />

        <input
          v-model="authController.dataRegister.password"  
          type="password"
          class="block border border-gray-400 w-full p-3 rounded mb-4"
          name="password"
          placeholder="Password"
          required />

        <button
          type="submit"
          class="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-600 focus:outline-none my-1"
        >Create User</button>
      </div>
    </div>
  </form>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import AuthController from '@/controllers/AuthController';

export default defineComponent({
  name: 'RegisterView',
  setup() {
    const authController = new AuthController();

    const submit = async () => {
      await authController.register();
    };

    return {
      authController,
      submit
    };
  }
});
</script>
