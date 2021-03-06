<template>
  <div class="row">
    <div class="col-md-1 gx-0 py-3">
      <button
        class="btn bg-pGrad text-light mt-2 rnd"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#projects-list"
        title="All Projects"
      >
        Projects
      </button>
    </div>
    <div class="col-md-10">
      <div class="row">
        <div class="col-12 w-50 p-3 pb-0">
          <div class="d-flex">
            <h2>{{ activeProject.name }}</h2>
            <h2 v-if="account">
              <i
                class="mdi mdi-delete ms-5 selectable"
                @click="deleteProject"
                title="Delete Project"
              ></i>
            </h2>
          </div>
          <hr />
          <div>
            <h5 class="mb-0">{{ activeProject.description }}</h5>
          </div>
        </div>
      </div>
      <hr />
      <div class="row">
        <div class="col-md-10">
          <h3>Sprints for the {{ activeProject.name }} project.</h3>
        </div>
        <div class="col-md-2 text-end">
          <button
            data-bs-toggle="modal"
            data-bs-target="#create-sprint"
            class="btn bg-sGrad text-light m-auto"
            title="Create Sprint"
            v-if="account"
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
    <template #title><h2>Projects</h2></template>
    <template #body>
      <div
        class="d-flex justify-content-between selectable"
        v-for="p in projects"
        :key="p.id"
        @click="goToProject(p, p.id)"
        :title="'Go to the ' + p.name + ' project.'"
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
          await tasksService.getNotesByProject(route.params.projectId)
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
        await tasksService.getNotesByProject(route.params.projectId)
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
      projects: computed(() => AppState.projects),
      notes: computed(() => AppState.notes),
      account: computed(() => AppState.account)
      // fTasks: computed(() => AppState.tasks.filter(t => t.sprintId == props.sprint.id)),

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
  width: 90%;
}
.ml-0 {
  margin-left: 0;
}
</style>