const { defaultTheme } = require('@vuepress/theme-default')

const { shikiPlugin } = require('@vuepress/plugin-shiki')
const { searchPlugin } = require('@vuepress/plugin-search')


module.exports = {
  title: 'Terminote',
  head: [['link', { rel: 'icon', href: '/logo.png' }]],
  open: true,
  basic: '/',
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
        text: 'Java', link: '/java'
      },
      {
        text: 'Database',link:  '/db'
      },
      {
        text: 'Tool',
        children: [
          { text: 'Linux', link: '/tool/linux' },
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
            '/java/basic/data-type.md',
            '/java/basic/oop.md',
            '/java/basic/date.md',
            '/java/basic/pass-arg.md',
            '/java/basic/string.md',
            '/java/basic/io.md',
            '/java/basic/serialize.md',
            '/java/basic/lambda.md',
          ],
        },
        {
          text: 'Java 容器',
          collapsible: true,
          children: [
            '/java/collection/arraylist.md',
            '/java/collection/linkedlist.md',
            '/java/collection/priorityqueue.md',
            '/java/collection/hashmap.md',
            '/java/collection/treemap.md',
            '/java/collection/hashset.md',
            '/java/collection/treeset.md',
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
            '/java/concurrent2/final.md',
            '/java/concurrent2/volatile.md',
            '/java/concurrent2/synchronized.md',
          ], 
        },
        {
          text: 'Java 并发工具',
          collapsible: true,
          children: [
            '/java/concurrent3/atomic.md',
            '/java/concurrent3/threadlocal.md',
            '/java/concurrent3/aqs.md',
            '/java/concurrent3/concurrenthashmap.md',
            '/java/concurrent3/copyonwritearraylist.md',
            '/java/concurrent3/blockingqueue.md',
            '/java/concurrent3/threadpool.md',
            '/java/concurrent3/forkjoin.md',
            '/java/concurrent3/future1.md',
            '/java/concurrent3/future2.md',
          ],
        },
        {
          text: 'Java 并发实战',
          collapsible: true,
          children: [
            '/java/concurrent4/print-order.md',
            '/java/concurrent4/print-alternative.md',
            '/java/concurrent4/singleton.md',
            '/java/concurrent4/producer-consumer.md',
            '/java/concurrent4/cache.md',
            '/java/concurrent4/two-stage-shutdown.md',
            '/java/concurrent4/protective-pause.md',
          ],
        },
      ],
      '/': [

      ],
    }
  })
}