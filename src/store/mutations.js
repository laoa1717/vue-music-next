const mutations = {
    setPlayingState (state, playing) {
        state.playing = playing
    },
    setPlayMode (state, mode) {
        state.playMode = mode
    },
    setSquenceList (state, list) {
        state.sequenceList = list
    },
    setPlayList (state, list) {
        state.playList = list
    },
    setCurrentIndex (state, index) {
        state.currentIndex = index
    },
    setFullScreen (state, fullScreen) {
        state.fullScreen = fullScreen
    }
}

export default mutations