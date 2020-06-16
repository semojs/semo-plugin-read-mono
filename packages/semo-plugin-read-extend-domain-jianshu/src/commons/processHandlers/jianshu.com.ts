export const preprocess = (html, argv) => {
  // 去掉无意义的标签
  html = html.replace(/<div\s+class="image-caption">(.*?)<\/div>/g, (match) => {
    return ''
  })
  return html
}

export const postprocess = (markdown, argv) => {
  // 让图片顶格输出
  markdown = markdown.replace(/\n\s+\!\[(.*?)\].*/g,  (match, p1, p2) => {
    return `\n` + match.trim()
  })

  return markdown
}