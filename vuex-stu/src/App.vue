<template>
  <div id="app">
    <p>{{ $store.state }}</p>
    <button @click="$store.commit('changeName', 'x111x')">sync</button>
    <button @click="$store.dispatch('changeNameAsync', 'x111x')">async</button>
    <p>{{ $store.getters.getName }}</p>
    <p>{{ $store.getters.getName }}</p>
    <p>{{ $store.getters.getName }}</p>
    <p>{{ $store.getters.getName }}</p>
    <p>{{ $store.getters.getName }}</p>
  </div>  
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
</style>
