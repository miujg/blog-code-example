<template>
  <h1 @click="handleClick" class="bar">Bar1111</h1>
</template>

<script>
export default {
  methods: {
    handleClick () {
      alert('bar')
    }
  }
}
</script>

<style>
  .bar {
    color: blue;
  }
</style>