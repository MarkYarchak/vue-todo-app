import Vue from 'vue';
import Vuex from 'vuex';
import { Note } from '@/models/note';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    newlyCreatedNote: {
      id: '',
      title: '',
      tasks: [],
    },
    notesList: [],
  },
  actions: {
    setCurrentEditableNote(context, { id }) {
      context.commit('setEditableNote', id);
    },
    deleteNote(context, payload) {
      context.commit('deleteNoteById', payload);
    },
    createNewNote(context, payload: Note) {
      context.commit('addOneNote', payload);
    },
    updateAvailableNote(context, payload: Note) {
      context.commit('updateOneNote', payload);
    },
  },
  mutations: {
    setEditableNote(state, id) {
      state.newlyCreatedNote.id = id;
    },
    updateOneNote(state, note: Note) {
      const noteIndex = state.notesList.findIndex((n: Note) => n.id === note.id);
      // @ts-ignore
      state.notesList[noteIndex] = note;
    },
    addOneNote(state, note: Note) {
      // @ts-ignore
      state.notesList.unshift(note);
      state.newlyCreatedNote.id = '';
    },
    deleteNoteById(state, id) {
      if (state.newlyCreatedNote.id === id) {
        // clear creating note data
        state.newlyCreatedNote = { id: '', title: '', tasks: [] };
      } else {
        // delete existing note from list
        state.notesList = state.notesList.filter((n: Note) => n.id !== id);
      }
    },
  },
  getters: {
    notesList: (store) => store.notesList,
  },
  plugins: [createPersistedState()],
});
