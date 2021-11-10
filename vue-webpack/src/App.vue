<template>
  <div>
    <h1>{{name}}</h1> 
    <img src="~assets/logo.png" alt="">
    <div class="bg"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const name = ref<string>('name')
    return {
      name
    }
  },
})
</script>


<style lang="scss">
  @import './index.scss';
  .bg {
    width: 200px;
    height: 200px;
    background: url("~assets/logo.png");
    background-size: 100% 100%;
  }
</style>