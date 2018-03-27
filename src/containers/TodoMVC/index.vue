<template>
  <div class="todoapp">
    <router-link class="router-link" to="/">Back to Home</router-link>
    <header class="header">
      <h1>todos</h1>
      <ToggleAll
        :toggle="allDone"
        @toggle="val => allDone = val"
      />
      <AddTodoInput
        @addTodo="addTodo"
      />
    </header>
    <TodoList
      v-show="todos.length"
      v-cloak
      :filters="filteredTodos"
      :edited="editedTodo"
      @edit="todo => editTodo(todo)"
      @remove="todo => removeTodo(todo)"
      @done="todo => doneEdit(todo)"
      @cancel="todo => cancelEdit(todo)"
    />
    <TodoFooter
      v-show="todos.length"
      v-cloak
      :remain="remaining"
      :visible="visibility"
      :count="todos.length"
      @removeAll="removeCompleted"
      @filter="visible => filter(visible)"
    />
  </div>
</template>

<script>
import ToggleAll from './components/ToggleAll';
import AddTodoInput from './components/AddTodoInput';
import TodoList from './components/TodoList';
import TodoFooter from './components/TodoFooter';
import { todoStorage, filters } from './utils';

export default {
  name: 'TodoMVC',
  components: {
    ToggleAll,
    AddTodoInput,
    TodoList,
    TodoFooter,
  },

  // app initial state
  data() {
    return {
      todos: [],
      newTodo: '',
      editedTodo: null,
      visibility: 'all',
    };
  },

  mounted() {
    this.todos = todoStorage.fetch();
  },

  // watch todos change for localStorage persistence
  watch: {
    todos: {
      handler(todos) {
        todoStorage.save(todos);
      },
      deep: true,
    },
  },

  // computed properties
  // http://vuejs.org/guide/computed.html
  computed: {
    filteredTodos() {
      return filters[this.visibility](this.todos);
    },
    remaining() {
      return filters.active(this.todos).length;
    },
    allDone: {
      get() {
        return this.remaining === 0;
      },
      set(value) {
        this.todos.forEach((todo) => {
          const temp = todo;
          temp.completed = value;
        });
      },
    },
  },

  // methods that implement data logic.
  // note there's no DOM manipulation here at all.
  methods: {
    addTodo(value) {
      this.todos.unshift({
        id: todoStorage.uid,
        title: value,
        completed: false,
      });
      todoStorage.uid += 1;
    },

    removeTodo(todo) {
      this.todos.splice(this.todos.indexOf(todo), 1);
    },

    editTodo(todo) {
      this.beforeEditCache = todo.title;
      this.editedTodo = todo;
    },

    doneEdit(todo) {
      if (!this.editedTodo) {
        return;
      }
      const temp = todo;
      this.editedTodo = null;
      temp.title = temp.title.trim();
      if (!temp.title) {
        this.removeTodo(temp);
      }
    },

    cancelEdit(todo) {
      this.editedTodo = null;
      const temp = todo;
      temp.title = this.beforeEditCache;
    },

    removeCompleted() {
      this.todos = filters.active(this.todos);
    },

    filter(visibility) {
      this.visibility = visibility;
    },
  },
};
</script>

<style lang="css">
.todoapp {
  background: #fff;
  margin: 130px 0 40px 0;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
              0 25px 50px 0 rgba(0, 0, 0, 0.1);
}

.todoapp button {
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  font-size: 100%;
  vertical-align: baseline;
  font-family: inherit;
  font-weight: inherit;
  color: inherit;
  -webkit-appearance: none;
  appearance: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.todoapp h1 {
  position: absolute;
  top: -155px;
  width: 100%;
  font-size: 100px;
  font-weight: 100;
  text-align: center;
  color: rgba(175, 47, 47, 0.15);
  -webkit-text-rendering: optimizeLegibility;
  -moz-text-rendering: optimizeLegibility;
  text-rendering: optimizeLegibility;
}

.router-link {
  position: fixed;
  top: 0;
}

[v-cloak] { display: none; }
</style>
