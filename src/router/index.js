import { createRouter, createWebHistory } from 'vue-router'
import Recommend from '../views/Recommend.vue';
import Search from '../views/Search.vue';
import Singer from '../views/Singer.vue';
import TopList from '../views/TopList.vue';
import SingerDetail from '../views/SingerDetail.vue';

const routes = [
    {
        path: "/",
        redirect: "/recommend",
    },
    {
        path: "/recommend",
        name: "recommend",
        component: Recommend,
    },
    {
        path: "/search",
        name: "search",
        component: Search,
    },
    {
        path: "/singer",
        name: "singer",
        component: Singer,
        children: [
            {
                path: ':id',
                component: SingerDetail
            }
        ]
    },
    {
        path: "/topList",
        name: "topList",
        component: TopList,
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
