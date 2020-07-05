<template>
  <div
    style="max-width: 94vw"
    class="d-flex justify-center full-width"
  >
    <div class="d-flex flex-column align-center full-width pt-2 pb-2">
      <OneListNote />
      <OneListNote
        v-for="(note, index) in notesList"
        :key="index"
        :note="note"
        @delete-note="deleteNoteHandler"
      />
    </div>
    <DeleteNoteModal
      v-if="deleteModal.active"
      :note-id="deleteModal.noteId"
      @close="deleteModal.active = false"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import OneListNote from '@/components/main-page/OneListNote.vue';
import DeleteNoteModal from '@/components/DeleteNoteModal.vue';

export default {
  name: 'MainTodoList',
  components: {
    DeleteNoteModal,
    OneListNote,
  },
  data() {
    return {
      deleteModal: {
        noteId: '',
        active: false,
      },
    };
  },
  computed: {
    ...mapGetters([
      'notesList',
    ]),
  },
  methods: {
    deleteNoteHandler(noteId) {
      this.deleteModal = {
        noteId,
        active: true,
      };
    },
  },
};
</script>
