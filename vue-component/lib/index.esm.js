import { defineComponent, openBlock, createElementBlock, normalizeClass } from 'vue';

var script$1 = defineComponent({
    name: 'MButton',
    setup() {
    }
});

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", null, "按钮 "))
}

script$1.render = render$1;
script$1.__file = "packages/button/src/button.vue";

script$1.install = (app) => {
    // 注册全局组件
    app.component(script$1.name, script$1);
};
const _Button = script$1;

var script = {
  name: 'MIcon',
  props: {
    name: {
      type: String,
      dafault: '11'
    }
  },
  setup() {
    
  },
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("i", {
    class: normalizeClass(`m-icon-${$props.name}`)
  }, null, 2 /* CLASS */))
}

script.render = render;
script.__file = "packages/icon/src/icon.vue";

script.install = (app) => {
    app.use(script.name, script);
};
const _Icon = script;

// // 组件统一出口
// // 统一出口
const components = [
    _Button,
    _Icon
];
const install = (app) => {
    // 遍历注册组件
    components.forEach(component => {
        app.component(component.name, component);
    });
};
// // 在使用组件库的时候，createApp().use(xxx)
var index = {
    install
};

export { index as default };
