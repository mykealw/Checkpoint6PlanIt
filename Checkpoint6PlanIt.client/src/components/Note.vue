<template>
  <div class="d-flex w-100 shadow m-2">
    <div class="p-2">
      <img :src="note.creator.picture" alt="" />
      <p class="text-center">
        {{ note.creator.name }}
        <i
          class="mdi mdi-delete selectable"
          @click.stop="deleteNote()"
          title="Delete Note"
          v-if="account"
        ></i>
      </p>
    </div>
    <div class="align-self-center rounded border border-dark m-3">
      <p class="p-3 my-0">{{ note.body }}</p>
    </div>
  </div>
</template>


<script>
import { computed } from '@vue/reactivity';
import { useRoute } from 'vue-router';
import { tasksService } from '../services/TasksService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';

export default {
  props: {
    note: {
      type: Object,
      required: true,
    }
  },
  setup(props) {
    const route = useRoute()
    return {
      async deleteNote() {
        try {
          if (await Pop.confirm()) {
            await tasksService.deleteNote(props.note.id, route.params.projectId)
          }
        }
        catch (error) {
          logger.log("[error prefix]", error.message);
          Pop.toast(error.message, "error");
        }
      },
      account: computed(() => AppState.account)
    }
  }
}
</script>


<style lang="scss" scoped>
img {
  height: 7vh;
  width: auto;
  border-radius: 50%;
}
</style>