import { useStore } from 'vuex'
import { computed } from 'vue'
import { save, remove } from '@/assets/js/array-store'
import { FAVORITE_KEY } from '@/assets/js/constant'

export default function useFavorite () {
    const store = useStore()
    const favoriteList = computed(() => store.state.playerStore.favoriteList)
    const maxLen = 100

    function getFavoriteIcon (song) {
        return isFavorite(song) ? 'icon-favorite' : 'icon-not-favorite'
    }

    function toggleFavorite (song) {
        let list
        if (isFavorite(song)) {
            list = remove(FAVORITE_KEY, compare)
        } else {
            list = save(song, FAVORITE_KEY, compare, maxLen)
        }
        console.log(favoriteList);
        store.commit('playerStore/setFavoriteList', list)

        function compare (item) {
            return item.id === song.id
        }
    }

    function isFavorite (song) {
        return favoriteList.value.findIndex((item) => {
            return item.id === song.id
        }) > -1
    }

    return {
        getFavoriteIcon,
        toggleFavorite
    }
}
