<template>
  <div class="recommend" v-loading:[loadingText]="loading">
    <Scroll class="scroll-wrapper">
      <div class="scroll-content">
        <div class="slider-wrapper">
          <div class="slider-content">
            <Slider v-if="sliderData.length" :sliders="sliderData"></Slider>
          </div>
        </div>
        <div class="recommend-list">
          <h1 class="list-title" v-show="!loading">热门歌单推荐</h1>
          <ul>
            <li v-for="item in albumsData" class="item" :key="item.id">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.pic" />
              </div>
              <div class="text">
                <h2 class="name">
                  {{ item.username }}
                </h2>
                <p class="title">
                  {{ item.title }}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Scroll>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from "vue";
import { getRecommend } from "@/service/recommend";
import Slider from "../components/base/slider/slider";
import Scroll from "../components/base/scroll/scroll";

export default defineComponent({
  name: "recommend",
  components: {
    Slider,
    Scroll,
  },
  setup() {
    const sliderData = ref([]);
    const albumsData = ref([]);
    const loading = computed(
      () => !sliderData.value.length && !albumsData.value.length
    );
    const loadingText = "正在载入中...";

    onMounted(async () => {
      const result = await getRecommend();
      sliderData.value = result.sliders;
      albumsData.value = result.albums;
    });

    return {
      sliderData,
      albumsData,
      loading,
      loadingText,
    };
  },
});
</script>

<style lang="scss" scoped>
.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  overflow: scroll;
  .scroll-wrapper {
    height: 100%;
    overflow: hidden;
    .slider-wrapper {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 40%;
      overflow: hidden;
      .slider-content {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
    }
    .recommend-list {
      .list-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-theme;
      }
      .item {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        padding: 0 20px 20px 20px;

        .icon {
          flex: 0 0 60px;
          width: 60px;
          padding-right: 20px;
        }
        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          line-height: 20px;
          overflow: hidden;
          font-size: $font-size-medium;
        }
        .name {
          margin-bottom: 10px;
          color: $color-text;
        }
        .title {
          color: $color-text-d;
        }
      }
    }
  }
}
</style>