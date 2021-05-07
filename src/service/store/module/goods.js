/**
 * @desc 这个网站的 store
 */
// eslint-disable-next-line no-unused-vars
import _get from 'lodash/get';
// eslint-disable-next-line no-unused-vars
import { sStorageKey, isClearCache } from '../../../store/index.js';

const state = {
  goodsId: ''
};

const getters = {
  getGoodsId: state => {
    return state.goodsId;
  }
};

const actions = {
  // 更新用户信息
  updateGoodsId({ commit, state }, res) {
    commit('UPDATE_GOODS_ID', res);
  }
};

const UPDATE_GOODS_ID = 'UPDATE_GOODS_ID';

const mutations = {
  [UPDATE_GOODS_ID](state, data) {
    state.goodsId = data;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
