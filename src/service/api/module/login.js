/**
 * 系统登录 api 文档接口 领域模型
 */
export default [
  {
    name: 'doLogin',
    method: 'POST',
    desc: '用户登录',
    path: '/users/login',
    data: { email: '', password: '' },
    mock: false,
    isLogin: true, // 登录接口
    isWhite: true // 白名单 （设置为 true 则会去除 token 参数）
  },
  {
    name: 'logout',
    method: 'POST',
    desc: '用户登出',
    path: '/user/logout',
    mockPath: '/mock/user/logout',
    headers: { token: '' }
  }
];
