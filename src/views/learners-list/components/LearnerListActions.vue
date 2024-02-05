<template>
  <div class="d-flex">
    <learner-notes-modal :learner="learner" />
    <add-note-modal 
      :learner="learner"
      class="ml-1"
      @note-added="refreshTable()" 
    />
    <delete-learner-modal :learner="learner" class="ml-1" />
  </div>
</template>

<script>
import learnerNotesModal  from './LearnerNotesModal.vue';
import addNoteModal       from './AddNoteModal.vue';
import deleteLearnerModal from './DeleteLearnerModal.vue';

export default {
  name       : 'learner-list-actions',
  components : {
    learnerNotesModal,
    addNoteModal,
    deleteLearnerModal
  },
  props : {
    learner : {
      type    : Object,
      default : function () { return {}; }
    },
    openFrom : {
      type : String
    }
  },
  data () {
    return {};
  },
  methods : {
    refreshTable () {
      this.$emit('note-added');
    }
  },
}
</script>
