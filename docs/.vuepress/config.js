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

  ],

  theme: defaultTheme({
    logo: '/logo.png',
    repo: 'hfut-xyc/hfut-xyc.github.io',
    // config of edit link
    docsRepo: 'https://github.com/hfut-xyc/hfut-xyc.github.io',
    docsBranch: 'master',
    docsDir: 'docs',
    editLinkPattern: ':repo/edit/:branch/:path',
    contributors: false,
    // navbar
    navbar: [
      {
        text: 'Index', link: '/'
      },
      {
        text: 'Algorithm', link: '/algorithm'
      },
      {
        text: 'Java',
        children: [
          { text: 'Base->Concurrency->JVM', link: '/java/' },
          { text: 'Spring', link: '/spring/' },
          // { text: 'Netty', link: '/netty/' },
        ]
      },
      {
        text: 'Database',
        children: [
          { text: 'MySQL', link: '/db/mysql/' },
          { text: 'Redis', link: '/db/redis/' },
          { text: 'ElasticSearch', link: '/db/es/' }
        ]
      },
      {
        text: 'Tool',
        children: [
          { text: 'Docker', link: '/tool/etc/docker' },
          { text: 'Maven', link: '/tool/etc/maven' },
          { text: 'NPM', link: '/tool/etc/npm' },
          { text: 'Git', link: '/tool/etc/git' },
        ]
      },
    ],
    // siderbar
    sidebarDepth: 1,
    sidebar: {
      '/java': [
        {
          text: 'Java 基础',
          collapsible: true,
          children: [
            '/java/base1/abc.md',
            '/java/base1/java8.md',
            '/java/base1/io.md',
            '/java/base1/string.md',
          ],
        },
        {
          text: 'Java 容器',
          collapsible: true,
          children: [
            '/java/base2/list.md',
            '/java/base2/map.md',
            '/java/base2/set.md',
          ],
        },
        {
          text: 'Java 并发基础',
          collapsible: true,
          children: [
            '/java/concurrent1/thread-create.md',
            '/java/concurrent1/thread-safe.md',
          ],
        },
        {
          text: 'Java 并发原理',
          collapsible: true,
          children: [
            '/java/concurrent2/synchronized.md',
            '/java/concurrent2/volatile.md',
            '/java/concurrent2/final.md',
          ],
        },
        {
          text: 'Java 并发工具',
          collapsible: true,
          children: [
            '/java/concurrent3/atomic.md',
            '/java/concurrent3/container.md',
            '/java/concurrent3/future1.md',
            '/java/concurrent3/future2.md',
          ],
        },
      ],
      '/': [

      ],
    }
  })
}