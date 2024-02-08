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
        v-if="getLearnerNotes.length"
        :items="getLearnerNotes" 
        :fields="tableFields" 
        :tbody-tr-class="getRowColor"
        head-variant="light"
      />
      <p
        v-if="!getLearnerNotes.length"
        class="d-flex justify-content-center"
      >
        {{ getNoNoteLabel }}
      </p>
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
import store     from '../../../stores/learners/store.js';
import utils     from '../../../common/utils.js';
import constants from '../../../common/constants';
import dayjs     from 'dayjs';

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
          key       : 'inputDate',
          label     : 'Date',
          tdClass   : 'align-middle',
          formatter : (value) => {
            return dayjs(value).format('DD/MM/YYYY')
          }
        },
        {
          key     : 'value',
          label   : 'Note',
          tdClass : 'align-middle'
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
    },
    getNoNoteLabel () {
      return constants.NO_NOTE.label;
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
