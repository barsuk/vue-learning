<template>
  <form @submit.prevent>
    <h4>Create post</h4>
    <my-input
        v-focus
        placeholder="Title"
        v-model="post.title"
    />
    <my-input
        placeholder="Body"
        v-model="post.body"
    />
    <my-button
        style="align-self: flex-end; margin-top: 10px"
        class="btn"
        @click="createPost"
    >Create
    </my-button>
  </form>
</template>

<script>

export default {
  data() {
    return {
      post: {
        id: 0,
        title: '',
        body: ''
      }
    }
  },
  methods: {
    createPost() {
      this.post.id = Date.now();
      this.$emit('create', this.post);
      this.post = {
        id: 0,
        title: '',
        body: ''
      };
    }
  },
}
</script>

<style scoped>

form {
  display: flex;
  flex-direction: column;
}

</style>