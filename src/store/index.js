import { createStore, createLogger } from 'vuex'
import state from './state';
import mutations from './mutations';
import * as getters from './getters';
import * as actions from './actions';
import playerStore from '../components/player/store';

const isDev = process.env.NODE_ENV !== 'production'

export default createStore({
    state,
    mutations,
    actions,
    getters,
    strict: isDev,  //开发环境下开启严格模式: 在严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误。这能保证所有的状态变更都能被调试工具跟踪到;
    plugins: isDev ? [createLogger()] : [], //开发环境检测提交状态插件;
    modules: {
        playerStore
    }
})
