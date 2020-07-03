import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import store from '../store';
import MainPage from '../pages/MainPage.vue';
import TodoPreview from '../pages/TodoPreview.vue';

Vue.use(VueRouter);

function checkValidPreviewRoute(queryId: string) {
  return (
    store.state.notesList.find((note) => note.id === queryId)
    || store.state.currentCreatingNote.id === queryId
  );
}

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage,
  },
  {
    path: '/preview',
    name: 'TodoPreview',
    component: TodoPreview,
    props: (route) => ({ noteId: route.query.id }),
    beforeEnter(toR, fromR, next) {
      // validate route
      const queryId = toR.query?.id;
      if (!queryId || !checkValidPreviewRoute(queryId.toString())) next('/');
      else next();
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
