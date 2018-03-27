import Vue from 'vue';
import Router from 'vue-router';
import TodoMVC from '@/containers/TodoMVC';
import Home from '@/containers/Home';
import HelloRouter from '@/containers/HelloRouter';
import WeChat from '@/containers/WeChat';
import User from '@/containers/User';
import UserProfile from '@/containers/User/containers/UserProfile';
import UserPosts from '@/containers/User/containers/UserPosts';
import NotFound from '@/containers/NotFound';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/todo',
      name: 'TodoMVC',
      component: TodoMVC,
    },
    {
      path: '/hello',
      name: 'HelloRouter',
      component: HelloRouter,
    },
    { // 动态路由匹配
      path: '/wechat/:name/contact/:phone',
      name: 'WeChat',
      component: WeChat,
    },
    { // 嵌套路由
      path: '/user/:id',
      component: User,
      children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'profile',
          component: UserProfile,
        },
        {
          // 当 /user/:id/posts 匹配成功
          // UserPosts 会被渲染在 User 的 <router-view> 中
          path: 'posts',
          component: UserPosts,
        },
      ],
    },
    { // 重定向
      path: '/abc',
      redirect: '/todo',
    },
    {
      path: '/*',
      component: NotFound,
    },
  ],
});
