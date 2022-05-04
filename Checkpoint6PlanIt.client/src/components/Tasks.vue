<template>{{ task.name }}</template>


<script>
export default {
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
</style>