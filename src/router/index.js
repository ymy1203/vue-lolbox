import Vue from 'vue'
import Router from 'vue-router'
import Landing from '@/views/landing'
import Index from '@/views/index'
import News from '@/views/News'
import Players from '@/views/Players'
import Heroes from '@/views/Heroes'
import Video from '@/views/Video'
import Detail from '@/views/hero_detail'
import PDetail from '@/views/player_detail'
import War from '@/views/War'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Landing
    },
    {
      path: '/index',
      component: Index,
      children:[
      	{path:'news',component:News},
      	{path:'players',component:Players},
      	{path:'heroes',component:Heroes},
        {path:'video',component:Video},
        //带冒号为了传参
        {path:'detail/:heroId',component:Detail,name:'hero_history'},
        //带冒号为了传参，英雄唯一ID/大区/段位/级别
      	{
          path:'pdetail/:pdId/:daqu/:duanwei/:dwdj',
          component:PDetail,
          name:'player_history',
        },
        {path:'war/:pdId/:daqu/:gameId',component:War,name:'gameXq'},
      ]
    }
  ],
  // mode: 'history', //切换路径模式，变成history模式
  // scrollBehavior: () => ({ y: 0 }), // 滚动条滚动的行为，不加这个默认就会记忆原来滚动条的位置
})
