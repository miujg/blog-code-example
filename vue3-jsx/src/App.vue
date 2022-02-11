<template>
  <Test>
    <template v-slot:pending>
      <h1>loading...</h1>
    </template>
    <template v-slot="data">
      <pre>{{data}}</pre>
    </template>
    <template v-slot:error>
      <pre>error</pre>
    </template>
  </Test>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Test from './components/Test.ts' 
export default defineComponent({
  name: 'App',
  components: {
    Test,
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
