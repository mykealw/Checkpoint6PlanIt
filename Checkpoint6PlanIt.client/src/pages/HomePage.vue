<template>
  <div class="p-3 shadow mt-4 m-auto rounded">
    <div class="row">
      <div class="col-md-10 bg-light">
        <h2 class="w-50">
          Projects
          <hr />
        </h2>

        <h5>{{ account.name }}'s active projects</h5>
      </div>
      <div class="col-md-2 m-auto" v-if="account">
        <button
          data-bs-toggle="modal"
          data-bs-target="#create-project"
          class="btn bg-sGrad text-light m-auto"
          title="Create Project"
        >
          Create Project
        </button>
      </div>
    </div>
    <hr />
    <div class="row">
      <div class="col-md-5">
        <h3 class="mb-0">NAME</h3>
      </div>
      <div class="col-md-5">
        <h3 class="mb-0">MEMBERS</h3>
      </div>
      <div class="col-md-2">
        <h3 class="mb-0">STARTED</h3>
      </div>
    </div>
    <hr />
    <div class="row">
      <AllProjects v-for="p in projects" :key="p.id" :project="p" />
    </div>
  </div>
  <Modal id="create-project">
    <template #title> <h4>Create Project</h4> </template>
    <template #body> <CreateProjectForm /> </template>
  </Modal>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { logger } from '../utils/Logger.js'
import Pop from '../utils/Pop.js'
import { projectsService } from '../services/ProjectsService.js'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState.js'

export default {
  name: 'Home',
  // const route = useRoute(),
  setup() {

    onMounted(async () => {
      try {
        // await projectsService.getMyProjects()
      } catch (error) {
        logger.log(error)
        Pop.toast(error.message, "error")
      }
    });
    return {
      // route,
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      projects: computed(() => AppState.projects)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
