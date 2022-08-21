import axios from "axios";

export const postModule = {
    state: () => ({
        posts: [],
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
    }),
    getters: {
        sortedPosts(state) {
            return [...state.posts].sort((firstPost, secondPost) => {
                return firstPost[state.selectedSort]?.localeCompare(
                    secondPost[state.selectedSort]
                )
            })
        },
        sortedAndSearchedPosts(state, getters) {
            return getters.sortedPosts.filter(
                post => post.title.toLowerCase().includes(state.searchQuery.toLowerCase())
            )
        }
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts;
        },
        setLoading(state, bool) {
            state.isPostsLoading = bool;
        },
        setPage(state, page) {
            state.page = page;
        },
        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort;
        },
        setSearchQuery(state, query) {
            state.searchQuery = query;
        },
        setLimit(state, limit) {
            state.limit = limit;
        },
        setTotalPages(state, totalPages) {
            state.totalPages = totalPages;
        },
    },
    actions: {
        async fetchPosts({state, commit}) {
            try {
                commit('setLoading', true);
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts',
                    {
                        params: {
                            _page: state.page,
                            _limit: state.limit
                        }
                    }
                );
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit));
                commit('setPosts', response.data);
            } catch (e) {
                console.log(e)
            } finally {
                // this.isPostsLoading = false;
                commit('setLoading', false);
            }
        },
        async loadMorePosts({state, commit}) {
            try {
                this.page += 1;
                commit('setPage', state.page + 1);
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts',
                    {
                        params: {
                            _page: state.page,
                            _limit: state.limit
                        }
                    }
                );
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit));
                commit('setPosts', [...state.posts, ...response.data]);
            } catch (e) {
                console.log(e)
            }
        },
    },
    namespaced: true
}