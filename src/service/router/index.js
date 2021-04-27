/**
 * @desc 路由配置
 */
import { LOGIN_PAGE_NAME, ROOT_PAGE_NAME } from '@config/index.js';

const routes = [
  {
    path: '',
    name: ROOT_PAGE_NAME,
    component: () =>
      import(/* webpackChunkName:"views/home" */ '@views/home/index.vue'),
    meta: {
      title: '首页',
      approve: true,
      navbarVisible: false,
      tabbarVisible: true
    }
  },
  {
    path: '/',
    name: ROOT_PAGE_NAME,
    component: () =>
      import(/* webpackChunkName:"views/home" */ '@views/home/index.vue'),
    meta: {
      title: '首页',
      approve: true,
      navbarVisible: false,
      tabbarVisible: true
    }
  },
  {
    path: '/community', // 社区
    name: 'community',
    component: () => import('@views/community/index.vue'),
    meta: {
      title: '社区',
      approve: true,
      navbarVisible: false,
      tabbarVisible: true
    }
  },
  {
    path: '/message', // 个人消息
    name: 'message',
    component: () => import('@views/message/index.vue'),
    meta: {
      title: '消息中心',
      approve: true,
      navbarVisible: false,
      tabbarVisible: true
    }
  },
  {
    path: '/messageDetail:id', // 个人消息
    name: 'messageDetail',
    component: () => import('@views/message/chat-detail/index.vue'),
    meta: {
      title: '消息中心',
      approve: true,
      navbarVisible: false,
      tabbarVisible: true
    }
  },
  {
    path: '/publish', // 个人消息
    name: 'publish',
    component: () => import('@views/publish/index.vue'),
    meta: {
      title: '发布消息',
      approve: true,
      navbarVisible: false,
      tabbarVisible: true
    }
  },
  {
    path: '/personal', // 个人中心
    name: 'personal',
    component: () => import('@views/personal/index.vue'),
    meta: {
      title: '个人中心',
      approve: true,
      navbarVisible: false,
      tabbarVisible: true
    }
  },
  {
    path: `/${LOGIN_PAGE_NAME}`, // 个人中心
    name: LOGIN_PAGE_NAME,
    component: () =>
      import(
        /* webpackChunkName:"views/login" */ '../../views/login/index.vue'
      ),
    meta: {
      title: '登录',
      approve: true,
      navbarVisible: false,
      tabbarVisible: false
    }
  },
  {
    path: '/helper',
    name: 'helper',
    component: () =>
      import(
        /* webpackChunkName:"views/helper" */ '../../views/helper/index.vue'
      ),
    meta: { title: '帮助中心' }
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../../views/user/index.vue')
  },
  // {
  //   path: '/personal',
  //   name: 'personal',
  //   meta: { title: '个人中心' },
  //   component: () => import('../../views/personal/index.vue')
  // },
  {
    path: '/404',
    name: '404',
    component: () =>
      import(
        /* webpackChunkName:"views/404" */ '@packages/views/error-page/404.vue'
      ),
    meta: { title: '404' }
  },
  {
    path: '*', // 404 页面
    redirect: '/404'
  }
];

export default routes;
