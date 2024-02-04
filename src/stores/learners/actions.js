import utils     from '../../common/utils.js';

const actions = {
  /**
   * Learners actions
   */
  addLearner : (store, newLearner) => {
    store.commit('CLEAR_ERROR_MESSAGE');

    for (let learner of store.state.learnersWithNotes) {
      learner = utils.cloneObject(learner);
      delete learner.id;
      delete learner.notes;
      delete learner.averageNote;

      if (utils.isObjectEqual(learner, newLearner)) {
        store.commit('ADD_ERROR_MESSAGE');
        return store.state;
      }
    }

    store.commit('ADD_LEARNER', newLearner);
    return store.state;
  },
  deleteLearner : (store, learner) => {
    store.commit('DELETE_LEARNER', learner);
    return store.state;
  },

  /**
   * Notes actions
   */
  sortLearnerNotes : (store, notes) => {
    store.commit('SORT_LEARNER_NOTES', notes);
  }
}

export default actions;
