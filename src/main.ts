import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faEdit,
  faTrashAlt,
  faTrash,
  faPlus,
  faSave,
  faUndoAlt,
  faRedoAlt,
  faArrowLeft,
  faPen,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

library.add(
  faEdit,
  faTrashAlt,
  faPlus,
  faTrash,
  faSave,
  faUndoAlt,
  faRedoAlt,
  faArrowLeft,
  faPen,
  faTimes,
);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
