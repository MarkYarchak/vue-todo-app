<template>
  <transition name="modal">
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
            Are you really want to delete this note?
          </div>

          <div class="modal-body">
            <slot name="body">
              {{ note.title || 'untitled' }}
            </slot>
          </div>

          <div class="modal-actions">
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
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'DeleteNoteModal',
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
  beforeMount() {
    window.addEventListener('keydown', this.closeOnEsc, true);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.closeOnEsc, true);
  },
  methods: {
    deleteNoteFinally() {
      this.$emit('close');
      this.$emit('deleted');
      this.$store.dispatch('deleteNote', this.noteId);
    },
    closeOnEsc($event) {
      if ($event.code === 'Escape') this.$emit('close');
    },
  },
};
</script>

<style lang="stylus" scoped>
  .modal-mask {
    position: fixed;
    display: flex
    justify-content: center
    align-items: center
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .modal-container {
    /*width: 100%*/
    padding: 10px 20px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
    &-wrapper {
      max-width: 400px;
      padding: 10px
      /*padding: 10px*/
    }
  }

  .modal-header {
    padding: 10px 5px 0
    font-size: 20px
    font-weight bold
  }

  .modal-body {
    margin: 20px 0;
    padding: 10px
    border-left: 2px solid black
  }

  .modal-actions {
    display: flex
    padding: 5px 0
  }

  .modal-button {
    border-radius: 4px
    font-size 16
    text-transform uppercase
    padding: 8px 12px
    outline none
    /*border none*/
    font-weight bold
    border 1px solid gray
  }

  .modal-button:focus {
    outline none
  }

  .delete-btn {
    color: white
    background-color: red
  }

  .cancel-btn {
    color black
  }

</style>
