<template>
<div>
  <h1>Learners list</h1>
  <b-table :items="learnersWithAverageNote" :fields="tableFields"></b-table>
</div>
</template>

<script>
import store          from '../../stores/learners/learners.js';
import { mapGetters } from 'vuex';

export default {
  store,
  data () {
    return {
      tableFields : ['firstName', 'lastName', 'birthDate', 'averageNote', 'actions']
    };
  },
  computed : {
    ...mapGetters(['learnersWithAverageNote']),
  }
};
</script>

<style scoped>
</style>
