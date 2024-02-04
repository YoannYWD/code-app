import actions   from './actions.js';
import mutations from './mutations.js';
import data      from './data.js';
import { Store } from 'vuex';

const state = {
  learnersWithNotes : data.learnersWithNotes,
  learnerNotes : {},
  error : {
    message : null
  },
}

const getters = {
  learnersWithNotes : state => state.learnersWithNotes,
  learnerNotes : state => state.learnerNotes
};

export default new Store({
  state,
  mutations,
  getters,
  actions,
  strict : true
});
