<template>
  <div>
    <div>
      <div class="note-title d-flex">
        <span>Note title:</span>
        <div style="flex-grow: 1;" />

        <!-- Switcher to edit title  -->
        <button
          class="btn edit-title-btn"
          @click="switchTitleEditing"
        >
          <font-awesome-icon
            :icon="['fas', 'pen']"
            style="margin-right: 3px;"
          />
          {{ editNoteTitle.active ? 'Cancel' : 'Change' }}
        </button>
      </div>

      <!-- Current note title  -->
      <div
        id="editable-title"
        class="note-title__content"
      >
        {{ title || 'untitled' }}
      </div>
    </div>

    <!-- Container for editing note title -->
    <div
      v-if="editNoteTitle.active"
      class="edit-title-container"
    >
      <div class="d-flex edit-title-input-wrapper">
        <input
          id="edit-title-input-field"
          v-model="editNoteTitle.value"
          class="edit-title-input"
          type="text"
        >

        <!-- Save input data button -->
        <div class="save-input-wrapper">
          <button
            class="save-input-btn"
            @click="updateNoteTitle"
          >
            <font-awesome-icon
              :icon="['fas', 'save']"
              style="font-size: 22px;"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditorCardNoteTitle',
  props: {
    title: {
      type: [String, Object],
      default: '',
    },
  },
  data() {
    return {
      editNoteTitle: {
        // phantom data - value for editing note title
        value: '',
        active: false,
      },
    };
  },
  methods: {
    switchTitleEditing() {
      const active = !this.editNoteTitle.active;
      this.editNoteTitle = {
        active,
        value: this.title,
      };
      if (active) {
        // update after open title editing container and then focus to input
        this.$nextTick(() => {
          document.getElementById('edit-title-input-field').focus();
        });
      }
    },
    updateNoteTitle() {
      if (this.editNoteTitle.value !== this.title) {
        this.$emit('update-title', this.editNoteTitle.value);
        this.editNoteTitle.active = false;
      }
    },
  },
};
</script>

<style lang="stylus" scoped>

  .edit-title-container {
    padding: 15px 5px
  }

    // btn-switcher to edit note title or cancel editing
  .edit-title-btn {
    font-size: 14px
    padding: 5px 10px
    border-radius: 4px
    border 1px solid orange
    color white
    margin-bottom: 2px
    background-color: orange
    &:active {
      border-color white
      /*box-shadow 0 0 2px 0 grey*/
    }
  }

  .note-title {
    flex-grow: 1
    font-size: 22px
    font-weight bold
    text-align: center
    border 1px solid transparent
    /*padding: 5px 0 10px*/
    padding: 16px 12px 0 12px;
    span {
      align-self center
    }
    &__content {
      font-size: 20px
      font-weight normal
      padding: 10px 16px
    }
  }

    // field for editing note title
  .edit-title-input {
    flex-grow: 1
    padding: 4px 7px
    font-size: 20px
    border none
    &:focus {
      outline none
    }
    &-wrapper {
      border 2px solid #0e6cb9
      padding: 2px
      border-radius: 10px
      box-shadow 0 1px 2px 1px #bbbbbb
    }
  }

    // save update title input button
  .save-input {
    &-wrapper {
      padding: 0 0 0 5px
    }
    &-btn {
      width: 40px
      height: 40px
      color white
      border 2px solid #42A5F5
      border-radius: 10px
      background-color: #42A5F5
      transition 0.2s
      &:focus {
        outline none
      }
      &:active {
        background-color: rgba(66, 165, 245, 0.62)
      }
    }
  }

</style>
