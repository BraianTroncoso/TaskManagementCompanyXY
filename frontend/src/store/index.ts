import { Commit, createStore } from 'vuex';
import User from '@/models/User';
import Task from '@/models/Task';

interface State {
    authenticated: boolean;
    user: User | null;
    tasks: Task[];
}

export default createStore<State>({
    state: {
        authenticated: false,
        user: null,
        tasks: [],
    },
    mutations: {
        SET_AUTH(state: State, auth: boolean) {
            state.authenticated = auth;
        },
        SET_USER(state: State, user: User | null) { // mutación para establecer el usuario
            state.user = user;
        },
        SET_TASKS(state: State, tasks: Task[]) { // mutación para establecer las tareas
            state.tasks = tasks;
        },
    },
    actions: {
        
        setAuth({ commit }: { commit: Commit }, { auth, token }: { auth: boolean, token: string | null }) {
            commit('SET_AUTH', auth);
            if (auth && token) {
                localStorage.setItem('token', token); // Almacenar el token en el almacenamiento local
            } else {
                localStorage.removeItem('token'); // Eliminar el token del almacenamiento local si el usuario cierra sesión
            }
        },
        setUser({ commit }: { commit: Commit }, user: User | null) { // Definimos la acción para almacenar la instancia del usuario
            commit('SET_USER', user);
        },
        async fetchTasks({ commit }: { commit: Commit }) {
            try {
                const response = await fetch('http://localhost:8000/api/tasks');
                if (!response.ok) {
                    throw new Error('Error fetching tasks');
                }
                const tasksData = await response.json();
                
                const tasks = tasksData.map((task: any) => new Task(task.id, task.title, task.description, task.status, task.assigned_user_id));
                commit('SET_TASKS', tasks);

            }catch (error) {
                console.error('Error fetching tasks:', error);
            }
        },
    },
    modules: {}
});
