module.exports = {
  title: 'Jason的前端笔记',
  description: '全栈工程师成长记录',
  base:"/WebsitePractice/",
  themeConfig: {
    // 侧边栏
    sidebar: 'auto',
    sidebarDepth: 4,
    // 导航栏
    nav: [
      { text: 'Home', link: '/' },
      { text: 'HTML', link: '/html/' },
      { text: 'CSS', link: '/css/' },
      { text: 'JS', link: '/js/' },
      {
        text: 'Server',
        ariaLabel: 'Server Menu',
        items: [
          { text: 'Ajax', link: '/server/#第1章-ajax' },
          { text: 'Git', link: '/server/#第2章-git' },
          { text: 'Node.js', link: '/server/#第3章-node-js' },
        ],
      },
      {
        text: 'Vue',
        ariaLabel: 'Vue Menu',
        items: [
          { text: 'Vue2', link: '/vue2/' },
          { text: 'Vue3', link: '/vue3/' },
        ],
      },
    ],
  },
}
