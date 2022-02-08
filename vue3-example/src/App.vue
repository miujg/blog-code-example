<template>
  <promised />
  <test :name="111">
    <template v-slot:pending>
      <p>Loading.xxxx..</p>
    </template>
  </test>
  <test-my-promised />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Test from './components/Test.vue';
import TestMyPromised from './components/TestMyPromised.vue';
import Promised from './components/TestPromised.vue'
export default defineComponent({
  name: 'App',
  components: {
    Promised,
    Test,
    TestMyPromised,
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
