<template>
  <div>
    <MyPromised :promise="usersPromise">
      <template v-slot:pending>
        <p>Loading.yyyy..</p>
      </template>
      <template v-slot="data">
        <ul>
          <li v-for="user in data" :key="user.id">{{user.name}}</li>
        </ul>
      </template>
    </MyPromised>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { MyPromised } from './MyPromised'
export default defineComponent({
  components: { MyPromised },
  setup() {
    const getUsers = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([
            {id: 1, name: 'xx'}, {id: 2, name: 'jgmiu'}, {id: 3, name: 'shaexiao'}
          ])
          // reject(new Error('error1111'))
        }, 2000)
      })
    }
    const usersPromise = ref<Promise<unknown>>(getUsers())
    return {
      usersPromise
    }
  },
})
</script>
