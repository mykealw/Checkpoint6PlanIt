<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-pGrad shadow px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div
        class="d-flex flex-column align-items-center"
        title="PlanIt Home Page"
      >
        <h1>PlanIt</h1>
      </div>
    </router-link>
    <button
      class="navbar-toggler"
      type="button "
      data-bs-toggle="collapse"
      data-bs-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <Login />
    </div>
  </nav>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style scoped>
a:hover {
  text-decoration: none;
}
.nav-link {
  text-transform: uppercase;
}
.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.bg-pGrad {
  background-image: linear-gradient(hsl(281, 66%, 47%), hsl(303, 66%, 47%));
}
</style>
