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
  })
}