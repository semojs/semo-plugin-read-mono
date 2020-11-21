import cheerio from 'cheerio'

export const preprocess = (html, argv) => {
  
  // 预解析，取文章的主要部分
  const $ = cheerio.load(html)
  const title = $('title').html()
  let content = $('.article-content').html()

  // 去掉一大段 css
  content = content.replace(/<style>[\w\W]*?<\/style>/g, '')
  
  // 去掉网页复制代码功能带来的干扰
  content = content.replace(/<span class="copy-code-btn">(.*)<\/span>/g, '')
  html = `<title>${title}</title>${content}`

  return html
}

export const postprocess = (markdown, argv) => {

  // 过滤掉锚点里的外链
  markdown = markdown.replace(/\[(.*?)\]\((.*?)#(.*?)\)/g, (match, p1, p2, p3) => {
    if (p2 === argv.url) {
      return `[${p1}](#${p3})`
    }
    return match
  })

  if (argv.format === 'mobi') {
    const host = argv.nethost || argv.localhost
    markdown = markdown.replace(/\!\[(.*?)\]\((.*?)\)/g,  (match, p1, p2) => {
      return `![${p1}](${host}/proxy/${p2})`
    })
  }

  return markdown
}