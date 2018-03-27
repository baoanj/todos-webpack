<template lang="html">
  <div>
    <router-link class="router-link" to="/">Back to Home</router-link>
    <router-link :to="`/user/${$route.params.id}`">Back to User</router-link>
    <p>User: {{ $route.params.id }}</p>
    <router-link :to="`/user/${$route.params.id}/profile`">Go to UserProfile</router-link>
    <router-link :to="`/user/${$route.params.id}/posts`">Go to UserPosts</router-link>
    <router-view :user="$route.params.id"></router-view>
  </div>
</template>

<script>
export default {
  name: 'User',
};
</script>

<style lang="css">
</style>
