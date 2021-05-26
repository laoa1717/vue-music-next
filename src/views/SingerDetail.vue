<template>
  <div class="singer-detail">
    <music-list
      :songs="songs"
      :title="title"
      :pic="pic"
      :loading="loading"
    ></music-list>
  </div>
</template>

<script>
//   import createDetailComponent from '@/assets/js/create-detail-component'
//   import { SINGER_KEY } from '@/assets/js/constant'
//   export default createDetailComponent('singer-detail', SINGER_KEY, getSingerDetail)
import { computed, defineComponent, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getSingerDetail } from "../service/singer";
import { processSongs } from "../service/song";
import storage from "good-storage";
import { SINGER_KEY } from "../assets/js/constant";
import MusicList from "../components/music-list/music-list";

export default defineComponent({
  name: "singer-detail",
  components: { MusicList },
  props: {
    singer: Object,
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();
    const songs = ref([]);
    const currentId = route.params.id;
    const computedSinger = computed(() => {
      let ret = null;
      const singer = props.singer;
      if (singer) {
        ret = singer;
      } else {
        const cacheSinger = storage.session.get(SINGER_KEY);
        if (cacheSinger && cacheSinger.mid === currentId) {
          ret = cacheSinger;
        }
      }
      return ret;
    });
    const title = computed(() => {
      return computedSinger.value && computedSinger.value.name;
    });
    const pic = computed(
      () => computedSinger.value && computedSinger.value.pic
    );
    const loading = ref(true);

    onMounted(async () => {
      if (!computedSinger.value) {
        const path = route.matched[0].path;
        router.push(path);
        return;
      }
      const result = await getSingerDetail(computedSinger.value);
      songs.value = await processSongs(result.songs);
      loading.value = false;
    });

    return {
      songs,
      title,
      pic,
      loading,
    };
  },
});
</script>

<style lang="scss" scoped>
.singer-detail {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
}
</style>
