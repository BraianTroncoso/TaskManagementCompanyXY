import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import Home from '@/views/HomeView.vue'
import Login from '@/views/LoginView.vue'
import Register from '@/views/RegisterView.vue'
import CreateTaskView from '@/views/CreateTaskView.vue'
import TasksView from '@/views/TasksView.vue'
import UpdateTaskView from '@/views/UpdateTaskView.vue'

const routes: Array<RouteRecordRaw> = [
    {path: '/', component: Home},
    {path: '/login', component: Login},
    {path: '/register', component: Register},
    {path: '/task', component: CreateTaskView},
    {path: '/task/all', component: TasksView},
    {path: '/task/:id', component: UpdateTaskView}


]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
