<template>
  <div class="d-flex header-buttons-wrapper no-user-select">
    <button
      class="save-note-btn"
      :disabled="editorController.editIndex < 1"
      @click="$emit('save-note')"
    >
      Save <span class="hidden-xs"> note</span>
    </button>
    <div class="step-do-buttons-wrapper">
      <button
        class="icon-btn"
        :class="{ 'active-btn': allowUndo }"
        :disabled="!allowUndo"
        @click="undoEdit"
      >
        <font-awesome-icon
          :icon="['fas', 'undo-alt']"
          style="font-size: 20px;"
        />
      </button>
      <button
        class="icon-btn"
        :class="{ 'active-btn': allowRedo }"
        :disabled="!allowRedo"
        @click="redoEdit"
      >
        <font-awesome-icon
          :icon="['fas', 'redo-alt']"
          style="font-size: 20px;"
        />
      </button>
    </div>
    <div style="flex-grow: 1;" />
    <button
      style="margin-right: 7px!important;"
      :disabled="editorController.editIndex < 1"
      @click="$emit('discard-changes')"
    >
      <font-awesome-icon
        :icon="['fas', 'times']"
        style="font-size: 18px; display: flex; align-items: center;"
      />
    </button>
    <button
      class="delete-note-btn"
      @click="$emit('delete-note')"
    >
      <font-awesome-icon :icon="['fas', 'trash']" />
    </button>
  </div>
</template>

<script>
export default {
  name: 'ActionsTopBar',
  props: {
    editorController: {
      type: Object,
      default: () => ({}),
      required: true,
    },
    createModeNote: {
      type: Object,
      default: () => ({}),
      required: true,
    },
    allowUndo: {
      type: Boolean,
      default: false,
      required: true,
    },
    allowRedo: {
      type: Boolean,
      default: false,
      required: true,
    },
    undoEdit: {
      type: Function,
      default: () => {},
      required: true,
    },
    redoEdit: {
      type: Function,
      default: () => {},
      required: true,
    },
  },
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
      /*width: (100/3.5)%*/
      padding: 7px 10px
      font-size: 16px
      border-radius: 5px
      margin: 0 3px
      text-transform uppercase
      font-weight bold
      border 1.5px solid transparent
      outline none
      box-shadow 0 1px 2px 1px #bbbbbb
      &:not(:disabled) {
        &:active {
          border-color white
          box-shadow 0 0 1px 1px #bbbbbb
        }
      }
    }
  }

  @media (min-width: 900px) {
    .header-buttons-wrapper button {
      /*padding: 12px 20px*/
    }
  }

  .step-do-buttons-wrapper {
    display: flex
    align-items: center;
    justify-content: space-around;
    width: 100px;
    margin-left: 10px;
  }

  .delete-note-btn {
    background-color: red
    color white
    border-color red
    width: 50px
  }

  .save-note-btn {
    border-color #1E88E5
    background-color: #1E88E5
    color white
    &:disabled {
      background-color: grey
    }
  }

  .icon-btn {
    border-radius: 50%
    padding: 10px
    color white
    background-color: #039BE5
    border: 1px solid #039BE5
    box-shadow 0 0 2px 2px rgba(128, 128, 128, 0.42)
    transition 0.2s
  }

  .icon-btn:disabled {
    background-color: grey
    /*border: 1px solid #039BE5*/
    /*box-shadow 0 0 2px 2px rgba(128, 128, 128, 0.42)*/
  }

  .icon-btn:disabled {
    background-color: grey
  }

</style>
