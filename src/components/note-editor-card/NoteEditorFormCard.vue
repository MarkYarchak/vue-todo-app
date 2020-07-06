<template>
  <div class="form-card full-width">
    <!-- Component with actions to save note, delete note and discard changes -->
    <ActionsTopBar
      :editor-controller="editorController"
      :allow-undo="allowUndo"
      :allow-redo="allowRedo"
      :undo-edit="undoEdit"
      :redo-edit="redoEdit"
      :create-mode-note="createModeNote"
      @save-note="saveNoteProxy"
      @delete-note="deleteNoteDialogHandler"
      @discard-changes="discardChangesDialog = true"
    />

    <!-- Component for visualizing or editing note title -->
    <EditorCardNoteTitle
      :title="currentEditState.title"
      @update-title="updateNoteTitle"
    />
    <div style="border-bottom: 1px solid black; margin: 2px 0;" />
    <div class="d-flex align-center">
      <h2>TODO tasks</h2>
      <div style="flex-grow: 1;" />

      <!-- Create new TODO button-->
      <button
        class="d-flex align-center add-todo-btn"
        @click="addNewTodoHandler"
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
        v-for="(todo, todoI) in currentEditState.tasks"
        :key="todoI"
        :todo="todo"
        @switch-check="todoSwitchCheck"
        @edit="openEditTodoDialog"
        @delete="deleteTodoItem"
      />
    </div>

    <SubmitModal
      v-if="discardChangesDialog"
      submit-bg-color="orange"
      @submit-action="submitDiscardChangesDialog"
      @close="discardChangesDialog = false"
    />
    <SubmitModal
      v-if="editTodoTask.activeDialog"
      @submit-action="updateTodoItem"
      @close="closeUpdateTodoDialog"
    >
      <template v-slot:header>Create new task TODO</template>
      <template v-slot:modal-body>
        <div style="padding: 20px 0;">
          <input
            id="submit-todo-modal-input"
            v-model="editTodoTask.inputHandler"
            type="text"
            class="create-todo-input"
          >
        </div>
      </template>
    </SubmitModal>
    <DeleteNoteModal
      v-if="deleteNoteDialog.active"
      :note-id="deleteNoteDialog.noteId"
      @close="deleteNoteDialog.active = false"
      @deleted="onNoteDeleted"
    />
  </div>
</template>

<script>
import OneTodoTask from './OneTodoTask.vue';
import ActionsTopBar from './ActionsTopBar.vue';
import EditorCardNoteTitle from './EditorCardNoteTitle.vue';
import editNoteStateController from '../../helpers/edit-note-state.controller';
import DeleteNoteModal from '../DeleteNoteModal.vue';
import SubmitModal from './SubmitModal.vue';

export default {
  name: 'NoteEditorFormCard',
  components: {
    DeleteNoteModal,
    EditorCardNoteTitle,
    ActionsTopBar,
    OneTodoTask,
    SubmitModal,
  },
  mixins: [editNoteStateController],
  data() {
    return {
      editTodoTask: {
        id: '',
        inputHandler: '',
        activeDialog: '',
      },
      discardChangesDialog: false,
      editableNoteId: this.$route.query.id,
      deleteNoteDialog: {
        active: false,
        noteId: '',
      },
    };
  },
  computed: {
    // all notes list from global store
    notesList() {
      return this.$store.state.notesList;
    },
    createModeNote() {
      return this.$store.state.newlyCreatedNote;
    },
    availableExistingNote() {
      return this.notesList.find((n) => n.id === this.editableNoteId);
    },
  },
  methods: {
    closeUpdateTodoDialog() {
      this.editTodoTask.activeDialog = false;
    },
    addNewTodoHandler() {
      this.editTodoTask.activeDialog = true;
      this.$nextTick(() => {
        document.getElementById('submit-todo-modal-input').focus();
      });
    },
    openEditTodoDialog(id) {
      const task = this.editNoteInstance.tasks.find((t) => t.id === id);

      this.editTodoTask = {
        id: task.id,
        inputHandler: task.title,
        activeDialog: true,
      };
      this.$nextTick(() => {
        document.getElementById('submit-todo-modal-input').focus();
      });
    },
    deleteNoteDialogHandler() {
      this.deleteNoteDialog = {
        active: true,
        noteId: this.editableNoteId,
      };
    },
    onNoteDeleted() {
      this.$router.push('/');
    },
  },
};
</script>

<style lang="stylus" scoped>
  .form-card {
    max-width 900px
    padding: 8px
    border-radius: 8px
    flex-grow: 1
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

  .create-todo-input {
    flex-grow: 1
    min-width: 280px
    padding: 4px 7px
    font-size: 15px
  }

</style>
