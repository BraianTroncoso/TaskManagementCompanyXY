// AuthController.ts

import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export interface LoginData {
  email: string;
  password: string;
}


export default class AuthController {

  public data: Readonly<LoginData> = reactive({
    email: '',
    password: ''
  });

  private router = useRouter();
  private store = useStore();

  async submit() {
    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(this.data)
      });

      if (!response.ok) {
        throw new Error('Failed to login');
      }

      const responseJson = await response.json();
      const token = responseJson.message;
      // Almacenar el token de autenticación en Vuex
      this.store.dispatch('setAuth', { auth: true, token });
      await this.router.push('/');
    } catch (error) {
      console.error('Error during login:', error);
      // Manejar errores de inicio de sesión
    }
  }

  async logout() {
    try {
      await fetch('http://localhost:8000/api/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      await this.store.dispatch('setAuth', false);
      await this.store.dispatch('setUser', null);
      await this.router.push('/login');
    } catch (error) {
      console.error('Error during logout:', error);
      // Manejar errores de cierre de sesión
    }
  }
  
}
