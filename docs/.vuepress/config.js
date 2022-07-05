const { defaultTheme } = require('vuepress')
// const { searchPlugin } = require('@vuepress/plugin-search')
const { docsearchPlugin } = require('@vuepress/plugin-docsearch')

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
          children: ['/base/html', '/base/css', '/base/js', '/base/ts', '/base/tsplus'],
        },
      ],
      '/server/': [
        {
          text: 'Communicate',
          collapsible: true,
          children: ['/server/git', '/server/ajax', '/server/axios'],
        },
        {
          text: 'Server Dev',
          collapsible: true,
          children: ['/server/nodejs', '/server/mongodb'],
        },
        {
          text: 'Packaging',
          collapsible: true,
          children: ['/server/webpack'],
        },
      ],
      '/vue/': [
        {
          text: 'Vue Frame',
          // collapsible: true,
          children: ['/vue/vue2', '/vue/vue3'],
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
          { text: 'HTML', link: '/base/html' },
          { text: 'CSS', link: '/base/css' },
          { text: 'JavaScript', link: '/base/js' },
          { text: 'TypeScript', link: '/base/ts' },
          { text: 'TypeScript+', link: '/base/tsplus' },
        ],
      },
      {
        text: 'Server',
        children: [
          {
            text: '基础通讯',
            children: [
              { text: 'Git', link: '/server/git' },
              { text: 'Ajax', link: '/server/ajax' },
              { text: 'Axios', link: '/server/axios' },
            ],
          },
          {
            text: '后端开发',
            children: [
              { text: 'Node.js', link: '/server/nodejs' },
              { text: 'MongoDB', link: '/server/mongodb' },
            ],
          },
          {
            text: '项目打包',
            children: [{ text: 'Webpack', link: '/server/webpack' }],
          },
        ],
      },
      {
        text: 'Vue',
        children: [
          { text: 'Vue2', link: '/vue/vue2' },
          { text: 'Vue3', link: '/vue/vue3' },
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
    docsearchPlugin({
      apiKey: 'b841eb4ad3eeb27468bfb0512d1c5c1c',
      indexName: 'jrothschild33',
      appId: '2O0I2ZB352',
      attributesToSnippet: ['title', 'content:80'],
      locales: {
        '/': {
          placeholder: '搜索文档',
          translations: {
            button: {
              buttonText: '搜索文档',
              buttonAriaLabel: '搜索文档',
            },
            modal: {
              searchBox: {
                resetButtonTitle: '清除查询条件',
                resetButtonAriaLabel: '清除查询条件',
                cancelButtonText: '取消',
                cancelButtonAriaLabel: '取消',
              },
              startScreen: {
                recentSearchesTitle: '搜索历史',
                noRecentSearchesText: '没有搜索历史',
                saveRecentSearchButtonTitle: '保存至搜索历史',
                removeRecentSearchButtonTitle: '从搜索历史中移除',
                favoriteSearchesTitle: '收藏',
                removeFavoriteSearchButtonTitle: '从收藏中移除',
              },
              errorScreen: {
                titleText: '无法获取结果',
                helpText: '你可能需要检查你的网络连接',
              },
              footer: {
                selectText: '选择',
                navigateText: '切换',
                closeText: '关闭',
                searchByText: '搜索提供者',
              },
              noResultsScreen: {
                noResultsText: '无法找到相关结果',
                suggestedQueryText: '你可以尝试查询',
                reportMissingResultsText: '你认为该查询应该有结果？',
                reportMissingResultsLinkText: '点击反馈',
              },
            },
          },
        },
      },
    }),
  ],
}
