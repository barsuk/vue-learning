<template>
  <div>
    <h1>Страница с постами</h1>
    <my-input
        v-focus
        v-model="searchQuery"
        placeholder="найти..."
    />
    <div class="app__btns">
      <my-button
          @click="showDialog"
      >
        Create post
      </my-button>
      <my-select
          v-model="selectedSort"
          :options="sortOptions"
      />
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form
          @create="createPost"
      />
    </my-dialog>
    <post-list
        :posts="sortedAndSearchedPosts"
        @remove="removePost"
        v-if="!isPostsLoading"
    />
    <div v-else>Идёт загрузка</div>
    <div v-intersection="loadMorePosts" class="observer"></div>
    <!--    <div class="page__wrapper">-->
    <!--      <div-->
    <!--          v-for="pageNumber in totalPages"-->
    <!--          :key="pageNumber"-->
    <!--          class="page"-->
    <!--          :class="{-->
    <!--            'current-page': page === pageNumber-->
    <!--          }"-->
    <!--          @click="changePage(pageNumber)"-->
    <!--      >{{ pageNumber }}-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import MyDialog from "@/components/UI/MyDialog";
import MyButton from "@/components/UI/MyButton";
import axios from "axios";
import MySelect from "@/components/UI/MySelect";
import MyInput from "@/components/UI/MyInput";

export default {
  components: {
    MyInput,
    MySelect,
    MyButton,
    MyDialog,
    PostList,
    PostForm
  },
  name: "App",
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostsLoading: false,
      selectedSort: '',
      searchQuery: '',
      page: 1,
      limit: 10,
      totalPages: 0,
      sortOptions: [
        {value: 'id', name: 'По ID'},
        {value: 'title', name: 'По названию'},
        {value: 'body', name: 'По описанию'},
      ]
    }
  },
  methods: {
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id)
    },
    showDialog() {
      this.dialogVisible = true
    },
    async fetchPosts() {
      try {
        this.isPostsLoading = true;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts',
            {
              params: {
                _page: this.page,
                _limit: this.limit
              }
            }
        );
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.posts = response.data;
      } catch (e) {
        alert('Error')
      } finally {
        this.isPostsLoading = false;
      }
    },
    async loadMorePosts() {
      try {
        this.page += 1;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts',
            {
              params: {
                _page: this.page,
                _limit: this.limit
              }
            }
        );
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.posts = [...this.posts, ...response.data];
      } catch (e) {
        alert('Error')
      }
    },
    // changePage(pageNumber) {
    //   this.page = pageNumber;
    // }
  },
  mounted() {
    this.fetchPosts();
    /*
    // меняем на директиву
        let options = {
          rootMargin: '0px',
          threshold: 1.0
        }

        let callback = (entries, observer) => {
          if (entries[0].isIntersecting && this.page < this.totalPages) {
            this.loadMorePosts();
          }
        }

        let observer = new IntersectionObserver(callback, options);
        observer.observe(this.$refs.observer);
    */
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((firstPost, secondPost) => {
        return firstPost[this.selectedSort]?.localeCompare(
            secondPost[this.selectedSort]
        )
      })
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter(
          post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    }
  },
  watch: {
    // page() {
    //   this.fetchPosts();
    // }
  }
}
</script>

<style>

.app__btns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}

.page__wrapper {
  display: flex;
  margin-top: 15px;
}

.page {
  border: 1px solid black;
  padding: 10px;
}

.current-page {
  border: 2px solid teal;
}

.observer {
  height: 30px;
  background: green;
}
</style>
