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
            :header="getHeader(learnersByNote.note)"
            :border-variant="getCardColor(learnersByNote.note)"
            :header-bg-variant="getCardColor(learnersByNote.note)"
            :header-text-variant="getHeaderTextColor(learnersByNote.note)"
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
import dayjs from 'dayjs';

export default {
  name : 'learner-notes-modal',
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
    getHeader (note) {
      return note.toString();
    },
    getCardColor (note) {
      return utils.getCardColor(note);
    },
    getHeaderTextColor (note) {
      if (note > 35 || note < 20) return 'light';
      return;
    },
    getLearnerDetails (learner) {
      return learner.lastName + ' ' + learner.firstName + ' ' + dayjs(learner.birthDate).format('DD/MM/YYYY');
    }
  }
}
</script>
