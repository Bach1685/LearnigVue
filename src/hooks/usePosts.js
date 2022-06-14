import { onMounted, ref } from "vue";
import axios from "axios";

export function usePosts(limit) {
  const posts = ref([]);
  const totalPages = ref(0);
  const isPostLoading = ref(true);

  const featching = async () => {
    try {
      let respons = await axios.get(
        "https://jsonplaceholder.typicode.com/posts",
        {
          params: {
            _page: 1,
            _limit: limit,
          },
        }
      );
      totalPages.value = Math.ceil(respons.headers["x-total-count"] / limit);
      posts.value = Array.from(respons.data).map((item) => {
        return {
          id: item.id,
          title: item.title,
          description: item.body,
        };
      });
    } catch (ex) {
      console.log(ex);
    } finally {
      isPostLoading.value = false;
    }
  };
  onMounted(featching);
  return {
    posts,
    isPostLoading,
    totalPages,
  };
}
