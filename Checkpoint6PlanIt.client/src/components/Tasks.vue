<template>
  <div class="row">
    <div class="col-md-12 d-flex w-100">
      <div class="third">
        <h3
          class="selectable"
          data-bs-toggle="modal"
          :data-bs-target="'#m-' + task.id"
          @click="setActiveTask(task)"
        >
          {{ task.name }} <i v-if="task.isComplete" class="mdi mdi-star"></i>
        </h3>
      </div>
      <div class="d-flex">
        <h3>
          {{ task.weight }}
        </h3>
        <h3 class="ms-1">
          <i class="mdi mdi-weight"></i>
        </h3>
        <h3 class="ms-3">
          <i class="mdi mdi-delete" @click.stop="deleteTask()"></i>
        </h3>
      </div>
    </div>
  </div>
  <Modal :id="'m-' + task.id">
    <template #title>
      <h4>{{ task.name }} Details</h4>
     
    </template>
    <template #body>
      <TaskForm :task="task" />
    </template>
    <template #footer>
      <form @submit.prevent="createNote()">
        <div class="mb-3">
          <label for="createNote" class="form-label visually-hidden"
            >Create Note</label
          >
          <textarea
            class="form-control"
            name="createNote"
            id="createNote"
            rows="3"
            placeholder="Create note..."
            required
            v-model="newNote.body"
          ></textarea>
        </div>
        <div>
          <button class="btn btn-success" type="submit">Post It!</button>
        </div>
      </form>
      <Note v-for="n in notes" :key="n.id" :note="n" />
    </template>
  </Modal>
</template>

<script>
import { computed, ref } from '@vue/reactivity';
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
    const newNote = ref({})
    return {
      newNote,
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
      setActiveTask(task) {
        AppState.activeTask = task
      },
      async createNote() {
        try {
          newNote.value.taskId = AppState.activeTask.id
          // logger.log(newNote, 'newNote')
          await tasksService.createNote(newNote.value, route.params.projectId)
        }
        catch (error) {
          logger.log("[error prefix]", error.message);
          Pop.toast(error.message, "error");
        }
      },
      sprints: computed(() => AppState.sprints),
      notes: computed(() => AppState.notes.filter(n => n.taskId == props.task.id))
    }
  }

}
</script>


<style lang="scss" scoped>
.third {
  width: 40%;
}
</style>