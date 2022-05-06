<template>
  <div
    class="col-md-5 selectable my-2"
    @click.stop="goToProject()"
    :title="project.name + ' Project Page'"
  >
    <h3>{{ project.name }}</h3>
  </div>
  <div class="col-md-5 align-self-center">
    <img :src="project.creator.picture" alt="" :title="project.name" />
  </div>
  <div class="col-md-2 align-self-center">
    {{ new Date(project.createdAt).toLocaleString() }}
  </div>
</template>


<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState.js'
import { useRouter } from 'vue-router'
import { logger } from '../utils/Logger.js'
export default {
  props: {
    project: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter()
    return {
      //   project: computed(() => AppState.projects)
      goToProject() {
        router.push({ name: 'Project', params: { projectId: props.project.id } })
        AppState.activeProject = props.project
        // logger.log(AppState.activeProject, "active project")
      }
    }
  }
}
</script>


<style lang="scss" scoped>
img {
  height: 7vh;
  border-radius: 50%;
}
</style>