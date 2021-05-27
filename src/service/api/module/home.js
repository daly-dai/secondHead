export default [
  {
    name: 'getGoodsByType',
    method: 'GET',
    desc: '新增商品接口',
    path: '/goods/getGoodsByType',
    mock: false,
    params: {
      merchandiseCategory: '',
      community: ''
    }
  },
  {
    name: 'getGoodsById',
    method: 'GET',
    desc: '新增商品接口',
    path: '/goods/getGoodsById',
    mock: false,
    params: {
      goodsId: ''
    }
  },
  {
    name: 'confirmGoodsStatus',
    method: 'POST',
    desc: '确认购买商品',
    path: '/goods/confirmGoodsStatus',
    mock: false,
    data: {
      goodsId: '',
      status: ''
    }
  },
  {
    name: 'cancelPurchase',
    method: 'POST',
    desc: '确认购买商品',
    path: '/goods/cancelPurchase',
    mock: false,
    data: {
      goodsId: ''
    }
  },
  {
    name: 'addGoodsReply',
    method: 'POST',
    desc: '新增商品回复',
    path: '/reply/addGoodsReply',
    mock: false,
    data: {
      goods: '',
      desc: ''
    }
  },
  {
    name: 'getReplyList',
    method: 'GET',
    desc: '获取商品回复列表',
    path: '/reply/getReplyList',
    mock: false,
    params: {
      goods: ''
    }
  }
];
