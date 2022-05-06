<template>
  <form @submit.prevent="createProject()">
    <div class="">
      <div class="mb-3">
        <label for="ProjectName" class="visually-hidden form-label"></label>
        <input
          required
          v-model="newProject.name"
          type="text"
          class="form-control"
          name="ProjectName"
          id="ProjectName"
          aria-describedby="project to create name"
          placeholder="Name..."
        />
      </div>
    </div>
    <div class="">
      <div class="mb-3">
        <label
          for="ProjectDescription"
          class="form-label visually-hidden"
        ></label>
        <textarea
          required
          v-model="newProject.description"
          class="form-control"
          name="ProjectDescription"
          id="ProjectDescription"
          rows="5"
          placeholder="Description..."
        ></textarea>
      </div>
    </div>
    <div class="d-flex justify-content-end">
      <button
        type="button"
        data-bs-dismiss="modal"
        class="btn bg-pGrad text-light me-2"
        title="Cancel"
      >
        Cancel
      </button>
      <button type="submit" class="btn bg-sGrad text-light" title="Submit">
        Submit
      </button>
    </div>
  </form>
</template>

<script>
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { projectsService } from '../services/ProjectsService.js'
import { Modal } from 'bootstrap';
import { ref } from '@vue/reactivity';
import { useRouter } from 'vue-router';
export default {
  setup() {
    const newProject = ref({})
    const router = useRouter()
    return {
      newProject,
      async createProject() {
        try {
          const project = await projectsService.createProject(newProject.value);
          router.push({ name: 'Project', params: { projectId: project.id } })
          newProject.value = {}
          Modal.getOrCreateInstance(document.getElementById("create-project")).toggle()
        }
        catch (error) {
          logger.log(error)
          Pop.toast(error.message, "error");
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>