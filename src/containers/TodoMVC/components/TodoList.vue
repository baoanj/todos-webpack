<template lang="html">
  <section class="main">
    <transition-group name="todo-list" tag="ul" class="todo-list">
      <li
        v-for="todo in filters"
        class="todo"
        :key="todo.id"
        :class="{ completed: todo.completed, editing: todo === edited }"
      >
        <div class="view" v-show="todo !== edited">
          <input class="toggle" type="checkbox" v-model="todo.completed">
          <label @dblclick="$emit('edit', todo)">{{ todo.title }}</label>
          <button class="destroy" @click="$emit('remove', todo)"></button>
        </div>
        <input
          v-show="todo === edited"
          class="edit"
          type="text"
          v-model="todo.title"
          v-todo-focus="todo === edited"
          @blur="$emit('done', todo)"
          @keyup.enter="$emit('done', todo)"
          @keyup.esc="$emit('cancel', todo)"
        >
      </li>
    </transition-group>
  </section>
</template>

<script>
export default {
  name: 'TodoList',
  props: {
    filters: {
      type: Array,
      default: function f() {
        return [];
      },
    },
    edited: {
      type: Object,
      default: null,
    },
  },
  // a custom directive to wait for the DOM to be updated
  // before focusing on the input field.
  // http://vuejs.org/guide/custom-directive.html
  directives: {
    'todo-focus': function f(el, binding) {
      if (binding.value) {
        el.focus();
      }
    },
  },
};
</script>

<style lang="css" scoped>
.edit {
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  color: inherit;
  padding: 6px;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.main {
  position: relative;
  z-index: 2;
  border-top: 1px solid #e6e6e6;
}

.todo-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.todo-list li.todo {
  font-size: 24px;
  border-bottom: 1px solid #ededed;
  transition: transform 0.3s, opacity 0.3s;
}

.todo {
  position: relative;
}

.todo-list li:last-child {
  border-bottom: none;
}

.todo-list li.editing {
  border-bottom: none;
  padding: 0;
  margin-bottom: -1px;
}

.todo-list li .edit {
  width: 506px;
  padding: 12px 16px;
  margin: 0 0 0 43px;
}

.todo-list li .toggle {
  text-align: center;
  width: 40px;
  /* auto, since non-WebKit browsers doesn't support input styling */
  height: 40px;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  border: none; /* Mobile Safari */
  -webkit-appearance: none;
  appearance: none;
}

.todo-list li .toggle:after {
  content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#ededed" stroke-width="3"/></svg>');
}

.todo-list li .toggle:checked:after {
  content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#bddad5" stroke-width="3"/><path fill="#5dc2af" d="M72 25L42 71 27 56l-4 4 20 20 34-52z"/></svg>');
}

.todo-list li label {
  word-break: break-all;
  padding: 15px 60px 15px 15px;
  margin-left: 45px;
  display: block;
  line-height: 1.2;
  transition: color 0.4s;
}

.todo-list li.completed label {
  color: #d9d9d9;
  text-decoration: line-through;
}

.todo-list li .destroy {
  display: none;
  position: absolute;
  top: 0;
  right: 10px;
  bottom: 0;
  width: 40px;
  height: 40px;
  margin: auto 0;
  font-size: 30px;
  color: #cc9a9a;
  margin-bottom: 11px;
  transition: color 0.2s ease-out;
}

.todo-list li .destroy:hover {
  color: #af5b5e;
}

.todo-list li .destroy:after {
  content: 'X';
}

.todo-list li:hover .destroy {
  display: block;
}

/* <transition-group> */
.todo-list-enter, .todo-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.todo-list-leave-active {
  position: absolute;
}
</style>
