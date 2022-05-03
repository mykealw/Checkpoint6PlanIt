<template>
  <form @submit.prevent="createProject()">
    <div class="">
      <div class="mb-3">
        <label for="ProjectName" class="visually-hidden form-label"></label>
        <input
          type="text"
          class="form-control"
          name="ProjectName"
          id="ProjectName"
          aria-describedby="project to create name"
          placeholder="name..."
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
          class="form-control"
          name="ProjectDescription"
          id="ProjectDescription"
          rows="5"
        ></textarea>
      </div>
    </div>
    <div class="d-flex justify-content-end">
      <button
        type="button"
        data-bs-toggle="dismiss"
        class="btn btn-danger me-2"
      >
        Cancel
      </button>
      <button type="submit" class="btn btn-success">Submit</button>
    </div>
  </form>
</template>


<script>
export default {
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
</style>