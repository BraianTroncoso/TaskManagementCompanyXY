import { Commit, createStore } from 'vuex';
import User from '@/models/User';

interface State {
    authenticated: boolean;
    user: User | null; // Aquí almacenaremos la instancia del usuario
}

export default createStore<State>({
    state: {
        authenticated: false,
        user: null,
    },
    mutations: {
        SET_AUTH(state: State, auth: boolean) {
            state.authenticated = auth;
        },
        SET_USER(state: State, user: User | null) { // Definimos la mutación para establecer el usuario
            state.user = user;
        },
    },
    actions: {
        setAuth({ commit }: { commit: Commit }, auth: boolean) {
            commit('SET_AUTH', auth);
        },
        setUser({ commit }: { commit: Commit }, user: User | null) { // Definimos la acción para almacenar la instancia del usuario
            commit('SET_USER', user);
        },
    },
    modules: {}
});
