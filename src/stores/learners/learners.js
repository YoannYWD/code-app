import { Store } from 'vuex';
import state     from './_state.js';
import mutations from './_mutations.js';
import getters   from './_getters.js';

let store = new Store({
  state,
  mutations,
  getters,
  actions : {},
  strict : true
});

export default store;
