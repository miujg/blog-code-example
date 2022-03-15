import { openBlock, createElementBlock, normalizeClass } from 'vue';

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

export { _Icon as default };
