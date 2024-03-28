import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import User from '@/models/User';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
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
    }
  }

  async getUserData() {
    const messageAlert = reactive({ value: 'No has iniciado sesión' });
    const messageUser = reactive({ value: '' });

    try {
      const response = await fetch('http://localhost:8000/api/user', {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      const userData = await response.json();
      const user = new User(userData.id, userData.name, userData.email, userData.role);

      // Almacena la instancia del usuario en Vuex
      this.store.dispatch('setUser', user);
      messageUser.value = `Bienvenido ${user.name}`;
    } catch (e) {
      await this.store.dispatch('setAuth', false);
    }

    return {
      messageAlert,
      messageUser,
    };
  }
  public dataRegister: RegisterData = reactive({
    name: '',
    email: '',
    password: ''
  });


  async register() {
    try {
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.dataRegister)
      });
  
      await this.router.push('/');
    } catch (error) {
      console.error('Error during registration:', error);
    }
  }
}