import { PLAY_MODE } from "../assets/js/constant";
import { shuffle } from '../assets/js/util';

export function selectPlay ({ commit }, { list, index }) {
    commit("setPlayMode", PLAY_MODE.sequence);
    commit("setSquenceList", list);
    commit("setPlayList", list);
    commit("setPlayingState", true);
    commit("setFullScreen", true);
    commit("setCurrentIndex", index);
}

export function randomPlay ({ commit }, list) {
    commit("setPlayMode", PLAY_MODE.random);
    commit("setSquenceList", list);
    commit("setPlayList", shuffle(list));
    commit("setPlayingState", true);
    commit("setFullScreen", true);
    commit("setCurrentIndex", 0);
}

export function changeMode ({ commit, state, getters }, mode) {
    const currentId = getters.currentSong.id
    if (mode === PLAY_MODE.random) {
        commit("setPlayList", shuffle(state.sequenceList));
    } else {
        commit("setPlayList", state.sequenceList);
    }
    const index = state.playList.findIndex((song) => {
        return song.id === currentId
    })
    commit("setPlayMode", mode);
    commit("setCurrentIndex", index);
}