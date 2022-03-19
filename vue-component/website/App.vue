<template>
  <!-- <button-example /> -->
  <!-- <row-col /> -->
  <!-- <element-preview /> -->
  <!-- <checkbox-example /> -->
  <transfer-example />

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ButtonExample from './example/button-example.vue'
import RowCol from './example/row-col.vue'
import ElementPreview from './example/element-preview.vue'
import CheckboxExample from './example/checkbox-example.vue'
import transferExample from './example/transfer-example.vue'

export default defineComponent({
  components: {
    ButtonExample, 
    RowCol, 
    ElementPreview, 
    CheckboxExample,
    transferExample
  },
  setup() {
    
  }
})
</script>

<style lang="scss">
  body {
    margin: 0;
    padding: 0;
  }
  h4 {
    margin: 10px 0;
  }
</style>

