<template>
  <div class="row p-3">
    <div class="col">
      <img :src="account.picture" alt="its you silly" :title="account.name" />
    </div>
    <div class="col-6 align-self-center d-flex justify-content-center">
      <h2>Hello, {{ account.name }}</h2>
    </div>
    <div class="col align-self-center">
      <h5>{{ account.email }}</h5>
    </div>
  </div>
  <div class="col">
    <h4
      class="selectable p-3 border border-dark m-2 bg-light rounded text-center"
      @click="editing = true"
      title="Edit Account"
    >
      Edit Account
      <i class="text-dark selectable ms-2 mdi mdi-pencil"></i>
    </h4>
  </div>
  <form class="p-3" v-if="editing == true" @submit.prevent="editAccount()">
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

    <button
      class="btn bg-pGrad text-light"
      @click="editing = false"
      title="Cancel"
    >
      Cancel
    </button>
    <button class="btn bg-sGrad text-light ms-2" title="Submit">Submit</button>
  </form>
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
          // edit.value.id = AppState.account.id
          if (!edit.value.name) {
            edit.value.name = AppState.account.name
          }
          if (!edit.value.picture) {
            edit.value.picture = AppState.account.picture
          }
          // if (!edit.value.email) {
          //   edit.value.email = AppState.account.email
          // }
          // edit.value.email_verified = AppState.account.email_verified
          // edit.value.isAuthenticated = AppState.account.isAuthenticated
          // edit.value.nickname = AppState.account.nickname
          // edit.value.sub = AppState.account.sub
          // edit.value.updated_at = AppState.account.updated_at
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
  height: 15vh;
  border-radius: 50%;
}
</style>
