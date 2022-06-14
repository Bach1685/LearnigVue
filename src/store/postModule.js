import axios from "axios";

export const postModule = {
  state: () => {
    return {
      posts: [],
      modificatorValue: "",
      isPostLoading: false,
      selectedSort: "",
      searchQuery: "",
      totalPages: 0,
      page: 1,
      limit: 10,
      sortOptions: [
        {
          value: "title",
          name: "По названию",
        },
        {
          value: "description",
          name: "По содержимому",
        },
      ],
    };
  },
  getters: {
    sortedPosts(state) {
      return [...state.posts].sort((post1, post2) => {
        return post1[state.selectedSort]?.localeCompare(
          post2[state.selectedSort]
        );
      });
    },
    sortedAndSearchedPosts(state, getters) {
      return getters.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    },
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    setLoading(state, isPostLoading) {
      state.isPostLoading = isPostLoading;
    },
    setSelectedSort(state, selectedSort) {
      state.selectedSort = selectedSort;
    },
    setSearchQuery(state, searchQuery) {
      state.searchQuery = searchQuery;
    },
    setPage(state, page) {
      state.page = page;
    },
    setTotalPages(state, totalPages) {
      state.totalPages = totalPages;
    },
  },
  actions: {
    async fetchPosts({ state, commit }) {
      try {
        commit("setLoading", true);
        this.isPostLoading = true;
        let respons = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: state.page,
              _limit: state.limit,
            },
          }
        );
        commit(
          "setTotalPages",
          Math.ceil(respons.headers["x-total-count"] / state.limit)
        );
        let posts = Array.from(respons.data).map((item) => {
          return {
            id: item.id,
            title: item.title,
            description: item.body,
          };
        });
        commit("setPosts", posts);
      } catch (ex) {
        console.log(ex);
      } finally {
        commit("setLoading", false);
      }
    },
    async loadMorePosts({ state, commit }) {
      try {
        commit("setPage", state.page + 1);
        let respons = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: state.page,
              _limit: state.limit,
            },
          }
        );
        commit(
          "setTotalPages",
          Math.ceil(respons.headers["x-total-count"] / state.limit)
        );
        let newPosts = Array.from(respons.data).map((item) => {
          return {
            id: item.id,
            title: item.title,
            description: item.body,
          };
        });
        commit("setPosts", [...state.posts, ...newPosts]);
      } catch (ex) {
        console.log(ex);
      }
    },
  },
  namespaced: true,
};
