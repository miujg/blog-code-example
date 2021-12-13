export default {
  name: 'router-link',
  props: {
    to: {
      type: String,
      required: true
    },
    tag: {
      type: String,
      default: 'div'
    }
  },
  methods: {
    push () {
      this.$router.push(this.to)
    }
  },
  render(h) {
    return h(this.tag, {on: {click: this.push}}, this.$slots.default)
  }
}
