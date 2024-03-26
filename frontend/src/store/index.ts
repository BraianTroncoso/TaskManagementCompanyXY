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
        SET_USER(state: State, user: User | null) { // Definimos la mutación para establecer el usuario
            state.user = user;
        },
        SET_TASKS(state: State, tasks: Task[]) { // Definir la mutación para establecer las tareas
            state.tasks = tasks;
            console.log('SOY LAS TASKS EN MUTATIONS: ',tasks)
        },
    },
    actions: {
        setAuth({ commit }: { commit: Commit }, auth: boolean) {
            commit('SET_AUTH', auth);
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
                console.log('Tareas obtenidas:', tasksData); // Verificar que los datos de las tareas se están recibiendo correctamente
                
                const tasks = tasksData.map((task: any) => new Task(task.id, task.title, task.description, task.status, task.assigned_user_id));
                commit('SET_TASKS', tasks);

            }catch (error) {
                console.error('Error fetching tasks:', error);
            }
        },
    },
    modules: {}
});
