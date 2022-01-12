<template>
  <div id="app">
    <!-- <foo />
    <bar /> -->
    <router-link to="/">foo</router-link>
    <router-link to="/bar">bar</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
// import Bar from './component/Bar.vue'
// import Foo from './component/Foo.vue'
export default {
  // components: { Foo, Bar },
}
</script>