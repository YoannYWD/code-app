import constants from '../../common/constants.js';

const mutations = {
  ADD_LEARNER : (state, newLearner) => {
    let ids = [];
    for (const learner of state.learnersWithNotes) {
      ids.push(learner.id)
    }
    newLearner.id    = Math.max(...ids) + 1;
    newLearner.notes = [];
    state.learnersWithNotes.push(newLearner);
  },
  ADD_ERROR_MESSAGE : (state) => {
    state.error.message = constants.LEARNER_ALREADY_EXISTS.label;
  },
  CLEAR_ERROR_MESSAGE : (state) => {
    state.error.message = null;
  },
  SORT_LEARNER_NOTES : (state, notes) => {
    notes.sort((a, b) => {
      let dateA = Date.parse(a.inputDate);
      let dateB = Date.parse(b.inputDate);
      return dateB - dateA;
    })
    state.learnerNotes = notes;
  }
}

export default mutations;
