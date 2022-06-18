const { defaultTheme } = require('vuepress')
const { searchPlugin } = require('@vuepress/plugin-search')

module.exports = {
  title: 'Jason的前端笔记',
  description: '全栈工程师成长记录',
  base: '/WebNotebook/',
  head: [['link', { rel: 'icon', href: '/imgs/favicon.ico' }]],
  markdown: {
    extractHeaders: {
      level: [2, 3, 4],
    },
  },
  theme: defaultTheme({
    logo: '/imgs/cosmos.png',
    // 侧边栏
    // sidebar: 'auto',
    sidebar: {
      '/base/': [
        {
          text: 'Web Basic',
          // collapsible: true,
          children: ['/base/html.md', '/base/css.md', '/base/js.md', '/base/ts.md', '/base/tsplus.md'],
        },
      ],
      '/server/': [
        {
          text: 'Communicate',
          collapsible: true,
          children: ['/server/git.md', '/server/ajax.md', '/server/axios.md'],
        },
        {
          text: 'Server Dev',
          collapsible: true,
          children: ['/server/nodejs.md', '/server/mongodb.md'],
        },
        {
          text: 'Packaging',
          collapsible: true,
          children: ['/server/webpack.md'],
        },
      ],
      '/vue/': [
        {
          text: 'Vue Frame',
          // collapsible: true,
          children: ['/vue/vue2.md', '/vue/vue3.md'],
        },
      ],
      '/react/': [
        {
          text: 'React Frame',
          // collapsible: true,
          children: ['/react/'],
        },
      ],
    },
    sidebarDepth: 4,
    // 导航栏
    navbar: [
      { text: 'Home', link: '/' },
      {
        text: 'Base',
        children: [
          { text: 'HTML', link: '/base/html.md' },
          { text: 'CSS', link: '/base/css.md' },
          { text: 'JavaScript', link: '/base/js.md' },
          { text: 'TypeScript', link: '/base/ts.md' },
          { text: 'TypeScript+', link: '/base/tsplus.md' },
        ],
      },
      {
        text: 'Server',
        children: [
          {
            text: '基础通讯',
            children: [
              { text: 'Git', link: '/server/git.md' },
              { text: 'Ajax', link: '/server/ajax.md' },
              { text: 'Axios', link: '/server/axios.md' },
            ],
          },
          {
            text: '后端开发',
            children: [
              { text: 'Node.js', link: '/server/nodejs.md' },
              { text: 'MongoDB', link: '/server/mongodb.md' },
            ],
          },
          {
            text: '项目打包',
            children: [{ text: 'Webpack', link: '/server/webpack.md' }],
          },
        ],
      },
      {
        text: 'Vue',
        children: [
          { text: 'Vue2', link: '/vue/vue2.md' },
          { text: 'Vue3', link: '/vue/vue3.md' },
        ],
      },
      { text: 'React', link: '/react/' },
    ],
    // 显示最后更新时间
    lastUpdated: true,
    lastUpdatedText: '上次更新',
    repo: 'https://github.com/jrothschild33/WebNotebook',
    editLink: false,
  }),
  // 插件设置
  plugins: [
    searchPlugin({
      locales: {
        '/': {
          placeholder: '搜索',
        },
      },
    }),
  ],
}
