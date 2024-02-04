<template>
  <div>
    <b-button v-b-modal="getModalId" variant="outline-info" title="Ajouter une note">
      <b-icon icon="plus" aria-hidden="true" />
    </b-button>
    <b-modal 
      :id="getModalId"
      ref="add-note-modal" 
      :title="getModalTitle"
      header-bg-variant="info"
      header-text-variant="light"
      hide-footer
    >
      <form ref="form">
        <b-form-group
          :invalid-feedback="invalidFormFeedback"
          :state="isFormValid"
        >
          <label for="date-input">Date</label>
          <b-form-input
            id="date-input"
            type="date"
            v-model="inputDate"
            required
          ></b-form-input>
          <label for="value-input" class="mt-3">Note</label>
          <b-form-input
            id="value-input"
            type="number"
            v-model="value"
            required
          ></b-form-input>
        </b-form-group>
      </form>
      <div class="mt-3 d-flex justify-content-end">
        <b-button 
          @click="cancelForm"
        >
          Annuler
        </b-button>
        <b-button
          class="ml-1" 
          variant="info"
          @click="saveForm"
        >
          Enregistrer
        </b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import store     from '../../../stores/learners/store.js';
import constants from '../../../common/constants.js';
import dayjs     from 'dayjs';

const TODAY = dayjs().format('YYYY-MM-DD');

export default {
  name : 'add-note-modal',
  store,
  props : {
    learner : {
      type    : Object,
      default : function () { return {}; }
    }
  },
  data () {
    return {
      inputDate           : TODAY,
      value               : '',
      isFormValid         : true,
      invalidFormFeedback : ''
    }
  },

  computed : {
    getModalId () {
      return 'add-note-modal-' + this.learner.id;
    },
    getModalTitle () {
      return 'Ajouter une note à ' + this.learner.lastName + ' ' + this.learner.firstName;
    }
  },

  methods : {
    resetForm () {
      this.inputDate           = TODAY;
      this.value               = '';
      this.isFormValid         = true;
      this.invalidFormFeedback = '';
    },
    hideModalAndResetForm () {
      this.$refs['add-note-modal'].hide();
      this.resetForm();
    },
    cancelForm () {
      this.hideModalAndResetForm();
    },
    checkFormValidity() {
      const valid      = this.$refs.form.checkValidity();
      this.isFormValid = valid;
      return valid;
    },
    saveForm () {
      this.invalidFormFeedback = '';
      if (!this.checkFormValidity()) {
        this.invalidFormFeedback = constants.INCOMPLETE_FORM.label
        return;
      }
      store.dispatch('addNote', {
        learnerId : this.learner.id,
        inputDate : this.inputDate,
        value     : parseInt(this.value)
      }).then(res => {
        if (res.error.message) {
          return;
        }
        this.$nextTick(() => {
          this.hideModalAndResetForm();
          this.$emit('note-added');
        })
      });
    }
  }
}
</script>
