<template>
  <input
    autofocus
    autocomplete="off"
    placeholder="What needs to be done?"
    class="new-todo"
    v-model="newTodo"
    @keyup.enter="addTodo"
  >
</template>

<script>
export default {
  name: 'AddTodoInput',
  data() {
    return {
      newTodo: '',
    };
  },
  methods: {
    addTodo() {
      const value = this.newTodo && this.newTodo.trim();
      if (!value) {
        return;
      }
      this.$emit('addTodo', value);
      this.newTodo = '';
    },
  },
};
</script>

<style scoped>
input::-webkit-input-placeholder {
  font-style: italic;
  font-weight: 300;
  color: #e6e6e6;
}

input::-moz-placeholder {
  font-style: italic;
  font-weight: 300;
  color: #e6e6e6;
}

input::input-placeholder {
  font-style: italic;
  font-weight: 300;
  color: #e6e6e6;
}

.new-todo {
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

.new-todo {
  padding: 16px 16px 16px 60px;
  border: none;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
}
</style>
