const { defaultTheme } = require('@vuepress/theme-default')

const { shikiPlugin } = require('@vuepress/plugin-shiki')
const { searchPlugin } = require('@vuepress/plugin-search')
const { googleAnalyticsPlugin } = require('@vuepress/plugin-google-analytics')


module.exports = {
  title: 'Notes',
  base: '/',
  plugins: [
    shikiPlugin({
      theme: 'dark-plus'
    }),
    searchPlugin({

    }),
    googleAnalyticsPlugin({

    }),
  ],
  
  theme: defaultTheme({
    logo: 'https://v2.vuepress.vuejs.org/images/hero.png',
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
        text: 'Index',
        link: '/'
      },
      {
        text: 'CS',
        children: [
          { text: 'Algorithm', link: '/cs/algorithm/' },
          // { text: 'Network', link: '/cs/network/' },
          { text: 'Opreating System', link: '/cs/os/' },
        ]
      },
      {
        text: 'Java',
        children: [
          { text: 'Java Basis', link: '/java/basic/' },
          { text: 'Java Concurrency', link: '/java/concurrent/' },
          // { text: 'Java VM', link: '/java/vm/' },
          { text: 'Spring', link: '/java/spring/' },
        ]
      },
      {
        text: 'DataBase',
        children: [
          { text: 'MySQL', link: '/cs/mysql/' },
          // { text: 'Network', link: '/cs/network/' },
          { text: 'Redis', link: '/cs/redis/' },
        ]
      },
      {
        text: 'Tool',
        link: '/tool'
      },
    ]
  })
}