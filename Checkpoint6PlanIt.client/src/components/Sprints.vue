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
        <h3 class="ms-5">{{ weight }}<i class="mdi mdi-weight"></i></h3>
        <h3><i @click="deleteSprint()" class="mdi mdi-delete"></i></h3>
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
        <Tasks v-for="t in tasks" :key="t.id" :task="t" />
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState.js'
import { logger } from '../utils/Logger.js'
import { onMounted } from '@vue/runtime-core'
import Pop from '../utils/Pop.js'
import { sprintsService } from '../services/SprintsService.js'
import { useRoute } from 'vue-router'
export default {
  props: {
    sprint: {
      type: Object,
      required: true,
    }
  },
  setup(props) {
    const route = useRoute()
    // let weight = 0
    onMounted(async () => {
      try {
        // await totalWeight(){
        //   tasks.forEach(t => {
        //     weight += t.weight
        //   })
        // }
      }
      catch (error) {
        logger.log("[error prefix]", error.message);
        Pop.toast(error.message, "error");
      }
    })
    return {
      weight: computed(() => AppState.weight),
      // totalWeight() ,
      // tasks,
      async setSprint() {
        AppState.activeSprint = await props.sprint
        // logger.log(AppState.activeSprint)
      },
      async deleteSprint() {
        try {
          if (await Pop.confirm()) {
            await sprintsService.deleteSprint(props.sprint.id, route.params.projectId)
          }
        }
        catch (error) {
          logger.log("[error prefix]", error.message);
          Pop.toast(error.message, "error");
        }
      },
      tasks: computed(() => AppState.tasks.filter(t => t.sprintId == props.sprint.id))
    }
  }
}
</script>


<style lang="scss" scoped>
</style>