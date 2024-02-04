<template>
  <div class="m-3">
    <div class="d-flex mb-3">
      <h1>Liste des élèves</h1>
      <learner-form-modal class="ml-auto my-auto"/>
    </div>
    <b-table 
      :items="getLearnersWithAverageNote" 
      :fields="tableFields" 
      :tbody-tr-class="getRowColor"
      head-variant="light"
    >
      <template #cell(actions)="data">
        <!-- {{ data.item.name.first }} is {{ data.item.age }} years old -->
        <b-button variant="outline-info" title="Voir les notes">
          <b-icon icon="eye" aria-hidden="true" />
        </b-button>
        <b-button variant="outline-info" title="Ajouter une note" class="ml-1">
          <b-icon icon="plus" aria-hidden="true" />
        </b-button>
        <b-button variant="outline-danger" title="Supprimer l'élève" class="ml-1">
          <b-icon icon="trash" aria-hidden="true" />
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import store            from '../../stores/learners/store.js';
import constants        from '../../common/constants.js';
import learnerFormModal from './components/learnerFormModal.vue';

export default {
  components: { learnerFormModal },
  store,
  data () {
    return {
      tableFields : [
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
          label : 'Date de naissance'
        },
        {
          key : 'averageNote',
          label : 'Note moyenne',
          formatter :  (value) => {
              return value > 0 ? value : constants.NO_NOTE.label;
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
        learner.averageNote = (sum / notes.length) || 0;
      }
      return learnersWithAverageNote;
    }
  },

  methods: {
    getRowColor(learnerWithNotes, type) {
      if (!learnerWithNotes || type !== 'row') return;
      if (learnerWithNotes.averageNote > 35) return 'table-success';
      if (learnerWithNotes.averageNote < 20 && learnerWithNotes.averageNote > 0) return 'table-danger';
    }
  }
};
</script>
