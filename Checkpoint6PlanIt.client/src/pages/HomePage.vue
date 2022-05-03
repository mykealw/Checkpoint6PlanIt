<template>
  <div class="container shadow mt-4 m-auto">
    <div class="row">
      <div class="col-md-10">
        <h4>Projects</h4>
        <h5>here are all -YOUR- active projects</h5>
      </div>
      <div class="col-md-2 m-auto">
        <button
          data-bs-toggle="modal"
          data-bs-target="#create-project"
          class="btn btn-success m-auto"
        >
          Create Project
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-md-5">
        <h3>NAME</h3>
      </div>
      <div class="col-md-5">
        <h3>MEMBERS</h3>
      </div>
      <div class="col-md-2">
        <h3>STARTED</h3>
      </div>
    </div>
    <hr />
    <div class="row">
      <!-- <AllProjects /> -->
    </div>
  </div>
  <Modal id="create-project">
    <template #title> <h4>Create Project</h4> </template>
    <template #body> <CreateProjectForm /> </template>
  </Modal>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card {
    width: 50vw;
    > img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
