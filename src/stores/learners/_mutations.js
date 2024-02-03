const mutations = {
  ADD_LEARNER: (state, lastName, firstName, birthDate, notes = []) => {
    state.learnersWithNotes.push({
      lastName,
      firstName,
      birthDate,
      notes
    });
  }
}

export default mutations;
