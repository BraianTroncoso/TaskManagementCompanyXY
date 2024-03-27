<template>
  <nav class="relative px-4 py-4 flex justify-between items-center bg-gray-800 mb-4">
    <h1 class="text-2xl font-bold leading-none text-white">Company XY</h1>
    <div class="flex">
      
      <button v-if="auth" id="dropdownDefaultButton" @click="toggleMenu" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-3 pr-5" type="button">Menu <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
    </svg>
    </button>
<!-- eslint-disable-next-line vue/valid-v-on -->
    <div v-if="isOpen" @click.away="toggleMenu" class="origin-top z-10 absolute center mt-12 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
          <li v-if="isAdmin">
            <router-link to="/register" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Registrar usuario</router-link>
          </li>
          <li v-if="auth">
            <router-link to="/task/all" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Ver todas las tareas</router-link>
          </li>
        </ul>
    </div>
      <ul v-if="!auth && !isAdmin" class="flex">
        <li class="nav-item">
          <router-link to="/login" class="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 hover:text-blue-600 text-sm text-white font-bold rounded-xl transition duration-200">Login</router-link>
        </li>
      </ul>
      <ul v-if="auth || isAdmin" class="flex">
        <li class="nav-item">
          <router-link to="/" class="hidden lg:inline-block py-2 px-6 hover:text-blue-600 text-sm text-white font-bold rounded-xl transition duration-200">Home</router-link>
        </li>
      </ul>
      <ul v-if="auth || isAdmin" class="flex">
        <li class="nav-item">
          <a href="#" class="hidden lg:inline-block py-2 px-6 hover:text-blue-600 text-sm text-white font-bold rounded-xl transition duration-200" @click="logout">Logout</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import AuthController from '../controllers/AuthController';

export default {
  name: 'NavigationBarComponent',
  setup() {
    const store = useStore();
    const auth = computed(() => store.state.authenticated);
    const isAdmin = computed(() => {
      const user = store.state.user;
      return user && user.role === 'admin';
    });

    const authController = new AuthController();

    const logout = async () => {
      await authController.logout();
    };

    const isOpen = ref(false);

    const toggleMenu = () => {
      isOpen.value = !isOpen.value;
    };

    const closeMenu = () => {
      isOpen.value = false;
    };

    return {
      auth,
      logout,
      isAdmin,
      isOpen, 
      toggleMenu,
      closeMenu,
    };
  },
};
</script>
