<template>
  <h4>按钮组件：</h4>
  <m-button type="primary">主要按钮</m-button>
  <m-button type="warning">警告按钮</m-button>
  <m-button type="danger">危险按钮</m-button>
  <m-button type="success">成功按钮</m-button>
  <m-button type="default">默认按钮</m-button>
  <m-button icon="m-icon-xiajiantou" round>圆角按钮</m-button>
  <m-button icon="m-icon-xiajiantou">图标按钮</m-button>
  <m-button :loading="loading" @click="handleLoading">加载中</m-button>
  <m-button @click="handleLoading" disabled>禁用</m-button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

const useButton = () => {
  const loading = ref(true)
  const handleLoading = (e:MouseEvent) => {
    console.log('loading....')
  }
  setTimeout(() => {
    loading.value = false
  }, 2000)
  return {
    loading,
    handleLoading
  }
}

export default defineComponent({
  setup() {
    return {
      ...useButton()
    }
  },
})
</script>

<style scoped>
  button {
    margin-right: 5px;
  }
</style>
