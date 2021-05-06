export default [
  {
    name: 'getGoodsByType',
    method: 'GET',
    desc: '新增商品接口',
    path: '/goods/getGoodsByType',
    mock: false,
    params: {
      merchandiseCategory: ''
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
    desc: '新增商品接口',
    path: '/goods/confirmGoodsStatus',
    mock: false,
    data: {
      goodsId: '',
      status: ''
    }
  }
];
