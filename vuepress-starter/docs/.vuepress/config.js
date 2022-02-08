module.exports = {
  title: 'jgmiu bloe',
  description: 'jgmiu personal bloe',
  themeConfig: {
    // 导航
    nav: [
      { text: '首页', link: '/' },
      { 
        text: 'jgmiu的 JavaScript 博客', 
        items: [
            { text: 'Github', link: 'https://github.com/miujg' },
            { text: '掘金', link: 'https://juejin.cn/user/940837682808877' }
        ]
      }
    ],
    // 侧边栏
    sidebar: [
      {
        title: 'webpack-doc-1',
        path: '/webpack/test',
        collapsable: false,
      }
    ],
    // 主题
    theme: 'reco'
  }
}