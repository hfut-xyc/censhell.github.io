const { defaultTheme } = require('@vuepress/theme-default')

const { shikiPlugin } = require('@vuepress/plugin-shiki')
const { searchPlugin } = require('@vuepress/plugin-search')
const { googleAnalyticsPlugin } = require('@vuepress/plugin-google-analytics')


module.exports = {
  title: 'Terminote',
  head: [['link', { rel: 'icon', href: '/logo.png' }]],
  open: true,
  base: '/',
  plugins: [
    shikiPlugin({
      theme: 'dark-plus'
    }),
    searchPlugin({

    }),
    // googleAnalyticsPlugin({

    // }),
  ],
  
  theme: defaultTheme({
    logo: '/logo.png',
    repo: 'hfut-xyc/hfut-xyc.github.io',
    // config of edit link
    docsRepo: 'https://github.com/hfut-xyc/hfut-xyc.github.io',
    docsBranch: 'master',
    docsDir: 'docs',
    editLinkPattern: ':repo/edit/:branch/:path',
    // siderbar and navbar
    sidebar: 'auto',
    navbar: [
      {
        text: 'Index', link: '/'
      },
      {
        text: '计算机基础', link: '/cs'
      },
      {
        text: 'Java', link: '/java'
      },
      {
        text: '设计模式', link: '/design'
      },
      {
        text: '数据库', link: '/db'
      },
      {
        text: '消息队列', link: '/mq'
      },
    ]
  })
}