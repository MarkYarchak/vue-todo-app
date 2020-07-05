<template>
  <div class="form-card full-width">
    <!-- Component with actions to save note, delete note and discard changes -->
    <ActionsTopBar
      @save-note="saveNoteProxy"
      @delete-note="deleteNoteDialogHandler"
    />

    <!-- Component for visualizing or editing note title -->
    <EditorCardNoteTitle
      :note="availableExistingNote"
    />
    <div style="border-bottom: 1px solid black; margin: 2px 0;" />
    <div class="d-flex align-center">
      <h2>TODO tasks</h2>
      <div style="flex-grow: 1;" />

      <!-- Create new TODO button-->
      <button
        class="d-flex align-center add-todo-btn"
        @click="openCreateTodoDialog"
      >
        <font-awesome-icon :icon="['fas', 'plus']" />
        <span style="margin-left: 10px; font-weight: bold;">ADD</span>
      </button>
      <div
        style="width: 20px;"
        class="hidden-xs"
      />
    </div>
    <div>
      <OneTodoTask
        v-for="(todo, todoI) in noteTodos"
        :key="todoI"
        :todo="todo"
        :todo-index="todoI"
      />
    </div>
    <DeleteNoteModal
      v-if="deleteNoteDialog.active"
      :note-id="deleteNoteDialog.noteId"
      @close="deleteNoteDialog.active = false"
      @deleted="onNoteDeleted"
    />
    <!--    <div class="fab btn-undo">-->
    <!--      <div class="icon-btn">-->
    <!--        <font-awesome-icon-->
    <!--          :icon="['fas', 'undo-alt']"-->
    <!--          style="font-size: 20px;"-->
    <!--        />-->
    <!--      </div>-->
    <!--    </div>-->
    <!--    <div class="fab btn-redo">-->
    <!--      <div class="icon-btn">-->
    <!--        <font-awesome-icon-->
    <!--          :icon="['fas', 'redo-alt']"-->
    <!--          style="font-size: 20px;"-->
    <!--        />-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>

<script>
import OneTodoTask from './OneTodoTask.vue';
import ActionsTopBar from './ActionsTopBar.vue';
import EditorCardNoteTitle from './EditorCardNoteTitle.vue';
import editNoteStateController from '../../helpers/edit-note-state.controller';
import DeleteNoteModal from '../DeleteNoteModal.vue';

export default {
  name: 'NoteEditorFormCard',
  components: {
    DeleteNoteModal,
    EditorCardNoteTitle,
    ActionsTopBar,
    OneTodoTask,
  },
  mixins: [editNoteStateController],
  data() {
    return {
      editableNoteId: this.$route.query.id,
      deleteNoteDialog: {
        active: false,
        noteId: '',
      },
    };
  },
  computed: {
    notesList() {
      return this.$store.state.notesList;
    },
    noteTodos() {
      return [
        {
          title: 'Do something',
        },
        {
          title: 'Do awesome',
        },
        {
          title: 'Do nothing',
        },
      ];
    },
    availableExistingNote() {
      return this.notesList.find((n) => n.id === this.editableNoteId);
    },
    editableNote: {
      get() {
        return this.availableExistingNote ? this.$store.state.currentCreatingNote
          : this.$store.state.notesList;
      },
      set({ id }) {
        this.$store.state.dispatch('', id);
      },
    },
  },
  methods: {
    deleteNoteDialogHandler() {
      this.deleteNoteDialog = {
        active: true,
        noteId: this.editableNoteId,
      };
    },
    onNoteDeleted() {
      this.$router.push('/');
    },
    openCreateTodoDialog() {},
    saveNoteProxy() {
      const id = this.editableNoteId;
      const note = '';
      if (note) this.updateExistingNote(note.id);
      else this.storeNewNote(id);
    },
    updateExistingNote(noteId) {
      console.log(noteId);
    },
    storeNewNote(id) {
      console.log(id);

      // clear create note form in store
    },
  },
};
</script>

<style lang="stylus" scoped>
  .form-card {
    max-width 900px
    /*max-height calc(100vh - 100px)
    height calc(100vh - 100px)*/
    padding: 8px
    border-radius: 8px
    /*border 1px solid black*/
    flex-grow: 1
    /* 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)*/
    box-shadow: 0 3px 9px 1px rgba(0,0,0,.3),0 5px 10px 0 rgba(0,0,0,.06);
  }

  .add-todo-btn {
    padding: 6px 20px;
    border: 1px solid #2196F3
    border-radius: 4px
    color white
    font-size: 16px
    background-color: #2196F3
    box-shadow 0 2px 5px 1px rgba(0,0,0,.2),
    0 3px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12)
    &:active {
      outline none
      box-shadow 0 2px 4px -1px rgba(0,0,0,.2),
      0 4px 5px 0 rgba(0,0,0,.14)
      border none
      margin-right: 1px;
    }
    &:focus {
      outline none
    }
  }

  .fab {
    position fixed
  }

  .icon-btn {
    border-radius: 50%
    padding: 15px
    color white
    background-color: #039BE5
    border: 1px solid #039BE5
    box-shadow 0 0 2px 2px rgba(128, 128, 128, 0.42)
    transition 0.2s
  }

  .icon-btn:active {
    box-shadow none
    border: none
  }

  .btn-undo {
    right: 80px
    bottom: 14px
  }

  .btn-redo {
    right: 16px
    bottom: 14px
  }
</style>
