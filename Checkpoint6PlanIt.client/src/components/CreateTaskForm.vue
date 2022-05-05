<template>
  <form @submit.prevent="createTask()">
    <div class="mb-3">
      <label for="taskName" class="form-label visually-hidden">Task Name</label>
      <input
        type="text"
        class="form-control"
        name="taskName"
        id="taskName"
        aria-describedby="helpId"
        placeholder="Name.."
        v-model="newTask.name"
        required
      />
    </div>
    <div class="mb-3">
      <label for="taskWeight" class="form-label visually-hidden"
        >Task Weight</label
      >
      <input
        type="number"
        class="form-control"
        name="taskWeight"
        id="taskWeight"
        aria-describedby="helpId"
        placeholder="0"
        v-model="newTask.weight"
        required
      />
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
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { tasksService } from '../services/TasksService.js'
import { useRoute } from 'vue-router'
import { Modal } from 'bootstrap'
import { ref } from '@vue/reactivity'
import { AppState } from '../AppState.js'
export default {
  setup() {
    const newTask = ref({})
    const route = useRoute()
    return {
      newTask,
      route,
      async createTask() {
        try {
          newTask.value.sprintId = AppState.activeSprint.id
          await tasksService.createTask(newTask.value, route.params.projectId)
          newTask.value = {}
          AppState.activeSprint = []
          Modal.getOrCreateInstance(document.getElementById("create-task")).toggle()
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>