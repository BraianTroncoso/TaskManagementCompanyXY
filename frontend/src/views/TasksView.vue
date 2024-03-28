<template>
<div class="w-full">
    <TaskComponent/>
  </div>
</template>

<script lang="ts">
import { reactive } from 'vue';
import {useRouter} from "vue-router";
import TaskComponent from '@/components/TaskComponent.vue';

export default {
  name: 'TasksView',
  components: { TaskComponent },

} 
</script>