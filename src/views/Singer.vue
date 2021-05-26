<template>
  <div class="singer" v-loading="!singers.length">
    <IndexList :data="singers" @select="selectSinger"></IndexList>

    <router-view v-slot="{ Component }">
      <transition appear name="slide">
        <component :is="Component" :singer="selectedSinger" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { getSingerList } from "../service/singer";
import IndexList from "../components/index-list/index-list";
import storage from "good-storage";
import { SINGER_KEY } from "../assets/js/constant";

export default defineComponent({
  name: "singer",
  components: {
    IndexList,
  },
  setup() {
    const router = useRouter();
    const singers = ref([]);
    const selectedSinger = ref(null);

    onMounted(async () => {
      const result = await getSingerList();
      singers.value = result.singers;
    });

    const selectSinger = (singer) => {
      selectedSinger.value = singer;
      cacheSinger(singer);
      router.push(`/singer/${singer.mid}`);
    };
    const cacheSinger = (singer) => {
      storage.session.set(SINGER_KEY, singer);
    };

    return {
      singers,
      selectSinger,
      selectedSinger,
    };
  },
});
</script>

<style lang="scss" scoped>
.singer {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
}
</style>
