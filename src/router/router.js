import Main from "@/pages/Main";
import {createRouter, createWebHistory} from "vue-router";
import PostPage from "@/pages/PostPage";
import About from "@/pages/About";
import PostIdPage from "@/pages/PostIdPage";
import PostPageWithStore from "@/pages/PostPageWithStore";
import PostPageCompositionApi from "@/pages/PostPageCompositionApi";


const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/posts',
        component: PostPage
    },
    {
        path: '/posts/:id',
        component: PostIdPage
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/composition',
        component: PostPageCompositionApi
    },
    {
        path: '/store',
        component: PostPageWithStore
    }
];

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
});

export default router;