import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentCreatingNote: {
      id: '',
    },
    notesList: [
      {
        id: 'aowenoi',
        title: 'Buy productsBuy productsBuy productsBuy productsBuy productsBuy productsBuy productsBuy productsBuy productsBuy productsBuy productsBuy productsBuy products',
        tasks: [
          {},
        ],
      },
      {
        id: 'aowenoi',
        title: 'Buy products',
        tasks: [
          {},
        ],
      },
      {
        id: 'aowenoi',
        title: 'Buy products',
        tasks: [
          {},
        ],
      },
      {
        id: 'aowenoi',
        title: 'Buy products',
        tasks: [
          {},
        ],
      },
    ],
  },
  actions: {
    setCurrentCreateId(context, payload) {
      context.commit('setNoteCreateId', payload);
    },
  },
  mutations: {
    setNoteCreateId(state, id) {
      state.currentCreatingNote.id = id;
    },
  },
  getters: {
    notesList: (store) => store.notesList,
  },
  plugins: [createPersistedState()],
});
