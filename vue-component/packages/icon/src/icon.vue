<template>
    <i :class="name"></i>
</template>

<script>
export default {
  name: 'MIcon',
  props: {
    name: {
      type: String,
      dafault: 'm-icon-jiazai'
    }
  },
  setup() {
    
  },
}
</script>