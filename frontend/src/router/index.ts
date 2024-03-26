import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import Home from '@/views/HomeView.vue'
import Login from '@/views/LoginView.vue'
import Register from '@/views/RegisterView.vue'
import TaskComponent from '@/components/TaskComponent.vue'

const routes: Array<RouteRecordRaw> = [
    {path: '/', component: Home},
    {path: '/login', component: Login},
    {path: '/register', component: Register},
    {path: '/tasks', component: TaskComponent},

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
