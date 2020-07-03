<template>
  <div class="list-item full-width">
    <div
      class="note-card card-shadows cursor-pointer border-radius-6"
      @click="clickListNoteHandler(note.id)"
    >
      <div
        v-if="!idEmptyNote"
        class="d-flex"
      >
        <div class="list-item__title">
          {{ note.title }}
        </div>
        <div
          class="delete-icon-wrapper d-flex justify-center"
          @click.stop="$emit('delete-note', note.id)"
        >
          <div class="delete-icon" />
        </div>
      </div>
      <div
        v-if="!idEmptyNote"
        class="note-last-tasks"
      >
        <ul>
          <template
            v-for="(todo, tIndex) in note.tasks"
          >
            <li
              v-if="tIndex < 3"
              :key="tIndex"
            >
              {{ todo.title }}
            </li>
          </template>
        </ul>
      </div>
      <div
        v-if="!idEmptyNote"
        class="full-width awesome-text-button"
      >
        <span>Tap to edit</span>
      </div>
      <div
        v-else
        class="d-flex justify-center align-center full-width create-new-note"
      >
        <div style="width: 40px;">
          <div class="create-new-icon" />
        </div>
        <span>Create new</span>
      </div>
    </div>
  </div>
</template>

<script>
import { v4 } from 'uuid';

export default {
  name: 'OneListNote',
  props: {
    note: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    idEmptyNote() {
      // check if the note object is empty
      return Object.keys(this.note).length === 0 && this.note.constructor === Object;
    },
  },
  methods: {
    clickListNoteHandler(taskId) {
      let id = taskId;
      // if Note without id - generate new
      if (!id) {
        id = v4();
        // set new generated id to store for better security
        this.$store.dispatch('setCurrentCreateId', id);
      }
      // go to the Note preview page with received/generated id
      this.$router.push({
        path: '/preview',
        query: {
          id,
        },
      })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="stylus" scoped>
  .list-item {
    max-width 800px
    margin-bottom: 10px
    &__title {
      font-weight bold;
      font-size: 18px
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      /*max-width 100%*/
      flex-grow: 1
    }
  }

  .delete-icon {
    width: 20px
    height: 20px
    background: center/cover no-repeat url('../../assets/icons/trash-alt-solid.svg');
    &-wrapper {
      width: min-content;
      padding: 0 10px
    }
  }

  .note-card {
    padding: 10px
    border 1px solid black
  }

  .card-shadows {
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all 0.18s cubic-bezier(.25,.8,.25,1);
  }
  .card-shadows:hover {
    box-shadow: 0 4px 18px rgba(0,0,0,0.25), 0 5px 8px rgba(0,0,0,0.22);
  }
  .card-shadows:not(:hover) {
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  }

  .note-last-tasks {
    //
  }

  .create-new-note {
    font-size: 22px
    font-weight bold
    padding: 10px
  }

  .create-new-icon {
    width 20px
    height: 20px
    background: center/cover no-repeat url('../../assets/icons/plus-solid.svg');
  }

  .awesome-text-button {
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    border: none;
    border-radius: 4px;
    padding: 0 8px;
    min-width: 64px;
    vertical-align: middle;
    text-align: center;
    text-transform: uppercase;
    color: gray;
    background-color: transparent;
    font-family: "Roboto", "Segoe UI", BlinkMacSystemFont, system-ui, -apple-system;
    font-size: 14px;
    font-weight: 500;
    outline: none;
    cursor: pointer;
  }

  .awesome-text-button::-moz-focus-inner {
    border: none;
  }

</style>
