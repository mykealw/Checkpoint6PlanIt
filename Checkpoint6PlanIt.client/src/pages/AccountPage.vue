<template>
  <div class="row">
    <div class="col">
      <img :src="account.picture" alt="its you silly" />
    </div>
    <div class="col">
      <h1>Hello, {{ account.name }}</h1>
    </div>
    <div class="col">
      <h3>Here is your email: {{ account.email }}</h3>
    </div>
  </div>
  <div class="col">
    <h4
      class="selectable p-3 border border-dark m-2 bg-light rounded"
      @click="editing = true"
    >
      Edit Account
      <i class="text-dark selectable ms-2 mdi mdi-pencil"></i>
    </h4>
  </div>
  <form v-if="editing == true" @submit.prevent="editAccount()">
    <div class="mb-3">
      <label for="name" class="form-label">Name</label>
      <input
        type="text"
        class="form-control"
        id="name"
        aria-describedby="helpId"
        placeholder="Name.."
        v-model="edit.name"
      />
    </div>
    <!-- <div class="mb-3">
      <label for="email" class="form-label">email</label>
      <input
        type="text"
        class="form-control"
        id="email"
        aria-describedby="helpId"
        placeholder="email.."
        v-model="edit.email"
      />
    </div> -->
    <div class="mb-3">
      <label for="picture" class="form-label">Picture</label>
      <input
        type="text"
        class="form-control"
        id="name"
        aria-describedby="helpId"
        placeholder="Name.."
        v-model="edit.picture"
      />
    </div>

    <button class="btn btn-danger" @click="editing = false">Cancel</button>
    <button class="btn btn-success ms-2">Submit</button>
  </form>
  <!-- <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div> -->
</template>

<script>

import { computed, ref } from 'vue'
import { AppState } from '../AppState'
import Pop from '../utils/Pop.js'
import { useRoute } from 'vue-router'
import { logger } from '../utils/Logger.js'
import { accountService } from '../services/AccountService.js'
export default {
  name: 'Account',
  setup() {
    const editing = ref(false);
    const edit = ref({})
    return {
      editing,
      edit,
      account: computed(() => AppState.account),
      // edit.value: computed(() => AppState.activeAccount),
      async editAccount() {
        try {
          edit.value.id = AppState.account.id
          if (!edit.value.name) {
            edit.value.name = AppState.account.name
          }
          if (!edit.value.email) {
            edit.value.email = AppState.account.email
          }
          edit.value.email_verified = AppState.account.email_verified
          edit.value.isAuthenticated = AppState.account.isAuthenticated
          edit.value.nickname = AppState.account.nickname
          edit.value.sub = AppState.account.sub
          edit.value.updated_at = AppState.account.updated_at
          await accountService.editAccount(edit.value)
          Pop.toast("Account updated", "success")
        } catch (error) {
          logger.log("[error prefix]", error.message);
          Pop.toast(error.message, "error");
        }

      },
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
