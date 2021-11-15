module.exports = {
  title: 'Notes',
  base: '/',
  themeConfig: {
    logo: 'https://v2.vuepress.vuejs.org/images/hero.png',
    sidebar: 'auto',
    navbar: [
      { text: 'Home', link: '/' }, 
      {
        text: 'Algorithm', 
        children: [
          { text: 'Binary Tree', link: '/algorithm/tree/' },
          { text: 'Dynamic Programming', link: '/algorithm/dp/' },
          { text: 'Design Pattern', link: '/algorithm/design/' },
        ]
      },
      {
        text: 'Java', 
        children: [
          { text: 'Java Fundamental', link: '/java/fundamental/' },
          { text: 'Java Container', link: '/java/container/' },
          { text: 'Java IO', link: '/java/io/' },
          { text: 'Java Concurrency', link: '/java/concurrency/' },
          { text: 'Java Virtual Machine', link: '/java/vm/' },
          { text: 'Spring Framework', link: '/java/spring/' },
        ]
      },
      {
        text: 'DataBase',
        children: [
          { text: 'MySQL', link: '/db/mysql/' },
          { text: 'Redis', link: '/db/redis/' },
          { text: 'ElasticSearch', link: '/db/es/' }
        ]
      },
      {
        text: 'Tool',
        children: [
          { text: 'Linux', link: '/tool/linux/' },
          { text: 'Maven', link: '/tool/maven/' },
          { text: 'NPM', link: '/tool/npm/' },
          { text: 'Git', link: '/tool/git/' },
        ]
      },
      { text: 'GitHub', link: 'https://github.com/hfut-xyc/hfut-xyc.github.io' },
    ]
  }
}