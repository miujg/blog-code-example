<template>
  <div id="app">
    <p>{{ $store.state }}</p>
    <button @click="$store.commit('changeName', 'jgmiu')">changeName</button>
    <button @click="$store.commit('a/changeNameA', 'x111x')">sync</button>
    <button @click="$store.dispatch('b/changeNameAsyncB', 'x111x')">async</button>
    <p>{{ $store.getters.getName }}</p>
    <p>{{ $store.getters['a/getNameA'] }}</p>
    <!-- <p>{{ $store.getters.getName }}</p> -->
    <!-- <p>{{ $store.getters.getName }}</p> -->
  </div>  
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
</style>
