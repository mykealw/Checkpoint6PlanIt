<template>
  <div class="row">
    <div class="col-md-1 gx-0">
      <button
        class="btn btn-primary"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#projects-list"
        aria-controls="offcanvasRight"
      >
        Projects
      </button>
    </div>
    <div class="col-md-10">
      <div class="row">
        <div class="d-flex">
          <h2>{{ activeProject.name }}</h2>
          <h2>
            <i
              class="mdi mdi-delete ms-4 selectable"
              @click="deleteProject"
            ></i>
          </h2>
        </div>
        <h5>{{ activeProject.description }}</h5>
      </div>
      <div class="row">
        <div class="col-md-10">
          <h4>Sprints</h4>
        </div>
        <div class="col-md-2 text-end">
          <button
            data-bs-toggle="modal"
            data-bs-target="#create-sprint"
            class="btn btn-success m-auto"
          >
            Create Sprint
          </button>
        </div>
      </div>
      <div class="row">
        <div class="component mt-3">
          <div class="accordion" id="accordionExample">
            <Sprints v-for="s in sprints" :key="s.id" :sprint="s" />
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-1"></div>
  </div>

  <Modal id="create-sprint">
    <template #title><h4>Create Sprint</h4></template>
    <template #body><CreateSprintForm /></template>
  </Modal>

  <Modal id="create-task">
    <template #title>Create Task</template>
    <template #body><CreateTaskForm /></template>
  </Modal>

  <Offcanvas id="projects-list">
    <template #title>Projects</template>
    <template #body>....</template>
  </Offcanvas>
</template>


<script>
import { computed } from '@vue/reactivity'
import { useRoute, useRouter } from 'vue-router'
import { projectsService } from '../services/ProjectsService.js'
import Pop from '../utils/Pop.js'
import { AppState } from '../AppState.js'
import { logger } from '../utils/Logger.js'
import { sprintsService } from '../services/SprintsService.js'
import { onMounted, watchEffect } from '@vue/runtime-core'
import { tasksService } from '../services/TasksService.js'

export default {
  setup() {
    const route = useRoute()
    watchEffect(async () => {
      try {
        if (route.params.id) {
          AppState.activeProject = []
          AppState.sprints = []
          await projectsService.getProjectById(route.params.projectId)
          await sprintsService.getSprintsByProject(route.params.projectId)
          await tasksService.getTasksByProject(route.params.projectId)
        }
      }
      catch (error) {
        logger.error("[error prefix]", error.message);
        Pop.toast(error.message, "error");
      }
    })
    onMounted(async () => {
      try {
        await sprintsService.getSprintsByProject(route.params.projectId)
        await projectsService.getProjectById(route.params.projectId)
        await tasksService.getTasksByProject(route.params.projectId)


      } catch (error) {
        logger.log(error)
        Pop.toast(error.message, "error")
      }
    })
    return {
      route,
      async deleteProject() {
        try {
          if (await Pop.confirm()) {
            // logger.log(route.params, "dfkdf")
            await projectsService.deleteProject(route.params.projectId)
            Pop.toast('project deleted', 'success')
          }
        }
        catch (error) {
          console.error("[error prefix]", error.message);
          Pop.toast(error.message, "error");
        }
      },
      //   projects: computed(() => AppState.projects),
      activeProject: computed(() => AppState.activeProject),
      sprints: computed(() => AppState.sprints),
      tasks: computed(() => AppState.tasks)
    }
  }
}
</script>


<style lang="scss" scoped>
</style>