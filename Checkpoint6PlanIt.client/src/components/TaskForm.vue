<template>
  <h6
    class="selectable p-3 border border-dark m-2 bg-light rounded text-center"
    @click="editing = !editing"
    title="Edit Task"
    v-if="account"
  >
    Edit Task
    <i class="text-dark selectable ms-2 mdi mdi-pencil"></i>
  </h6>
  <form class="p-2" v-if="editing == true" @submit.prevent="editTask()">
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
    <div class="d-flex justify-content-between w-100">
      <div class="mb-3 w-60">
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
      <div class="dropdown">
        <button
          class="btn bg-sGrad text-light dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          title="Change task to a different Sprint"
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
    </div>
    <div class="d-flex justify-content-between">
      <h5>Task Complete :</h5>
      <div>
        <button
          class="btn bg-pGrad text-light"
          type="button"
          :disabled="!task.isComplete"
          @click="completeTask(false)"
          title="Task still needs work!"
        >
          Needs Work
        </button>
        <button
          class="btn bg-sGrad text-light ms-2"
          type="button"
          :disabled="task.isComplete"
          @click="completeTask(true)"
          title="Task is complete!"
        >
          Finished!
        </button>
      </div>
    </div>
    <div class="d-flex justify-content-end mt-5">
      <button
        type="button"
        data-bs-dismiss="modal"
        class="btn bg-pGrad text-light me-2"
        title="Cancel"
      >
        Cancel
      </button>
      <button type="submit" class="btn bg-sGrad text-light" title="Submit">
        Submit
      </button>
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
    const editing = ref(false);
    return {
      edit,
      editing,
      sprints: computed(() => AppState.sprints),
      addSprintId(sId) {
        edit.value.sprintId = sId
        return edit
      },
      completeTask(value) {
        edit.value.isComplete = value
        props.task.isComplete = value
        return edit
      },
      async editTask() {
        try {
          edit.value.taskId = props.task.id
          edit.value.projectId = props.task.projectId
          if (!edit.value.name) {
            edit.value.name = props.task.name
          }
          // if (!edit.value.isComplete) {
          //   edit.value.isComplete = props.task.isComplete
          // }
          if (!edit.value.weight) {
            edit.value.weight = props.task.weight
          }
          Modal.getOrCreateInstance(document.getElementById('m-' + edit.value.taskId)).hide()
          await tasksService.editTask(edit.value)
        }
        catch (error) {
          logger.log("[error prefix]", error.message);
          Pop.toast(error.message, "error");
        }
      },
      account: computed(() => AppState.account)
    }
  },
}
</script>


<style lang="scss" scoped>
.w-60 {
  width: 60%;
}
.w-40 {
  width: 40%;
}
</style>