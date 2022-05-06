<template>
  <form @submit.prevent="createSprint()">
    <div class="mb-3">
      <label for="sprintName" class="form-label visually-hidden"
        >Sprint Name</label
      >
      <input
        type="text"
        class="form-control"
        name="sprintName"
        id="sprintName"
        aria-describedby="helpId"
        placeholder="Name..."
        required
        v-model="newSprint.name"
      />
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
import { ref } from '@vue/reactivity'
import Pop from '../utils/Pop'
import { logger } from '../utils/Logger'
import { sprintsService } from '../services/SprintsService.js'
import { Modal } from 'bootstrap'
import { useRoute } from 'vue-router'
export default {
  setup() {
    const route = useRoute()
    const newSprint = ref({})
    return {
      newSprint,
      route,
      async createSprint() {
        try {
          await sprintsService.createSprint(newSprint.value, route.params.projectId)
          newSprint.value = {}
          Modal.getOrCreateInstance(document.getElementById("create-sprint")).toggle()
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>