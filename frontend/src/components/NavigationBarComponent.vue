<template>
  <nav class="relative px-4 py-4 flex justify-between items-center bg-gray-800 mb-4">
    <h1 class="text-2xl font-bold leading-none text-white">Company XY</h1>

   
    <div class="flex">
      <ul v-if="!auth && !isAdmin" class="flex">
        <li class="nav-item">
          <router-link to="/login" class="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 hover:text-blue-600 text-sm text-white font-bold rounded-xl transition duration-200">Login</router-link>
        </li>
      </ul>
      <ul v-if="isAdmin" class="flex">
        <li class="nav-item">
          <router-link to="/" class="hidden lg:inline-block py-2 px-6 hover:text-blue-600 text-sm text-white font-bold rounded-xl transition duration-200">Home</router-link>
        </li>
      </ul>
	<ul v-if="isAdmin" class="flex">
        <li class="nav-item">
          <router-link to="/register" class="hidden lg:inline-block py-2 px-6 hover:text-blue-600 text-sm text-white font-bold rounded-xl transition duration-200">Register a User</router-link>
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
import {computed} from 'vue';
import {useStore} from "vuex";
import { useRouter } from 'vue-router';


export default {
  name: "NavigationBarComponent",
  setup() {
    const store = useStore();
	const router = useRouter();
	
    const auth = computed(() => store.state.authenticated)
	console.log('Auth status en NavigationBarComponent:', auth.value);
	const isAdmin = computed(() => {
	const user = store.state.user;
	return user && user.role === 'admin';
	});


    const logout = async () => {
      await fetch('http://localhost:8000/api/logout', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
      });
		await store.dispatch('setAuth', false); 
		await store.dispatch('setUser', null); 
		await router.push('/login');
    }
    return {
    auth,
    logout,
	isAdmin
    }
  }
  
}
</script>
