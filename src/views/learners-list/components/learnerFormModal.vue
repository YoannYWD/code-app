<template>
  <div>
    <b-button v-b-modal.learner-form-modal variant="outline-info">
      <b-icon icon="plus" aria-hidden="true" />
      Ajouter un élève
    </b-button>
    <b-modal 
      id="learner-form-modal"
      ref="learner-form-modal" 
      title="Ajouter un élève"
      header-bg-variant="info"
      header-text-variant="light"
      hide-footer
    >
      <form ref="form">
        <b-form-group
          :invalid-feedback="invalidFormFeedback"
          :state="isFormValid"
        >
          <label for="last-name-input">Nom</label>
          <b-form-input
            id="last-name-input"
            type="text"
            v-model="lastName"
            @update="resetError"
            required
          ></b-form-input>
          <label for="first-name-input" class="mt-3">Prénom</label>
          <b-form-input
            id="first-name-input"
            type="text"
            v-model="firstName"
            @update="resetError"
            required
          ></b-form-input>
          <label for="birth-date-input" class="mt-3">Date de naissance</label>
          <b-form-input
            id="birth-date-input"
            type="date"
            v-model="birthDate"
            @update="resetError"
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
import store          from '../../../stores/learners/store.js';
import constants      from '../../../common/constants.js';
import { mapGetters } from 'vuex';

export default {
  name : 'learner-form-modal',
  store,
  data () {
    return {
      lastName            : '',
      firstName           : '',
      birthDate           : '',
      isFormValid         : true,
      invalidFormFeedback : ''
    }
  },

  computed : {
    ...mapGetters(['learnersWithNotes'])
  },

  methods : {
    resetError () {
      this.isFormValid         = true;
      this.invalidFormFeedback = '';
    },
    resetForm () {
      this.lastName            = '';
      this.firstName           = '';
      this.birthDate           = '';
      this.invalidFormFeedback = '';
      this.isFormValid         = true;
    },
    hideModalAndResetForm () {
      this.$refs['learner-form-modal'].hide();
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
      this.isFormValid         = true;
      if (!this.checkFormValidity()) {
        this.invalidFormFeedback = constants.INCOMPLETE_FORM.label
        return;
      }
      store.dispatch('addLearner', {
        lastName  : this.lastName,
        firstName : this.firstName,
        birthDate : this.birthDate
      }).then(res => {
        if (res.error.message) {
          this.invalidFormFeedback = res.error.message;
          this.isFormValid         = false;
          return;
        }
        this.$nextTick(() => {
          this.hideModalAndResetForm();
        })
      });
    }
  }
}
</script>
