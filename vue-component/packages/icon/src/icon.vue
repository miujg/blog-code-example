<template>
    <i :class="`m-icon-${name}`"></i>
</template>

<script>
export default {
  name: 'MIcon',
  props: {
    name: {
      type: String,
      dafault: '11'
    }
  },
  setup() {
    
  },
}
</script>