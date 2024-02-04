const getters = {
  learnersWithNotes : state => {
    for (const learner of state.learnersWithNotes) {
      let notes = [];
      for (const note of learner.notes) {
        notes.push(note.value);
      }
      const sum           = notes.reduce((a, b) => a + b, 0);
      learner.averageNote = (sum / notes.length) || 0;
    }
    return state.learnersWithNotes;
  }
};

export default getters;
