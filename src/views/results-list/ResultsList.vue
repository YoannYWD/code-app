<template>
  <div class="m-3">
    <div class="d-flex">
      <h3>Liste des résultats</h3>
    </div>
    <b-container fluid>
      <b-row class="mb-3">
        <b-col 
          v-for="learnersByNote of learnersByNotes"
          :key="learnersByNote.note"
          lg="4"
          md="6"
          class="p-3"
        >
          <b-card
            :header="getCardHeader(learnersByNote.note)"
            :border-variant="getCardColor(learnersByNote.note)"
            :header-bg-variant="getCardColor(learnersByNote.note)"
            :header-text-variant="getCardHeaderTextColor(learnersByNote.note)"
            align="center"
          >
          <b-card-sub-title>Note obtenue par : </b-card-sub-title>
            <b-list-group flush>
              <b-list-group-item
                v-for="learner of learnersByNote.learners"
                :key="learner.id"
              >
                {{ getLearnerDetails(learner) }}
              </b-list-group-item>
            </b-list-group>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import store from '../../stores/learners/store.js';
import utils from '../../common/utils.js';

export default {
  name : 'results-list',
  store,
  data () {
    return {
      learnersByNotes : []
    }
  },

  created () {
    store.dispatch('getLearnersByNotes').then(res => {
      if (res.error?.message) return;
      this.learnersByNotes = res;
    })
  },

  methods : {
    getCardHeader (note) {
      return note.toString();
    },
    getCardColor (note) {
      return utils.getCardColor(note);
    },
    getCardHeaderTextColor (note) {
      return utils.getCardHeaderTextColor(note);
    },
    getLearnerDetails (learner) {
      return utils.getLearnerDetails(learner);
    }
  }
}
</script>
