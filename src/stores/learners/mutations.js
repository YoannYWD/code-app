import constants from '../../common/constants.js';

const mutations = {
  /**
   * Learners mutations
   */
  ADD_LEARNER : (state, newLearner) => {
    let ids = [];
    for (const learner of state.learnersWithNotes) {
      ids.push(learner.id)
    }
    newLearner.id    = Math.max(...ids) + 1;
    newLearner.notes = [];
    state.learnersWithNotes.push(newLearner);
  },
  DELETE_LEARNER : (state, learner) => {
    state.learnersWithNotes.find((value, index) => {
      if (value.id !== learner.id) {
        return;
      }
      return state.learnersWithNotes.splice(index, 1);
    });
  },

  /**
   * Messages mutations
   */
  ADD_ERROR_MESSAGE : (state) => {
    state.error.message = constants.LEARNER_ALREADY_EXISTS.label;
  },
  CLEAR_ERROR_MESSAGE : (state) => {
    state.error.message = null;
  },

  /**
   * Notes mutations
   */
  SORT_LEARNER_NOTES : (state, notes) => {
    notes.sort((a, b) => {
      let dateA = Date.parse(a.inputDate);
      let dateB = Date.parse(b.inputDate);
      return dateB - dateA;
    })
    state.learnerNotes = notes;
  },
  ADD_NOTE : (state, note) => {
    state.learnersWithNotes.find(learner => {
      if (learner.id !== note.learnerId) {
        return;
      }
      delete note.learnerId;
      learner.notes.push(note);
    })
  }
}

export default mutations;
