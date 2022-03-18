<template>
    <m-row tag="p" :gutter="10">
        <m-col tag="p" :span="6" style="background: red">111</m-col>
        <m-col tag="p" :span="6" style="background: yellow">222</m-col>
        <m-col tag="p" :span="6" style="background: green">333</m-col>
        <m-col tag="p" :span="6" style="background: blue">444</m-col>
    </m-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        
    },
})
</script>
