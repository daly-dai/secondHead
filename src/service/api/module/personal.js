export default [
  {
    name: 'getGoodsByStatus',
    method: 'GET',
    desc: '获取正在销售的订单',
    path: '/goods/getGoodsByStatus',
    mock: false,
    params: {
      goodsstatus: ''
    }
  },
  {
    name: 'deleteGoodsById',
    method: 'POST',
    desc: '删除商品',
    path: '/goods/deleteGoodsById',
    mock: false,
    data: {
      goodsId: ''
    }
  },
  {
    name: 'getGoodsSellering',
    method: 'GET',
    desc: '获取所有销售中或者销售结束的的订单',
    path: '/goods/getGoodsSellering',
    mock: false
  },
  {
    name: 'getGoodsBuyer',
    method: 'GET',
    desc: '获取所有买到的商品',
    path: '/goods/getGoodsBuyer',
    mock: false
  },
  {
    name: 'setGoodsStatus',
    method: 'POST',
    desc: '修改商品的状态',
    path: '/goods/setGoodsStatus',
    mock: false,
    data: {
      goodsId: '',
      status: ''
    }
  }
];
