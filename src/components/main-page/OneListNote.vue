<template>
  <div class="list-item full-width">
    <div
      tabindex="0"
      class="note-card card-shadows no-user-select cursor-pointer border-radius-6"
      @click="openOneNote(note.id)"
      @keypress.space="openOneNote(note.id)"
      @keypress.enter="openOneNote(note.id)"
    >
      <div
        v-if="!isEmptyNote"
        class="d-flex"
      >
        <div class="list-item__title">
          {{ note.title }}
        </div>
        <div
          tabindex="0"
          class="delete-icon-wrapper d-flex justify-center"
          @click.stop="$emit('delete-note', note.id)"
          @keypress.space="$emit('delete-note', note.id)"
          @keypress.enter="$emit('delete-note', note.id)"
        >
          <font-awesome-icon
            :icon="['fas', 'trash']"
            style="padding: 4px; color: red; font-size: 20px;"
          />
        </div>
      </div>
      <div
        v-if="!isEmptyNote"
        class="note-tasks-preview"
      >
        <ul
          v-if="note.tasks.length"
          style="margin: 5px 0;"
        >
          <template
            v-for="(todo, tIndex) in note.tasks"
          >
            <li
              v-if="tIndex < 4"
              :key="tIndex"
            >
              <div
                v-if="tIndex < 3"
                class="short-todo-view"
                :style="todo.completed ? 'text-decoration: line-through' : ''"
              >
                {{ todo.title }}
              </div>
              <div
                v-else-if="(note.tasks.length - 3) > 0"
                class="short-todo-view"
                style="color: #505050"
              >
                and {{ note.tasks.length - 3 }} more...
              </div>
            </li>
          </template>
        </ul>
      </div>
      <div
        v-else
        class="d-flex justify-center align-center full-width create-new-note"
      >
        <div style="margin-right: 15px;">
          <font-awesome-icon :icon="['fas', 'plus']" />
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
    isEmptyNote() {
      // check if the note object is empty
      return Object.keys(this.note).length === 0 && this.note.constructor === Object;
    },
  },
  methods: {
    openOneNote(taskId) {
      const id = taskId || this.createNewNote();
      // go to the Note editor page with received/generated id
      this.$router.push({
        path: '/edit',
        query: {
          id,
        },
      })
        .catch((err) => {
          console.log(err);
        });
    },
    createNewNote(id = v4()/* generate id for new Note */) {
      this.$store.dispatch('setCurrentEditableNote', { id });
      return id;
    },
  },
};
</script>

<style lang="stylus" scoped>
  .list-item {
    max-width 800px
    margin-bottom: 10px
    &__title {
      align-self center
      font-weight bold;
      font-size: 18px
      padding: 2px 5px
      flex-grow: 1
    }
  }

  .delete-icon-wrapper {
    width: 20px;
    height min-content
    padding: 2px 10px
    &:hover {
      transition 0.3s
      background-color: rgba(238, 17, 17, 0.1)
      border-radius: 4px
    }
    &:not(:hover) {
      transition 0.3s
    }
  }

  .short-todo-view {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-right: 20px
    font-size: 16px
    line-height 20px
  }

  .note-card {
    padding: 12px 10px
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

  .note-tasks-preview {
    //
  }

  .create-new-note {
    font-size: 22px
    font-weight bold
    padding: 10px 0
  }

</style>
