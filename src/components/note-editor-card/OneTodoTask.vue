<template>
  <div class="d-flex one-todo">
    <div class="one-todo__checkbox-with-label">
      <input
        :id="`todo-checkbox-${todo.id}`"
        type="checkbox"
        :checked="todo.completed"
        class="todo-checkbox no-user-select"
        @change="onTodoToggle"
      >
      <div style="padding: 2px 10px;">
        <label
          :for="`todo-checkbox-${todo.id}`"
          :style="todo.completed ? 'text-decoration: line-through' : ''"
        >
          {{ todo.title }}
        </label>
      </div>
    </div>
    <div style="flex-grow: 1" />
    <button
      v-for="(action, index) in todoActions"
      :key="index"
      :class="`btn action-btn ${action.className}`"
      @click="action.execute"
    >
      <font-awesome-icon :icon="action.icon" />
      <span class="hidden-xs ml-1"> {{ action.title }}</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'OneTodoTask',
  props: {
    todo: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    todoActions() {
      return [
        {
          title: 'edit',
          icon: ['fas', 'edit'],
          className: 'edit-btn',
          execute: () => {
            this.$emit('edit', this.todo.id);
          },
        },
        {
          title: 'delete',
          icon: ['fas', 'trash-alt'],
          className: 'delete-btn',
          execute: () => {
            this.$emit('delete', this.todo.id);
          },
        },
      ];
    },
  },
  methods: {
    onTodoToggle() {
      this.$emit('switch-check', {
        id: this.todo.id,
        completed: !this.todo.completed,
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
  .ml-1 {
    margin-left: 2px
  }

  .one-todo {
    padding: 10px 6px
    margin: 2px 0 5px
    border-bottom 1px solid grey
    &__checkbox-with-label {
      font-size: 18px
      display: flex
      align-items: center
    }
  }

  .todo-checkbox {
    align-self: flex-start
    min-width: 20px
    min-height: 20px
    caret-color #00796B
  }

  .action-btn {
    padding: 5px 9px
    border none
    border-radius: 4px
    color: white
    min-width max-content
    max-height 28px
    text-transform uppercase
    font-weight bold
    font-size: 14px
  }

  .edit-btn {
    background-color: orange
    margin-right: 10px
    border 1px solid orange
  }

  .delete-btn {
    border 1px solid red
    background-color: red
  }

  .action-btn:focus {
    outline none
  }
</style>
