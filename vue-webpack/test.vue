
    <template>
      <section class="content element-doc">
        <h3 id="ji-chu-yong-fa"><a class="header-anchor" href="#ji-chu-yong-fa">¶</a> 基础用法</h3>
        <demo-block>
          <template slot="source">
            <element-demo0 />
          </template>
          <template slot="highlight">
            <pre v-pre>
              <code class="html">&lt;el-input v-model=&quot;input&quot; placeholder=&quot;请输入内容&quot;&gt;&lt;/el-input&gt;

                &lt;script&gt;
                export default {
                  data() {
                    return {
                      input: ''
                    }
                  }
                }
                &lt;/script&gt;
              </code>
            </pre>
          </template>
        </demo-block>
      </section>
    </template>
    <script>
      export default {
        name: 'component-doc',
        components: {
          "element-demo0": (function() {
    
            var render = function() {
          var _vm = this
          var _h = _vm.$createElement
          var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("el-input", {
        attrs: { placeholder: "请输入内容" },
        model: {
          value: _vm.input,
          callback: function($$v) {
            _vm.input = $$v
          },
          expression: "input"
        }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true

  
    const democomponentExport = {
  data() {
    return {
      input: ''
    }
  }
}
    return {
      render,
      staticRenderFns,
      ...democomponentExport
    }
  })(),
        }
      }
    </script>
  