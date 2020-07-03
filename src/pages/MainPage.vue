<template>
  <div class="d-flex align-center flex-column">
    <InfoNavBar title="Notes list" />
    <MainNotesList />
  </div>
</template>

<script>
import MainNotesList from '../components/main-page/MainNotesList.vue';
import InfoNavBar from '../components/InfoNavBar.vue';

export default {
  components: {
    MainNotesList,
    InfoNavBar,
  },
};
</script>
