import { Store } from 'vuex';
import state     from './state.js';
import mutations from './mutations.js';
import getters   from './getters.js';

let store = new Store({
  state,
  mutations,
  getters,
  actions : {},
  strict : true
});

export default store;
