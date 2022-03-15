import { defineComponent, openBlock, createElementBlock } from 'vue';

var script = defineComponent({
    name: 'MButton',
    setup() {
    }
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", null, "按钮 "))
}

script.render = render;
script.__file = "packages/button/src/button.vue";

script.install = (app) => {
    // 注册全局组件
    app.component(script.name, script);
};
const _Button = script;

export { _Button as default };
