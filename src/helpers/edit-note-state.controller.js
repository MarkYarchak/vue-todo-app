class NoteEditState {
  noteInstance = {};

  constructor(noteInstance) {
    this.noteInstance = noteInstance;
  }

  editStates = [];

  editIndex = -1;

  maxEditIndex = 0;

  currentEditState() {
    if (this.editIndex) return JSON.parse(this.editStates[this.editIndex]);
    return this.noteInstance;
  }

  get currentState() {
    return this.currentEditState();
  }

  get allowUndo() {
    return this.editIndex > 0;
  }

  get allowRedo() {
    return this.editIndex < this.maxEditIndex || this.editIndex === -1;
  }

  undoEdit() {
    if (this.allowUndo) this.editIndex -= 1;
  }

  redoEdit() {
    if (this.allowRedo) this.editIndex += 1;
  }

  saveNewInstance() {
    this.editStates.push(JSON.stringify(this.noteInstance));
    this.redoEdit();
    this.maxEditIndex = this.editIndex;
  }
}

export default {
  data() {
    return {
      editNoteInstance: {
        id: '',
        title: '',
        tasks: [],
      },
    };
  },
  computed: {
    editorController() {
      return new NoteEditState(this.editNoteInstance);
    },
  },
  methods: {
    saveNewStateInstance() {
      this.editorController.saveNewInstance();
    },
    undoEditOperation() {
      this.editorController.undoEdit();
    },
    redoEditOperation() {
      this.editorController.redoEdit();
    },
  },
};
