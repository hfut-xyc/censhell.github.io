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
        ]
      },
      {
        text: 'Database',link:  '/db'
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
            '/java/base1/syntax1.md',
            '/java/base1/syntax2.md',
            '/java/base1/syntax3.md',
            '/java/base1/string.md',
            '/java/base1/io.md',
          ],
        },
        {
          text: 'Java 容器',
          collapsible: true,
          children: [
            '/java/base2/arraylist.md',
            '/java/base2/hashmap.md',
            '/java/base2/treemap.md',
          ],
        },
        {
          text: 'Java 并发基础',
          collapsible: true,
          children: [
            '/java/concurrent1/thread-basic.md',
            '/java/concurrent1/thread-communicate.md',
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
            '/java/concurrent3/threadlocal.md',
            '/java/concurrent3/container.md',
            '/java/concurrent3/threadpool.md',
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