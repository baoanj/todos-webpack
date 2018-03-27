<template lang="html">
  <div>
    <router-link class="router-link" to="/">Back to Home</router-link>
    <button @click="goBack" type="button" name="button">Go Back</button>
    <p>Hello Vue Router!</p>
    <p>id: {{ $route.query.id }}; date: {{ $route.query.date }}</p>
  </div>
</template>

<script>
export default {
  name: 'HelloRouter',
  methods: {
    goBack() {
      if (window.history.length > 1) {
        this.$router.go(-1);
      } else {
        this.$router.push('/');
      }
    },
  },
};
</script>

<style lang="css">
</style>
