<template>
  <div class="m-3">
    <div class="d-flex mb-3">
      <h1>Liste des élèves</h1>
      <learner-form-modal class="ml-auto my-auto"/>
    </div>
    <b-table
      ref="table" 
      :items="getLearnersWithAverageNote" 
      :fields="tableFields" 
      :tbody-tr-class="getRowColor"
      head-variant="light"
    >
      <template #cell(initials)="data">
        <b-avatar variant="info" :text="data.item.initials" />
      </template>
      <template #cell(actions)="data">
        <div class="d-flex justify-content-end">
          <learner-notes-modal :learner="data.item" />
          <add-note-modal 
            :learner="data.item"
            class="ml-1"
            @note-added="refreshTable()" 
          />
          <delete-learner-modal :learner="data.item" class="ml-1" />
        </div>
      </template>
    </b-table>
  </div>
</template>

<script>
import store              from '../../stores/learners/store.js';
import constants          from '../../common/constants.js';
import utils              from '../../common/utils.js';
import learnerFormModal   from './components/LearnerFormModal.vue';
import learnerNotesModal  from './components/LearnerNotesModal.vue';
import addNoteModal       from './components/AddNoteModal.vue';
import deleteLearnerModal from './components/DeleteLearnerModal.vue';
import dayjs              from 'dayjs';

export default {
  components: { 
    learnerFormModal,
    learnerNotesModal,
    addNoteModal,
    deleteLearnerModal
  },
  store,
  data () {
    return {
      tableFields : [
        {
          key : 'initials',
          label : ''
        },
        {
          key : 'lastName',
          label : 'Nom'
        },
        {
          key : 'firstName',
          label : 'Prénom'
        },
        {
          key : 'birthDate',
          label : 'Date de naissance',
          formatter : (value) => {
            return dayjs(value).format('DD/MM/YYYY')
          }
        },
        {
          key : 'averageNote',
          label : 'Note moyenne',
          formatter : (value) => {
            return value > -1 ? value : constants.NO_NOTE.label;
          }
        },
        {
          key : 'actions',
          label : '',
          class: 'text-right'
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
        learner.averageNote = (sum / notes.length) || -1;
        if (learner.averageNote % 1 != 0) {
          learner.averageNote = learner.averageNote.toFixed(2);
        }
        learner.initials = this.getInitials(learner.lastName, learner.firstName);
      }
      return learnersWithAverageNote;
    }
  },

  methods: {
    getInitials (lastName, firstName) {
      return firstName.slice(0, 1) + lastName.slice(0, 1);
    },
    getRowColor (learnerWithNotes, type) {
      return utils.getRowColor(learnerWithNotes.averageNote, type);
    },
    refreshTable () {
      this.$refs.table.refresh();
    }
  }
};
</script>
