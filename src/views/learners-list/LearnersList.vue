<template>
  <div class="m-3">
    <div class="d-flex mb-3">
      <h1>Liste des élèves</h1>
      <b-button variant="outline-info" class="ml-auto">Ajouter un élève</b-button>
    </div>
    <b-table 
      :items="learnersWithAverageNote" 
      :fields="tableFields" 
      :tbody-tr-class="getRowColor"
      head-variant="light"
    >
      <template #cell(actions)="data">
        <!-- {{ data.item.name.first }} is {{ data.item.age }} years old -->
        <b-button title="Voir les notes">
          <b-icon icon="eye" aria-hidden="true"></b-icon>
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import store          from '../../stores/learners/index.js';
import { mapGetters } from 'vuex';

export default {
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
          label : 'Note moyenne'
        },
        {
          key : 'actions',
          label : 'Actions'
        }
      ]
    };
  },

  computed : {
    ...mapGetters(['learnersWithAverageNote']),
  },

  methods: {
    getRowColor(learnerWithAverageNote, type) {
      if (!learnerWithAverageNote || type !== 'row') return;
      if (learnerWithAverageNote.averageNote > 34) return 'table-success';
      if (learnerWithAverageNote.averageNote < 20) return 'table-danger';
    }
  }
};
</script>
