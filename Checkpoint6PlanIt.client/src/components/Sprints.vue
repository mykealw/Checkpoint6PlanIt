<template>
  <div class="component mt-3">
    <div class="accordion" id="accordionExample">
      <div class="accordion-item p-2">
        <div
          class="d-flex justify-content-between selectable"
          aria-expanded="true"
          aria-controls="collapseOne"
          data-bs-toggle="collapse"
          data-bs-target="#collapseOne"
        >
          <div class="accordion-header d-flex" id="headingOne">
            <h3>Sprint 1</h3>
            <h3 class="ms-5">0<i class="mdi mdi-weight"></i></h3>
          </div>
          <div class="d-flex">
            <button
              class="btn btn-success me-5"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#create-task"
            >
              Create Task
            </button>
            <h3>0/0 Tasks Complete</h3>
          </div>
        </div>
        <div
          id="collapseOne"
          class="accordion-collapse collapse show"
          aria-labelledby="headingOne"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            <Tasks />
          </div>
        </div>
      </div>
    </div>
  </div>
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