export default [
  {
    name: 'getCommunity',
    method: 'GET',
    desc: '获取所有买到的商品',
    path: '/community/getCommunity',
    mock: false
  },
  {
    name: 'editUserData',
    method: 'POST',
    desc: '获取所有买到的商品',
    path: '/users/editUserData',
    mock: false,
    data: {
      avatar: '',
      name: '',
      community: '',
      sex: ''
    }
  }
];
