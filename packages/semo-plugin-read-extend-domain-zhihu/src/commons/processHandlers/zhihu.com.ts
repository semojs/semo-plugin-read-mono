export const preprocess = (html, argv) => {
  // 把前端图片性能优化转化成真实路径
  html = html.replace(/<noscript>.*?<\/noscript>/g, '')
  html = html.replace(/<img(.*?)(src=".*?")(.*?)>/g, '<img$1$3>')
  html = html.replace(/<img(.*?)data-actualsrc=/g, '<img$1src=')

  return html
}

export const postprocess = (markdown, argv) => {
  return markdown
}