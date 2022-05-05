<template>
  <div class="row">
    <div class="col-md-12">
      <h3
        class="selectable"
        data-bs-toggle="modal"
        :data-bs-target="'#m-' + task.id"
      >
        {{ task.name }}
        <i class="mdi mdi-delete" @click.stop="deleteTask()"></i>
      </h3>
      <h3>{{ task.weight }} <i class="mdi mdi-weight"></i></h3>
    </div>
  </div>
  <Modal :id="'m-' + task.id">
    <template #title>
      <h4>{{ task.name }} Details</h4>
    </template>
    <template #body>
      <TaskForm :task="task" />
    </template>
  </Modal>
</template>

<script>
import { computed } from '@vue/reactivity';
import { useRoute } from 'vue-router';
import { tasksService } from '../services/TasksService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';

export default {
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    return {
      async deleteTask() {
        try {
          if (await Pop.confirm()) {
            await tasksService.deleteTask(props.task.id, route.params.projectId)
          }
        }
        catch (error) {
          logger.log("[error prefix]", error.message);
          Pop.toast(error.message, "error");
        }
      },

      sprints: computed(() => AppState.sprints)

    }
  }

}
</script>


<style lang="scss" scoped>
</style>