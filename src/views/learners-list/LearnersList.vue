<template>
  <div class="m-3">
    <div class="d-flex mb-3">
      <h3>Liste des élèves</h3>
      <learner-form-modal class="ml-auto my-auto"/>
    </div>
    <div v-if="getLearnersWithAverageNote.length">
      <b-container v-b-visible="tableVisibleHandler" fluid class="px-0 d-none d-md-block table-container">
        <b-table
          ref="table" 
          :items="getLearnersWithAverageNote" 
          :fields="tableFields" 
          :tbody-tr-class="getRowColor"
          head-variant="light"
        >
          <template #cell(initials)="data">
            <b-avatar :text="data.item.initials" />
          </template>
          <template #cell(actions)="data">
            <div class="d-flex justify-content-end">
              <learner-list-actions 
                v-if="isTableVisible" 
                :learner="data.item" 
                @note-added="refreshTable"
              />
            </div>
          </template>
        </b-table>
      </b-container>
      <b-container fluid class="px-0 d-md-none">
        <b-row class="mb-3">
          <b-col 
            v-for="LearnerWithAverageNote of getLearnersWithAverageNote"
            :key="LearnerWithAverageNote.id"
            lg="4"
            md="6"
            class="p-3"
          >
            <b-card align="center" no-body>
              <b-card-header
                :border-variant="getCardColor(LearnerWithAverageNote.averageNote)"
                :header-bg-variant="getCardColor(LearnerWithAverageNote.averageNote)"
                class="mb-3"
                variant="info" 
              >
                <b-avatar :text="LearnerWithAverageNote.initials" />
              </b-card-header>
              <b-card-title>
                {{ getCardHeader(LearnerWithAverageNote) }}
              </b-card-title>
              <b-card-sub-title>
                Note moyenne :
              </b-card-sub-title>
              <b-card-text>
                {{ getFormattedAverageNote(LearnerWithAverageNote.averageNote) }}
              </b-card-text>
              <div class="d-flex justify-content-center mb-3">
                <learner-list-actions v-if="!isTableVisible" :learner="LearnerWithAverageNote" />
              </div>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <p
      v-if="!getLearnersWithAverageNote.length"
      class="d-flex justify-content-center"
    >
      {{ getNoLearnerLabel }}
    </p>
  </div>
</template>

<script>
import store              from '../../stores/learners/store.js';
import constants          from '../../common/constants.js';
import utils              from '../../common/utils.js';
import learnerFormModal   from './components/LearnerFormModal.vue';
import learnerListActions from './components/LearnerListActions.vue';
import dayjs              from 'dayjs';

export default {
  name : 'learners-list',
  components: { 
    learnerFormModal,
    learnerListActions
  },
  store,
  data () {
    return {
      isTableVisible : false,
      tableFields    : [
        {
          key     : 'initials',
          label   : '',
          tdClass : 'align-middle',
        },
        {
          key     : 'lastName',
          label   : 'Nom',
          tdClass : 'align-middle'
        },
        {
          key     : 'firstName',
          label   : 'Prénom',
          tdClass : 'align-middle'
        },
        {
          key       : 'birthDate',
          label     : 'Date de naissance',
          tdClass   : 'align-middle',
          formatter : (value) => {
            return dayjs(value).format('DD/MM/YYYY')
          }
        },
        {
          key       : 'averageNote',
          label     : 'Note moyenne',
          tdClass   : 'align-middle',
          formatter : (value) => {
            return this.getFormattedAverageNote(value);
          }
        },
        {
          key     : 'actions',
          label   : '',
          tdClass : 'align-middle',
          class   : 'text-right'
        }
      ]
    };
  },

  computed : {
    getLearnersWithAverageNote () {
      const learnersWithAverageNote = store.getters.learnersWithNotes;
      for (const learner of learnersWithAverageNote) {
        let notes = [];
        for (const note of learner.notes) {
          notes.push(note.value);
        }
        const sum           = notes.reduce((a, b) => a + b, 0);
        learner.averageNote = (sum / notes.length) || constants.NO_NOTE.value;
        learner.initials    = this.getInitials(learner.lastName, learner.firstName);
      }
      return learnersWithAverageNote;
    },
    getNoLearnerLabel () {
      return constants.NO_LEARNER.label;
    }
  },

  methods: {
    getInitials (lastName, firstName) {
      return firstName.slice(0, 1) + lastName.slice(0, 1);
    },
    getFormattedAverageNote (note) {
      if (note % 1 != 0) note = note.toFixed(2);
      return note > -1 ? note : constants.NO_NOTE.label;
    },
    getRowColor (learnerWithNotes, type) {
      return utils.getRowColor(learnerWithNotes.averageNote, type);
    },
    refreshTable () {
      this.$refs.table.refresh();
    },
    getCardHeader (learner) {
      return utils.getLearnerDetails(learner);
    },
    getCardColor (averageNote) {
      return utils.getCardColor(averageNote);
    },
    tableVisibleHandler (isVisible) {
      this.isTableVisible = isVisible; 
    }
  }
};
</script>
