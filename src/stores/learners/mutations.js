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
  },
  GET_LEARNERS_BY_NOTES : (state) => {
    let uniqueNotes     = [];
    let learnersByNotes = [];
    for (const learner of state.learnersWithNotes) {
      for (const note of learner.notes) {
        if (uniqueNotes.indexOf(note.value) === -1) {
          uniqueNotes.push(note.value);
          learnersByNotes.push({
            note : note.value,
            learners : []
          });
        }
      }
      for (const note of learner.notes) {
        learnersByNotes.find(value => {
          if (value.note === note.value) {
            value.learners.push({
              id        : learner.id,
              lastName  : learner.lastName, 
              firstName : learner.firstName, 
              birthDate : learner.birthDate, 
            });
          }
        })
      }
    }
    learnersByNotes.sort((a, b) => {
      return b.note - a.note;
    })
    state.learnersByNote = learnersByNotes;
  }
}

export default mutations;
