<template>
    <div class="form-signin">
      {{ store.getters.getWelcome }}
    </div>
  <main v-if="auth">

    <div class="row ms-3 me-3">
      <div
        v-for="item in store.getters.getPosts"
        :key="item.id"
        class="card m-3"
        style="width: 18rem;"
      >
        <div class="card-body">
          <h5 class="card-title">{{ item.title }}</h5>
          <p class="card-text">{{ item.content }}</p>
          <button href="#"  @click="deletePost(item.id)" class="btn btn-sm btn-danger me-2">Delete</button>
          <button href="#" @click="editPost(item.id)" class="btn btn-sm btn-primary ">Edit</button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { onMounted} from "vue";
import { useStore } from "vuex";
import {useRouter} from "vue-router";

export default {
  name: "Home",
  setup() {
    let message = "";
    const store = useStore();
    const router = useRouter();

    onMounted(async () => {
      store.dispatch("setUser");
      store.dispatch("setPostsFromDb");
    });
    const deletePost = async (id)=>{
      store.dispatch('deletePost',id);
    };
    const editPost = async (id) =>{
      await store.dispatch('editPost', id);
      await router.push('/post-edit');
    }

    const auth = store.getters.getAuth;

    return {
      message,
      store,
      deletePost,
      editPost,
      auth
    };
  },
};
</script>
