<template>
  <form v-if="auth" class="form-signin" @submit.prevent="submit">
    <h1 class="h3 mb-3 fw-normal">Post</h1>
    <input v-model="data.id" type="hidden" name="id">
    <input v-model="data.title" class="form-control mb-2" placeholder="Title" required>

    <textarea v-model="data.content"  class="form-control mb-2" placeholder="Content" ></textarea>

    <button class="w-100 btn btn-lg btn-primary" type="submit">Save</button>
  </form>
</template>

<script>
import {reactive} from 'vue';
import {useRouter} from "vue-router";
import {useStore} from "vuex";

export default {
  name: "PostForm",
  setup() {
    const router = useRouter();
    const store = useStore();
    const data = reactive(store.getters.getPost);
    const auth = store.getters.getAuth;

    const submit = async () => {
      store.dispatch('setPost', data);
      router.push('/');
    }

    return {
      data,
      submit,
      auth
    }
  }
}
</script>