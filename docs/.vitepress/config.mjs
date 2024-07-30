import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  // 选项卡显示的标题
  title: "Terminote",   
  description: "",
  lastUpdated: true,
  // https://vitepress.dev/reference/default-theme-config
  themeConfig: {
    // 网站左上角显示的图片
    logo: './logo.png', 
    // 网站左上角显示的标题
    siteTitle: 'Terminote',
    // 顶部导航栏
    nav: [
      { text: '银行从业', link: '/bank' },
    ],
    // 侧边栏
    sidebar: [
      {
        text: '银行从业',
        collapsed: false,
        items: [
          { text: '综合能力与法律法规', link: '' },
          { text: '个人理财', link: '' },
        ]
      }
    ],
    // 右侧大纲视图
    outline: 'deep',

    socialLinks: [
      { icon: 'github', link: 'https://github.com/hfut-xyc' }
    ],
    search: {
      provider: 'local'
    }
  }
})
