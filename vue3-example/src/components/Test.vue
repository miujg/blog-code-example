<template>
  <div>
    <div v-if="isLoading">loading----</div>
    <div v-else-if="error">{{ error.message }}</div>
    <div v-else>
      <pre>{{users}}</pre>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'

export default defineComponent({
  setup() {
    // 数据
    let users = ref<unknown | null>(null)
    // 是否loading
    let isLoading = ref(true)
    // 错误信息
    let error = ref(null)

    // 模拟getUser接口， 2s后返回数据
    const getUser = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([
            {name: 'jgmiu1', id: 27},
            {name: 'jgmiu2', id: 28},
            {name: 'jgmiu3', id: 29},
          ])
        }, 2000)
      })
    }

    // 调用接口，根据状态设置值
    const fetchUsers = () => {
     getUser().then(data => {
       // 
       isLoading.value = false
       error.value = null
       users.value = data
     }).catch(err => {
        error.value = err
        isLoading.value = false
        users.value = null
     }) 
    }
    onMounted(() =>{
      fetchUsers()
    })
    return {
      users,
      isLoading,
      error      
    }
  },
})
</script>
