<template>
  <div>
    <b-button v-b-modal="getModalId" variant="outline-danger" title="Supprimer l'élève">
      <b-icon icon="trash" aria-hidden="true" />
    </b-button>
    <b-modal 
      :id="getModalId"
      ref="delete-learner-modal" 
      title="Supprimer un élève"
      header-bg-variant="info"
      header-text-variant="light"
      hide-footer
    >
      <p class="my-4">{{ getModalMessage }}</p>
      <div class="mt-3 d-flex justify-content-end">
        <b-button 
          @click="cancel"
        >
          Non
        </b-button>
        <b-button 
          class="ml-1" 
          variant="info"
          @click="confirm"
        >
          Oui
        </b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import store from '../../../stores/learners/store.js';

export default {
  name : 'delete-learner-modal',
  store,
  props : {
    learner : {
      type    : Object,
      default : function () { return {}; }
    }
  },
  data () {
    return {
    }
  },

  computed : {
    getModalId () {
      return 'delete-learner-modal-' + this.learner.id;
    },
    getModalMessage () {
      return 'Êtes vous sûr de vouloir supprimer ' + this.learner.firstName + ' ' + this.learner.lastName + ' ?';
    }
  },

  methods : {
    cancel () {
      this.$refs['delete-learner-modal'].hide();
    },
    confirm () {
      store.dispatch('deleteLearner', this.learner).then(res => {
        if (res.error.message) {
          return;
        }
        this.$refs['delete-learner-modal'].hide();
      });
    }
  }
}
</script>
