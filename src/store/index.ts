import Vue from 'vue';
import Vuex from 'vuex';
// import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    newlyCreatedNote: {
      id: '',
      title: '',
      tasks: [],
    },
    notesList: [
      {
        id: 'aowenoi2',
        title: 'Buy productsBuy productsBuy productsBuy productsBuy productsBuy products',
        tasks: [
          {},
        ],
      },
      {
        id: 'aowenowie12d',
        title: 'Buy products 2',
        tasks: [
          {},
        ],
      },
      {
        id: 'aowenoi2wef',
        title: 'Buy products 3',
        tasks: [
          {},
        ],
      },
      {
        id: 'aoweno3i1',
        title: 'Buy products 4',
        tasks: [
          {},
        ],
      },
    ],
  },
  actions: {
    setCurrentEditableNote(context, { id }) {
      context.commit('setEditableNote', id);
    },
    deleteNote(context, payload) {
      context.commit('deleteNoteById', payload);
    },
  },
  mutations: {
    setEditableNote(state, id) {
      state.newlyCreatedNote.id = id;
    },
    updateEditableNote(state, note) {
      if (state.newlyCreatedNote.id === note.id) {
        state.newlyCreatedNote = note;
      } else {
        const noteIndex = state.notesList.findIndex((n) => n.id === note.id);
        state.notesList[noteIndex] = note;
      }
    },
    createNewNote(state, note) {
      state.notesList.unshift(note);
    },
    deleteNoteById(state, id) {
      if (state.newlyCreatedNote.id === id) {
        // clear creating note data
        state.newlyCreatedNote = { id: '', title: '', tasks: [] };
      } else {
        // delete existing note from list
        state.notesList = state.notesList.filter((n) => n.id !== id);
      }
    },
  },
  getters: {
    notesList: (store) => store.notesList,
  },
  // plugins: [createPersistedState()],
});
