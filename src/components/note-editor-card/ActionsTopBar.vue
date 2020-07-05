<template>
  <div class="d-flex header-buttons-wrapper no-user-select">
    <button
      class="save-note-btn"
      @click="$emit('save-note')"
    >
      Store <span class="hidden-xs"> note</span>
    </button>
    <button>
      Cancel <span class="hidden-xs">changes</span>
    </button>
    <div style="flex-grow: 1;" />
    <button
      class="delete-note-btn"
      @click="$emit('delete-note')"
    >
      Delete <span class="hidden-xs"> note</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'ActionsTopBar',
};
</script>

<style lang="stylus" scoped>

  .header-buttons-wrapper {
    width: 100%
    position: sticky;
    top: 60px
    padding: 10px 0
    background-color: #fff
    border-bottom 1px solid black
    button {
      width: (100/3.5)%
      padding: 7px 10px
      font-size: 16px
      border-radius: 5px
      margin: 0 3px
      text-transform uppercase
      font-weight bold
      border 1.5px solid transparent
      outline none
      box-shadow 0 1px 2px 1px #bbbbbb
      &:active {
        border-color white
        box-shadow 0 0 1px 1px #bbbbbb
      }
    }
  }

  @media (min-width: 900px) {
    .header-buttons-wrapper button {
      padding: 12px 20px
    }
  }

  .delete-note-btn {
    background-color: red
    color white
    border-color red
  }

  .save-note-btn {
    border-color #1E88E5
    background-color: #1E88E5
    color white
  }

</style>
