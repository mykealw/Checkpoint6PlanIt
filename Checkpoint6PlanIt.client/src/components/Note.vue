<template>
  <div>
    <div>
      <img :src="note.creator.picture" alt="" />
      <p>{{ note.creator.name }}</p>
      <p>
        <i class="mdi mdi-delete selectable" @click.stop="deleteNote()"></i>
      </p>
    </div>
    <div>
      <p>{{ note.body }}</p>
    </div>
  </div>
</template>


<script>
import { useRoute } from 'vue-router';
import { tasksService } from '../services/TasksService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

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
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>