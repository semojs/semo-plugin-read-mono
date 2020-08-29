import cheerio from 'cheerio'

export const preprocess = (html, argv) => {
  
  // 预解析，取文章的主要部分
  const $ = cheerio.load(html)
  const title = $('title').html()
  let content = $('main.post-content').html()
  
  html = `<title>${title}</title>${content}`

  return html
}

export const postprocess = (markdown, argv) => {

  return markdown
}