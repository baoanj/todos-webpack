<template lang="html">
  <div>
    <router-link to="/todo">Go to TodoMVC</router-link>
    <router-link
      :to="{ path: '/hello', query: { id: '123', date: 100 }}"
    >Go to HelloRouter</router-link>
    <router-link to="/wechat/baoanj/contact/18826073551">Me</router-link>
    <router-link
      :to="{ name: 'WeChat', params: { name: 'baoanjie', phone: '17322085802'} }"
    >Me Again</router-link>
    <router-link to="/user/baoanj">Go to User</router-link>
    <router-link to="/abc">Go to ABC</router-link>
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style lang="css">
</style>
