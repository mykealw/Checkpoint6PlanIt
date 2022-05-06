<template>
  <div class="row">
    <div
      class="col-md-10 d-flex py-1 selectable"
      data-bs-toggle="modal"
      :data-bs-target="'#m-' + task.id"
      @click.stop="setActiveTask(task)"
      :title="'View ' + task.name + ' notes.'"
    >
      <div class="w-5 text-center">
        <h3><i v-if="task.isComplete" class="mdi mdi-star"></i></h3>
      </div>
      <div class="d-flex w-50">
        <h3>
          {{ task.name }}
        </h3>
      </div>
      <div class="d-flex w-10 justify-content-end">
        <h3 class="me-3">
          {{ task.weight }}
        </h3>
        <h3>
          <i class="mdi mdi-weight text-end"></i>
        </h3>
      </div>
    </div>
    <div class="col-2">
      <h3 class="text-end">
        <i
          class="mdi mdi-delete selectable"
          @click.stop="deleteTask()"
          title="Delete Task"
          v-if="account"
        ></i>
      </h3>
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
      <div class="w-100" v-if="account">
        <form @submit.prevent="createNote()">
          <div class="mb-1">
            <label for="createNote" class="form-label visually-hidden"
              >Create Note</label
            >
            <textarea
              class="form-control"
              name="createNote"
              rows="3"
              placeholder="Create note..."
              required
              v-model="newNote.body"
            ></textarea>
          </div>
          <div class="text-end">
            <button
              class="btn bg-sGrad text-light"
              title="Submit"
              type="submit"
            >
              Post It!
            </button>
          </div>
        </form>
      </div>
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
      notes: computed(() => AppState.notes.filter(n => n.taskId == props.task.id)),
      account: computed(() => AppState.account)
    }
  }

}
</script>


<style lang="scss" scoped>
.w-10 {
  width: 10%;
}
.w-5 {
  width: 5%;
}
</style>