<template>
  <div class="accordion-item p-2">
    <div
      class="d-flex justify-content-between selectable"
      aria-expanded="true"
      aria-controls="collapseOne"
      data-bs-toggle="collapse"
      :data-bs-target="'#c-' + sprint.id"
    >
      <div class="accordion-header d-flex" id="headingOne">
        <h3>{{ sprint.name }}</h3>
        <h3 class="ms-5">0<i class="mdi mdi-weight"></i></h3>
      </div>
      <div class="d-flex">
        <button
          class="btn btn-success me-5"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#create-task"
          @click="setSprint()"
        >
          Create Task
        </button>
        <h3>0/0 Tasks Complete</h3>
      </div>
    </div>
    <div
      :id="'c-' + sprint.id"
      class="accordion-collapse collapse show"
      aria-labelledby="headingOne"
      data-bs-parent="#accordionExample"
    >
      <div class="accordion-body">
        <Tasks />
      </div>
    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState.js'
import { logger } from '../utils/Logger.js'
export default {
  props: {
    sprint: {
      type: Object,
      required: true,
    }
  },
  setup(props) {
    return {
      setSprint() {
        AppState.activeSprint = props.sprint
        logger.log(AppState.activeSprint)
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>