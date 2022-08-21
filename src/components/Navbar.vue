<template>
<div class="navbar">
  <div @click="$router.push('/')">Платформа</div>
  <div class="navbar__btns">
    <my-button @click="$router.push('/posts')">Посты</my-button>
    <my-button @click="$router.push('/about')" style="margin-left: 20px">О нас</my-button>
    <my-button @click="$router.push('/store')" style="margin-left: 20px">Store</my-button>
    <my-button @click="$router.push('/composition')" style="margin-left: 20px">Composition</my-button>
  </div>

</div>
</template>

<script>
import MyButton from "@/components/UI/MyButton";
export default {
  name: "Navbar",
  components: {MyButton}
}
</script>

<style scoped>
.navbar {
  height: 50px;
  background-color: lightgray;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 0 15px;
}

.navbar__btns {
  margin-left: auto;
}
</style>