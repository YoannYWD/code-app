<template>
  <div class="m-3">
    <div class="d-flex mb-3">
      <h1>Liste des élèves</h1>
      <learner-form-modal class="ml-auto my-auto"/>
    </div>
    <b-table 
      :items="learnersWithNotes" 
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
import store            from '../../stores/learners/index.js';
import { mapGetters }   from 'vuex';
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
    ...mapGetters(['learnersWithNotes']),
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
