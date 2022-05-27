const { shikiPlugin } = require('@vuepress/plugin-shiki')

module.exports = {
  title: 'Notes',
  base: '/',
  plugins: [
    shikiPlugin({
      theme: 'dark-plus'
    })
  ],
  
  themeConfig: {
    logo: 'https://v2.vuepress.vuejs.org/images/hero.png',
    sidebar: 'auto',
    navbar: [
      {
        text: 'Home',
        link: '/'
      },
      {
        text: 'Algorithm',
        children: [
          { text: 'Design Pattern', link: '/algorithm/design-pattern/' },
          { text: 'LeetCode', link: '/algorithm/leetcode/' },
        ]
      },
      {
        text: 'Java',
        children: [
          { text: 'Java Basic', link: '/java/basic/' },
          { text: 'Java Concurrency', link: '/java/concurrency/' },
          { text: 'Java Virtual Machine', link: '/java/vm/' },
          { text: 'Spring Framework', link: '/java/spring/' },
        ]
      },
      {
        text: 'DataBase',
        link: '/db'
      },
      {
        text: 'Tool',
        link: '/tool'
      },
      {
        text: 'GitHub',
        link: 'https://github.com/hfut-xyc/hfut-xyc.github.io'
      }
    ]
  }
}