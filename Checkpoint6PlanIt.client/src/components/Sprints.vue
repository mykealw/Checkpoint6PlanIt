<template>
  <div class="accordion-item">
    <div
      class="
        d-flex
        justify-content-between
        selectable
        bg-pGrad
        text-light
        border-dark border-top border-start border-end
        rounded-top
        p-2
      "
      aria-expanded="true"
      data-bs-toggle="collapse"
      :data-bs-target="'#c-' + sprint.id"
      :title="sprint.name"
    >
      <div class="accordion-header d-flex w-100" id="headingOne">
        <div class="w-20">
          <h3 class="mb-0 vertical-align-center">{{ sprint.name }}</h3>
        </div>
        <div class="w-20 d-flex justify-content-end">
          <h4 class="me-3">{{ weightTotal }}</h4>
          <h4><i class="mdi mdi-weight"></i></h4>
        </div>
        <div class="w-20 text-end me-2">
          <button
            class="btn bg-sGrad text-light me-3"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#create-task"
            @click="setSprint()"
            title="Create Task"
            v-if="account"
          >
            Create Task
          </button>
        </div>
        <div class="w-20 text-end">
          <h4 class="mb-0 pt-1">
            {{ completeTasks }}/{{ totalTasks }} Completed
          </h4>
        </div>
        <div class="w-20 text-end">
          <h4>
            <i
              @click.stop="deleteSprint()"
              class="mdi mdi-delete selectable"
              title="Delete Sprint"
              v-if="account"
            ></i>
          </h4>
        </div>
      </div>
    </div>
    <div
      :id="'c-' + sprint.id"
      class="accordion-collapse collapse border-dark border"
      :aria-labelledby="'heading-' + sprint.name"
      data-bs-parent="#accordionExample"
    >
      <div class="accordion-body bg-sGrad text-light">
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
      account: computed(() => AppState.account),
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
.w-20 {
  width: 20%;
}
w-10 {
  width: 10%;
}
w-40 {
  width: 40%;
}
</style>