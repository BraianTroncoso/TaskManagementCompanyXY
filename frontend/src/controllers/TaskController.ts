import Task from '../models/Task';
import { useStore } from 'vuex';

const store = useStore();

export default class TaskController {

  async fetchTasks() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };
      const response = await fetch('http://localhost:8000/api/tasks', { headers });

      if (!response.ok) {
        throw new Error('Error fetching tasks');
      }

      const tasksData = await response.json();
      store.commit('SET_TASKS', tasksData.map((task: any) => new Task(task.id, task.title, task.description, task.status, task.assigned_user_id)));
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }

  async deleteTask(taskId: number) {
    try {  const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }
        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        };
        const response = await fetch(`http://localhost:8000/api/tasks/${taskId}`, {
          method: 'DELETE',
          headers: headers
        });
        if (!response.ok) {
          throw new Error('Error deleting task');
        }
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
}
