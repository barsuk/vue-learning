<template>
<div>
  <div>
    <button v-on:click="addLike">Like</button>
    <button @click="addDislike">Dislike</button>
  </div>
  <div>Likes amount <strong>{{ likes }}</strong></div>
  <div>Disikes amount <strong>{{ dislikes }}</strong></div>
</div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      likes: 0,
      dislikes: 5,
    }
  },
  methods: {
    addLike() {
      this.likes += 1;
    },
    addDislike() {
      this.dislikes += 1;
    }
  }
}
</script>

<style scoped>

</style>