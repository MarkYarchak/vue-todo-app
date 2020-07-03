<template>
  <div>
    <InfoNavBar
      title="Note preview"
      :can-back="true"
    />
    <div class="todo-preview-content d-flex justify-center full-width">
      <div class="form-card-wrapper">
        <NoteFormCard />
      </div>
    </div>
  </div>
</template>

<script>
import InfoNavBar from '@/components/InfoNavBar.vue';
import NoteFormCard from '@/components/preview/NoteFormCard.vue';

export default {
  name: 'TodoPreview',
  components: {
    NoteFormCard,
    InfoNavBar,
  },
  props: {
    noteId: {
      type: String,
      required: true,
      default: '',
    },
  },
};
</script>

<style lang="stylus" scoped>
  .todo-preview-content {
    padding: 20px 0;
  }
  .form-card-wrapper {
    flex-grow: 1
    display: flex
    justify-content: center
    padding: 0 10px
  }
</style>
