import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/home/Index.vue'
import Homepage from '@/components/home/Homepage.vue'
// import Load from '@/components/home/Load.vue'
import Register from '@/components/home/Register.vue'
import Share from '@/components/home/Share.vue'
import Sale from '@/components/home/Sale.vue'
import Deal from '@/components/home/Deal.vue'
import Tobuy from '@/components/home/Tobuy.vue'
import Learn from '@/components/home/Learn.vue'
import shareground from '@/components/home/shareground.vue'
import User from '@/components/home/User.vue'
import svg from '@/components/home/svgdemo.vue'
import hao from '@/components/home/hao.vue'
import go from '@/components/home/go.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      meta:{index:0},
      component: Index
    },
    {
      path: '/Register',
      name: 'Register',
      meta:{index:1},
      component: Register
    },
    {
      path: '/Homepage',
      name: 'Homepage',
      meta:{index:2},
      component: Homepage
    },
    {
      path: '/Share',
      name: 'Share',
      meta:{index:3},
      component: Share
    },
    {
      path: '/Sale',
      name: 'Sale',
      meta:{index:4},
      component: Sale
    },
    {
      path: '/Deal',
      name: 'Deal',
      meta:{index:5},
      component: Deal
    },
    {
      path: '/Tobuy',
      name: 'Tobuy',
      meta:{index:6},
      component: Tobuy
    },
    {
      path: '/Learn',
      name: 'Learn',
      meta:{index:7},
      component: Learn
    },
    {
      path: '/shareground',
      name: 'shareground',
      meta:{index:8},
      component: shareground
    },
    {
      path: '/User',
      name: 'User',
      meta:{index:9},
      component: User
    },
    {
      path: '/svg',
      name: 'svg',
      meta:{index:10},
      component: svg
    },
    {
      path: '/hao',
      name: 'hao',
      meta:{index:11},
      component: hao
    },
    {
      path: '/go',
      name: 'go',
      meta:{index:12},
      component: go
    },

  ]
})






// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
