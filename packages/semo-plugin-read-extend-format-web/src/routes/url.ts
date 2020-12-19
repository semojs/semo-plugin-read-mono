import { convertUrlToMarkdown } from 'semo-plugin-read'
import marked from 'marked'

export const path = '(.*)'

export const handler = async (ctx, argv) => {
  const data = {
    html: '',
    title: ''
  }
  const url = ctx.request.url.substring(5)
  if (url && url.startsWith('http')) {
    const { markdown, title } = await convertUrlToMarkdown({ url })
    let html = marked(markdown)
    data.html = html
    data.title = title
  }

  ctx.json = false
  return await ctx.render('index.html', data || {})
}