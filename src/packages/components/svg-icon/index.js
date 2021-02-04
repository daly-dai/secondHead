const svgIcon = {
  name: 'baseSvgIcon',
  props: {
    size: {
      type: [Number, String],
      default: 0
    },
    iconName: {
      type: String,
      default: ''
    },
    // 自定义样式
    cls: {
      type: String,
      default: ''
    }
  },
  computed: {},
  data() {
    return {};
  },
  created() { },
  methods: {},
  render(h) {
    return h('div', {
      class: {
        'svg-content': true,
        [this.cls]: this.cls
      }
    }, [
      h('svg',
        {
          class: 'navIcon',
          attrs: {
            'aria-hidden': true
          }
        }, [h('use',
          { attrs: { 'xlink:href': '#' + this.iconName } }, []
        )]
      )]);
  }
};

export default svgIcon;
