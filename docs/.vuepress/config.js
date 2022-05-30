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
        text: 'Index',
        link: '/'
      },
      {
        text: 'CS',
        children: [
          { text: 'Algorithm', link: '/cs/#algorithm' },
          { text: 'Computer Network', link: '/cs/#computer-network' },
          { text: 'Opreating System', link: '/cs/#operating-system' },
        ]
      },
      {
        text: 'Java',
        children: [
          { text: 'Java Basis', link: '/java/#java-basis' },
          { text: 'Java Concurrency', link: '/java/#java-concurrency' },
          { text: 'Java VM', link: '/java/#java-vitrual-machine' },
          { text: 'Spring', link: '/java/#spring' },
        ]
      },
      {
        text: 'DataBase',
        children: [
          { text: 'MySQL', link: '/db/#mysql' },
          { text: 'Redis', link: '/db/#redis' },
          { text: 'ElasticSearch', link: '/db/#elasticsearch' },
        ]
      },
      {
        text: 'Tool',
        link: '/tool'
      },
    ]
  })
}