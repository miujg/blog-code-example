<template>
  <div class="about">
    <h1>This is an about page</h1>
    <router-link to="/about/a">about</router-link>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>
