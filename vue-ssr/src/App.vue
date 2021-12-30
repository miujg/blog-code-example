<template>
  <div>
    <foo />
    <bar />
  </div>
</template>

<script>
import Bar from './component/Bar.vue'
import Foo from './component/Foo.vue'
export default {
  components: { Foo, Bar },
}
</script>