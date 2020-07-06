/**
* Controller for managing temporary states for storage
* */

import { v4 } from 'uuid';

// edit note helper mixin
export default {
  data() {
    return {
      // default note state
      editNoteInstance: {
        // get id from query params in browser path
        id: this.$route.query.id,
        title: '',
        tasks: [],
      },

      editorController: {
        // store for current note state (receive link in constructor)
        noteInstance: {},
        // list of states, where stored new data after every update operation of editNoteInstance
        editStates: [],
        // edit state iteration
        editIndex: -1,
        // max edit state iteration
        maxEditIndex: 0,
      },
    };
  },
  computed: {

    currentEditState() {
      // determine current editable state from states list
      console.log(this.editorController.editStates);
      console.log(this.editorController.editIndex);
      const data = this.editorController.editStates[this.editorController.editIndex];
      return JSON.parse(data || JSON.stringify({ title: '' }));
    },

    // allow undo operation for browser user
    allowUndo() {
      return this.editorController.editIndex > 0;
    },

    // allow redo operation for browser user
    allowRedo() {
      return this.editorController.editIndex < this.editorController.maxEditIndex
        && (this.editorController.editIndex >= 0 && !!this.editorController.editStates.length);
    },

  },
  beforeMount() {
    const note = this.availableExistingNote || this.createModeNote;
    this.editNoteInstance = { ...note };
    this.editorController.noteInstance = { ...this.editNoteInstance };
    this.addNewInstance();
  },
  methods: {

    // decrement index for links on older saved states
    undoEdit() {
      if (this.allowUndo) this.editorController.editIndex -= 1;
    },

    // increment redo index for link on "upper" saved state
    redoEdit() {
      if (this.allowRedo) this.editorController.editIndex += 1;
    },

    // trigger on manual changes and state update after undo operation (for disable redo)
    clearInstancesAfterIndex() {
      const index = this.editorController.editIndex;
      if (this.editorController.maxEditIndex > index) {
        const len = this.editorController.editStates.length;
        this.editorController.editStates.splice(index, len);
      }
    },

    // clear and update state finally (discard changes operation), new instance required
    updateStateFinally(noteInstance) {
      this.editorController = {
        editStates: [this.editorController.editStates[0]],
        editIndex: 0,
        maxEditIndex: 0,
        noteInstance,
      };
    },

    // save new edit note instance from data() by link in constructor
    addNewInstance() {
      this.clearInstancesAfterIndex();
      this.editorController.editStates.push(JSON.stringify(this.editorController.noteInstance));
      this.editorController.editIndex += 1;
      this.editorController.maxEditIndex = this.editorController.editIndex;
    },

    // update temporary title
    updateNoteTitle(title) {
      this.editNoteInstance.title = title;
      this.addNewInstance();
    },

    updateTodoItem() {
      // check if given id
      const taskId = this.editTodoTask.id;

      if (taskId) {
        // update one task todo
        const index = this.editNoteInstance.tasks.findIndex((t) => t.id === taskId);
        this.editNoteInstance.tasks[index].title = this.editTodoTask.inputHandler;
      } else {
        // else create new and push to temporary store
        this.editNoteInstance.tasks.push({
          id: v4(),
          title: this.editTodoTask.inputHandler,
          completed: false,
        });
      }

      // clear form data and close dialog
      this.editTodoTask = {
        id: '',
        inputHandler: '',
        activeDialog: false,
      };
      this.addNewInstance();
    },

    todoSwitchCheck({ id, completed }) {
      const index = this.editNoteInstance.tasks.findIndex((t) => t.id === id);
      this.editNoteInstance.tasks[index].completed = completed;
      this.addNewInstance();
    },

    // delete one todo from temporary storage
    deleteTodoItem(id) {
      this.editNoteInstance.tasks = this.editNoteInstance.tasks.filter((t) => t.id !== id);
      this.addNewInstance();
    },

    submitDiscardChangesDialog() {
      this.updateStateFinally();
      this.discardChangesDialog = false;
    },

    // save note with all changes to global store
    saveNoteProxy() {
      const data = this.editNoteInstance;
      if (data.title) {
        if (this.availableExistingNote) this.updateExistingNote(data);
        else this.storeNewNote(data);
        this.$router.push('/');
      }
    },
    updateExistingNote(data) {
      this.$store.dispatch('updateAvailableNote', data);
    },
    storeNewNote(data) {
      this.$store.dispatch('createNewNote', data);
    },
  },
};
