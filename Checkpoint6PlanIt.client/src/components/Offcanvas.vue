<template>
  <div
    class="offcanvas offcanvas-start"
    tabindex="-1"
    aria-labelledby="offcanvasRightLabel"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title">
        <slot name="title"></slot>
      </h5>
      <button
        type="button"
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <hr />
    <div class="offcanvas-body">
      <slot name="body"></slot>
    </div>
  </div>
</template>


<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState'
export default {
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
</style>