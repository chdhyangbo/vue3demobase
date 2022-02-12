import { createRouter,createWebHashHistory } from 'vue-router'

import login from '../views/login.vue'
import registe from '../views/registe.vue'
import home from '../views/home.vue'
import userUpdate from '../views/userUpdate.vue'


const router = createRouter({
    history: createWebHashHistory(),
    routes: [{
        path:'/',
        component: login,
    }, {
        path:'/login',
        component: login,
    }, {
        path:'/registe',
        component: registe,
    },{
        path:'/home',
        component: home,
    },{
        path:'/userUpdate',
        component: userUpdate,
    }]
})

export default router;