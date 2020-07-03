<template>
  <div class="form-card full-width">
    <div class="form-card__header">1</div>
  </div>
</template>

<script>
export default {
  name: 'NoteFormCard',
  data() {
    return {};
  },
};
</script>

<style lang="stylus" scoped>
  .form-card {
    max-width 900px
    padding: 8px
    border-radius: 8px
    flex-grow: 1
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    &__header {
      display: flex
    }
  }
</style>
