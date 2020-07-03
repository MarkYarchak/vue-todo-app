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
      />
    </div>
    <DeleteModal
      v-if="deleteModal"
      @close="deleteModal = false"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import OneListNote from '@/components/main-page/OneListNote.vue';
import DeleteModal from '@/components/main-page/DeleteModal.vue';

export default {
  name: 'MainTodoList',
  components: {
    DeleteModal,
    OneListNote,
  },
  data() {
    return {
      deleteModal: false,
    };
  },
  computed: {
    ...mapGetters([
      'notesList',
    ]),
  },
};
</script>
