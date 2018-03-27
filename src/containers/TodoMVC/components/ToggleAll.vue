<template>
  <div>
    <label
      for="toggle-all"
      class="toggle-all"
      v-bind:class="{'all-done': toggle}"
    >
      >
    </label>
    <input
      v-show="false"
      id="toggle-all"
      type="checkbox"
      v-model="checked"
    >
  </div>
</template>

<script>
export default {
  name: 'ToggleAll',
  props: {
    toggle: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    checked: {
      get() {
        return this.toggle;
      },
      set(val) {
        this.$emit('toggle', val);
      },
    },
  },
};
</script>

<style scoped>
.toggle-all {
  position: absolute;
  top: 18px;
  left: 9px;
  padding: 6px 9px;
  transform: rotate(90deg);
  font-size: 22px;
  cursor: pointer;
  color: #e6e6e6;
  z-index: 99;
}

.all-done {
  color: #737373;
}
</style>
