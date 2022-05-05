<template>
  <div class="col-md-5 selectable" @click.stop="goToProject()">
    <h3>{{ project.name }}</h3>
  </div>
  <div class="col-md-5">
    <img :src="project.creator.picture" alt="" />
  </div>
  <div class="col-md-2">{{ new Date(project.createdAt).toLocaleString() }}</div>
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
</style>