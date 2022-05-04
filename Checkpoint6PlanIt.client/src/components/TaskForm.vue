<template>
  <form @submit.prevent="editTask()">
    <div class="mb-3">
      <label for="taskName" class="form-label visually-hidden">Name</label>
      <input
        type="text"
        v-model="edit.name"
        class="form-control"
        name="taskName"
        id="taskName"
        aria-describedby="taskName"
        placeholder="Name..."
      />
    </div>
    <div class="d-flex">
      <div class="mb-3">
        <label for="taskWeight" class="form-label visually-hidden"
          >Weight</label
        >
        <input
          type="number"
          v-model="edit.weight"
          class="form-control"
          name="taskWeight"
          id="taskWeight"
          aria-describedby="taskWeight"
          placeholder="Weight..."
        />
      </div>
    </div>
    <div class="dropdown">
      <button
        class="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Change Sprint
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li>
          <a
            class="dropdown-item"
            v-for="s in sprints"
            :key="s.id"
            :sprint="s"
            @click="addSprintId(s.id)"
            >{{ s.name }}</a
          >
        </li>
      </ul>
    </div>
    <div class="d-flex justify-content-end">
      <button type="button" data-bs-dismiss="modal" class="btn btn-danger me-2">
        Cancel
      </button>
      <button type="submit" class="btn btn-success">Submit</button>
    </div>
  </form>
</template>


<script>
import { computed, ref } from '@vue/reactivity'
import { AppState } from '../AppState.js'
import { logger } from '../utils/Logger.js'
import Pop from '../utils/Pop.js'
import { tasksService } from '../services/TasksService.js'
import { Modal } from 'bootstrap'
export default {
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const edit = ref({})
    return {
      edit,
      sprints: computed(() => AppState.sprints),
      addSprintId(sId) {
        edit.value.sprintId = sId
        return edit
      },
      async editTask() {
        try {
          edit.value.taskId = props.task.id
          edit.value.projectId = props.task.projectId
          if (!edit.value.name) {
            edit.value.name = props.task.name
          }
          if (!edit.value.weight) {
            edit.value.weight = props.task.weight
          }
          await tasksService.editTask(edit.value)
          //   Modal.getOrCreateInstance(document.getElementById())
        }
        catch (error) {
          logger.log("[error prefix]", error.message);
          Pop.toast(error.message, "error");
        }
      }
    }
  },
}
</script>


<style lang="scss" scoped>
</style>