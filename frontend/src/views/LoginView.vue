<template>
  <form @submit.prevent="submit" class=" flex flex-col w-full">
    <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
      <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
        <h1 class="mb-8 text-3xl text-center">Login</h1>

        <input 
          v-model="data.email"
          type="email"
          class="block border border-gray-400 w-full p-3 rounded mb-4"
          name="email"
          placeholder="Email"
          required />

        <input
          v-model="data.password"  
          type="password"
          class="block border border-gray-400 w-full p-3 rounded mb-4"
          name="password"
          placeholder="Password"
          required />

        <button
          type="submit"
          class="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-600 focus:outline-none my-1"
        >Sign in</button>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import {reactive} from 'vue';
import {useRouter} from "vue-router";

export default {
  name: "LoginView",
  setup() {
    const data = reactive({
      email: '',
      password: ''
    });
    const router = useRouter();

    const submit = async () => {
      await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(data)
      });

      await router.push('/');
    }

    return {
      data,
      submit
    }
  }
}
</script>