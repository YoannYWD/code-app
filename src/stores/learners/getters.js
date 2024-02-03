import constants from '../../common/constants.js';

const getters = {
  learnersWithAverageNote : state => {
    for (const learner of state.learnersWithNotes) {
      let notes = [];
      for (const note of learner.notes) {
        notes.push(note.value);
      }
      const sum           = notes.reduce((a, b) => a + b, 0);
      const averageNote   = (sum / notes.length) || constants.NO_NOTE.label;
      learner.averageNote = averageNote;
    }
    return state.learnersWithNotes;
  }
};

export default getters;
