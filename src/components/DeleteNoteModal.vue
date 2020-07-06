<template>
  <div
    class="modal-mask"
    @click="$emit('close')"
  >
    <div class="modal-container-wrapper">
      <div
        class="modal-container"
        @click.stop=""
      >
        <div class="modal-header">
          <slot name="header">
            Are you really want to delete this note?
          </slot>
        </div>

        <div class="modal-body">
          <slot name="body">
            {{ note.title || 'untitled' }}
          </slot>
        </div>

        <div class="modal-actions">
          <slot name="actions">
            <button
              class="modal-button delete-btn"
              @click="deleteNoteFinally"
            >
              Delete
            </button>
            <div style="flex-grow: 1;" />
            <button
              class="modal-button cancel-btn"
              @click="$emit('close')"
            >
              Cancel
            </button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import closeOnEsc from '../helpers/close-on-esc';

export default {
  name: 'DeleteNoteModal',
  mixins: [closeOnEsc],
  props: {
    noteId: {
      type: String,
      default: '',
    },
  },
  computed: {
    note() {
      return this.$store.state.notesList.find((n) => n.id === this.noteId)
        || this.$store.state.newlyCreatedNote;
    },
  },
  methods: {
    deleteNoteFinally() {
      this.$emit('close');
      this.$emit('deleted');
      this.$store.dispatch('deleteNote', this.noteId);
    },
  },
};
</script>

<style lang="stylus" scoped>

  .modal-body {
    border-left: 2px solid black;
  }

  .delete-btn {
    color: white
    background-color: red
  }

  .cancel-btn {
    color black
  }

</style>
