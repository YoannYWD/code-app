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
            :state="getNumberInputState"
            aria-describedby="value-input-live-feedback"
            :min="NOTE_RANGE.min" 
            :max="NOTE_RANGE.max"
            required
          ></b-form-input>
          <b-form-invalid-feedback id="value-input-live-feedback">
            {{ getValueInputLiveFeedback }}
          </b-form-invalid-feedback>
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
      NOTE_RANGE          : constants.NOTE_RANGE,
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
    },
    getNumberInputState () {
      return this.value > -1 && this.value < 41 ? null : false
    },
    getValueInputLiveFeedback () {
      return this.NOTE_RANGE.label;
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
