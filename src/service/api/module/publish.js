export default [
  {
    name: 'addGoods',
    method: 'POST',
    desc: '新增商品接口',
    path: '/goods/addGoods',
    mock: false,
    data: {
      avatar: '',
      goodsname: '',
      imgs: '',
      price: '',
      desc: '',
      attritionrate: '',
      merchandiseCategory: '',
      sellername: '',
      community: ''
    }
  }
];
