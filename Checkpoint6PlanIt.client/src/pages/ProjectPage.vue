<template>
  <div class="row">
    <div class="col-md-1">TABS</div>
    <div class="col-md-10">
      <div class="row">
        <div class="d-flex">
          <h2>PROJECT NAME</h2>
          <h2><i class="mdi mdi-delete" @click="deleteProject"></i></h2>
        </div>
        <h5>PROJECT DESCRIPTION</h5>
      </div>
      <div class="row">
        <div class="col-md-10">
          <h4>Sprints</h4>
        </div>
        <div class="col-md-2">
          <button class="btn btn-success">Add Sprint</button>
        </div>
      </div>
      <div class="row">
        <Sprints />
      </div>
    </div>
    <div class="col-md-1"></div>
  </div>
  <!-- <OffCanvas /> -->
</template>


<script>
import { computed } from '@vue/reactivity'
import { useRoute, useRouter } from 'vue-router'
import { projectsService } from '../services/ProjectsService.js'
import Pop from '../utils/Pop.js'
import { AppState } from '../AppState.js'
import { logger } from '../utils/Logger.js'
export default {
  setup() {
    const route = useRoute()
    return {
      async deleteProject() {
        try {
          if (await Pop.confirm()) {
            logger.log(route.params, "dfkdf")
            await projectsService.deleteProject(route.params.projectId)
            Pop.toast('project deleted', 'success')
          }
        }
        catch (error) {
          console.error("[error prefix]", error.message);
          Pop.toast(error.message, "error");
        }
      },
      projects: computed(() => AppState.projects)
    }
  }
}
</script>


<style lang="scss" scoped>
</style>