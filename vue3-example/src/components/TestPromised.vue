<template>
  <Promised :promise="usersPromise">
    <template v-slot:pending>
      <p>Loading...</p>
    </template>
    <template v-slot="data">
      <ul>
        <li v-for="user in data" :key="user.id">{{ user.name }}</li>
      </ul>
    </template>
    <template v-slot:rejected="error">
      <p>Error: {{ error.message }}</p>
    </template>
  </Promised>
</template>

<script>
import { Promised } from 'vue-promised'
export default {
  components: { Promised },
  data() {
    return {
      usersPromise: null
    }
  },
  methods: {
    getUsers() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // resolve([
          //   {id: 1, name: 'xx'}, {id: 2, name: 'jgmiu'}, {id: 3, name: 'shaexiao'}
          // ])
          reject(new Error('error1111'))
        }, 2000)
      })
    }
  },
  created() {
    this.usersPromise = this.getUsers()
  },
}
</script>