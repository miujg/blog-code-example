<template>
  <h1 @click="handleClick" class="foo">Foo</h1>
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
  .foo {
    color: red;
  }
</style>