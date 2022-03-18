<template>
  <h4>默认用法</h4>
  <m-row >
    <m-col  :span="6">
      <div class="item" style="background: red">111</div>
    </m-col>
    <m-col  :span="6">
      <div class="item" style="background: yellow">222</div>
    </m-col>
    <m-col  :span="6">
      <div class="item" style="background: green">333</div>
    </m-col>
    <m-col  :span="6">
      <div class="item" style="background: blue">444</div>
    </m-col>
  </m-row>
  <h4>偏移量</h4>
  <m-row >
    <m-col  :span="6" :offset="6">
      <div class="item" style="background: yellow">222</div>
    </m-col>
    <m-col  :span="6">
      <div class="item" style="background: green">333</div>
    </m-col>
    <m-col  :span="6">
      <div class="item" style="background: blue">444</div>
    </m-col>
  </m-row>
  <h4>分栏间隔</h4>
  <m-row :gutter="10">
    <m-col :span="6">
      <div class="item" style="background: red">111</div>
    </m-col>
    <m-col :span="6">
      <div class="item" style="background: yellow">222</div>
    </m-col>
    <m-col :span="6">
      <div class="item" style="background: green">333</div>
    </m-col>
    <m-col :span="6">
      <div class="item" style="background: blue">444</div>
    </m-col>
  </m-row>
  <h4>justify-content</h4>
  <m-row :gutter="10" justify="center">
    <m-col :span="6">
      <div class="item" style="background: red">111</div>
    </m-col>
    <m-col :span="6">
      <div class="item" style="background: yellow">222</div>
    </m-col>
  </m-row>
  <h4>响应式相关</h4>
  <m-row :gutter="10" justify="center">
    <m-col :span="6" :md='{span: 8, offset: 3}'>
      <div class="item" style="background: red">111</div>
    </m-col>
    <m-col :span="6" :md="8">
      <div class="item" style="background: yellow">222</div>
    </m-col>
  </m-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {},
});
</script>

<style lang="scss">
.item {
  height: 40px;
}
</style>
