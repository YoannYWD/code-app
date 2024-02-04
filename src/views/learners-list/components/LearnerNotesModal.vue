<template>
  <div>
    <b-button @click="showModal" variant="outline-info" title="Voir les notes">
      <b-icon icon="eye" aria-hidden="true" />
    </b-button>
    <b-modal 
      ref="learner-notes-modal" 
      :title="getModalTitle"
      header-bg-variant="info"
      header-text-variant="light"
      hide-footer
    >
      <b-table 
        :items="getLearnerNotes" 
        :fields="tableFields" 
        :tbody-tr-class="getRowColor"
        head-variant="light"
      />
      <div class="mt-3 d-flex justify-content-end">
        <b-button 
          @click="close"
        >
          Fermer
        </b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import store from '../../../stores/learners/store.js';
import utils from '../../../common/utils.js';

export default {
  name : 'learner-notes-modal',
  store,
  props : {
    learner : {
      type    : Object,
      default : function () { return {}; }
    }
  },
  data () {
    return {
      notes       : [],
      tableFields : [
        {
          key : 'inputDate',
          label : 'Date'
        },
        {
          key : 'value',
          label : 'Note'
        }
      ]
    }
  },

  computed : {
    getLearnerNotes () {
      return store.getters.learnerNotes;
    },
    getModalTitle () {
      return this.learner.lastName + ' ' + this.learner.firstName + ' - Notes' ;
    }
  },

  methods : {
    close () {
      this.$refs['learner-notes-modal'].hide();
    },
    getRowColor(notes, type) {
      return utils.getRowColor(notes.value, type);
    },
    showModal () {
      store.dispatch('sortLearnerNotes', this.learner.notes).then(res => {
        this.$refs['learner-notes-modal'].show();
      });
    }
  }
}
</script>
