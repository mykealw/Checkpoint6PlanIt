<template>
  <div class="row">
    <div class="col-md-1 gx-0">
      <button
        class="btn btn-primary mt-2 rnd"
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
    <template #body>
      <div
        class="d-flex justify-content-between selectable"
        v-for="p in projects"
        :key="p.id"
        @click="goToProject(p, p.id)"
      >
        <div>
          <h4>{{ p.name }}</h4>
        </div>
        <div>
          <h6>{{ new Date(p.createdAt).toLocaleString() }}</h6>
        </div>
      </div>
    </template>
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
import { Offcanvas } from 'bootstrap'

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    watchEffect(async () => {
      try {
        if (route.params.projectId) {
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
      goToProject(project, projectId) {
        router.push({ name: 'Project', params: { projectId: projectId } })
        Offcanvas.getOrCreateInstance(document.getElementById('projects-list')).hide()
        AppState.sprints = []
        AppState.activeProject = project
      },
      activeProject: computed(() => AppState.activeProject),
      sprints: computed(() => AppState.sprints),
      tasks: computed(() => AppState.tasks),
      projects: computed(() => AppState.projects)
    }
  }
}
</script>


<style lang="scss" scoped>
.rnd {
  border-top-right-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
  border-top-left-radius: 0em;
  border-bottom-left-radius: 0em;
  height: 10vh;
  width: 75%;
}
</style>