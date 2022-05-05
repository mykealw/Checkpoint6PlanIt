<template>
  <div class="accordion-item">
    <div
      class="
        d-flex
        justify-content-between
        selectable
        bg-secondary
        border-dark border-top border-start border-end
      "
      aria-expanded="true"
      aria-controls="collapseOne"
      data-bs-toggle="collapse"
      :data-bs-target="'#c-' + sprint.id"
    >
      <div
        class="accordion-header d-flex justify-content-between w-100"
        id="headingOne"
      >
        <div class="">
          <h3>{{ sprint.name }}</h3>
        </div>
        <div class="d-flex"></div>
        <div class="d-flex"></div>
        <div class="d-flex">
          <h3 class="ms-5">
            {{ weightTotal }}<i class="mdi mdi-weight me-5"></i>
          </h3>
          <h3><i @click="deleteSprint()" class="mdi mdi-delete mx-3"></i></h3>
          <button
            class="btn btn-success me-3"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#create-task"
            @click="setSprint()"
          >
            Create Task
          </button>
          <h3>{{ completeTasks }}/{{ totalTasks }} Completed</h3>
        </div>
      </div>
    </div>
    <div
      :id="'c-' + sprint.id"
      class="accordion-collapse collapse border-dark border"
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
    // onMounted(async () => {
    //   try {
    //     await totalWeight(){
    //       tasks.forEach(t => {
    //         weight += t.weight
    //       })
    //     }
    //   }
    //   catch (error) {
    //     logger.log("[error prefix]", error.message);
    //     Pop.toast(error.message, "error");
    //   }
    // })
    return {
      // weight,
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
      // async addWeight(props) {
      //   props.fTasks.forEach(t => {
      //     let weight = 0
      //     weight += t.weight
      //     return weight
      //   });
      // },
      tasks: computed(() => AppState.tasks.filter(t => t.sprintId == props.sprint.id)),
      // weightTotal = computed(() => AppState.weight)
      weightTotal: computed(() => {
        const filtered = AppState.tasks.filter(t => t.sprintId == props.sprint.id)
        let total = 0
        filtered.forEach(t => {
          total += t.weight
        })
        return total
      }),
      totalTasks: computed(() => {
        const filtered = AppState.tasks.filter(t => t.sprintId == props.sprint.id)
        return filtered.length
      }),
      completeTasks: computed(() => {
        const filtered = AppState.tasks.filter(t => t.sprintId == props.sprint.id)
        const complete = filtered.filter(f => f.isComplete)
        return complete.length
      })
    }
  }
}
</script>


<style lang="scss" scoped>
</style>