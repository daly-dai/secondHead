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
  }
];
