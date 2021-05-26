import { FAVORITE_KEY } from '@/assets/js/constant';
import { load } from "@/assets/js/array-store";
const playerStore = {
    namespaced: true,
    state: () => ({
        favoriteList: load(FAVORITE_KEY)
    }),
    mutations: {
        setFavoriteList (state, list) {
            state.favoriteList = list;
        }
    },
};
export default playerStore;
