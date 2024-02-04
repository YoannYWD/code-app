import actions   from './actions.js';
import mutations from './mutations.js';
import data      from './data.js';
import { Store } from 'vuex';

const state = {
  learnersWithNotes: data.learnersWithNotes,
  error : {
    message : ''
  },
}

const getters = {
  learnersWithNotes : state => state.learnersWithNotes
};

export default new Store({
  state,
  mutations,
  getters,
  actions,
  strict : true
});
