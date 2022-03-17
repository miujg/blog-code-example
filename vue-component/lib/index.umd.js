(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) :
  typeof define === 'function' && define.amd ? define(['vue'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.MUI = factory(global.Vue));
})(this, (function (vue) { 'use strict';

  // loading icon冲突
  // 只有loading 没内容 要吧插槽去掉 v-if="$slot.default"
  var script$1 = vue.defineComponent({
      name: 'MButton',
      props: {
          type: {
              // string 与 String的区别
              type: String,
              default: 'default',
              vaildator: (val) => {
                  return [
                      'primary', 'warning', 'danger', 'default', 'success'
                  ].includes(val);
              }
          },
          icon: {
              type: String,
              default: ''
          },
          disabled: Boolean,
          loading: Boolean,
          // 是否圆角
          round: Boolean
      },
      emits: ['click'],
      setup(props, ctx) {
          const classs = vue.computed(() => ([
              'm-button',
              `m-button--${props.type}`,
              {
                  'is-disabled': props.disabled,
                  'is-loading': props.loading,
                  // 是否是
                  'is-round': props.round
              }
          ]));
          const hanleClick = (e) => {
              ctx.emit('click', e);
          };
          return {
              classs,
              hanleClick
          };
      }
  });

  const _hoisted_1 = {
    key: 0,
    class: "m-icon-jiazai"
  };
  const _hoisted_2 = { key: 2 };

  function render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return (vue.openBlock(), vue.createElementBlock("button", {
      class: vue.normalizeClass(_ctx.classs),
      onClick: _cache[0] || (_cache[0] = (...args) => (_ctx.hanleClick && _ctx.hanleClick(...args)))
    }, [
      (_ctx.loading)
        ? (vue.openBlock(), vue.createElementBlock("i", _hoisted_1))
        : (vue.openBlock(), vue.createElementBlock("i", {
            key: 1,
            class: vue.normalizeClass(_ctx.icon)
          }, null, 2 /* CLASS */)),
      (_ctx.$slots.default)
        ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_2, [
            vue.renderSlot(_ctx.$slots, "default")
          ]))
        : vue.createCommentVNode("v-if", true)
    ], 2 /* CLASS */))
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
        dafault: 'm-icon-jiazai'
      }
    },
    setup() {
      
    },
  };

  function render(_ctx, _cache, $props, $setup, $data, $options) {
    return (vue.openBlock(), vue.createElementBlock("i", {
      class: vue.normalizeClass($props.name)
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

  return index;

}));
