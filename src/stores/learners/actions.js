import utils     from '../../common/utils.js';

const actions = {
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
  }
}

export default actions;