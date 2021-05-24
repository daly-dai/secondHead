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
  },
  {
    name: 'getMerchandiseCategory',
    method: 'GET',
    desc: '获取所有的商品分类',
    path: '/merchandiseCategory/getMerchandiseCategory',
    mock: false
  }
];
