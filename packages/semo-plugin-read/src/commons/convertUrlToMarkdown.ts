import util from 'util'
import read from '@vipzhichengfork/node-readability'
import TurndownService from 'turndown'
import { tables } from 'turndown-plugin-gfm'
import parse from 'url-parse'

import clipboardy from 'clipboardy'

import * as globalProcessHandler from '../commons/processHandlers/global'

import { Utils } from '@semo/core'

const promiseRead = util.promisify(read)

const convertUrlToMarkdown = async (argv) => {

  if (argv.clipboard) {
    Utils.info('Get input source from clipboard.')
    argv.url = clipboardy.readSync()
  }

  if (!argv.url) {
    return { title: '', markdown: '', content:'', article: null}
  }

  // 获取域名标识
  if (!argv.domain && argv.url && argv.url.startsWith('http') && argv.url.length < 255) {
    const url = parse(argv.url)
    argv.domain = url.host.replace(/^www\./, '')
  }

  const extendDomains: any = await Utils.invokeHook('read:domain')

  // 初始化转换库
  const turndownService = new TurndownService({
    codeBlockStyle: ['console', 'mobi'].includes(argv.format) ? 'indented' : 'fenced',
  })
  turndownService.use(tables)

  // 获取 HTML
  const article = await promiseRead(argv.url, {
    preserveUnlikelyCandidates: true,
    preprocess: function(source, response, contentType, callback) {
      // HTML 预处理
      source = globalProcessHandler.preprocess(source, argv)
      try {
        if (argv.domain) {
          if (extendDomains[argv.domain] && extendDomains[argv.domain].preprocess && Utils._.isFunction(extendDomains[argv.domain].preprocess)) {
            const newSource = extendDomains[argv.domain].preprocess(source, argv)
            if (newSource && Utils._.isString(newSource)) {
              source = newSource
            }
          }
        }
      } catch (e) {}

      callback(null, source);
    }
  })

  if (!article.content) {
    throw new Error('Parse failed, not a supported url!')
  }
  let content = article.content
  if (argv.toc) {
    content = `[TOC]\n\n${content}`
  }
  if (argv.title) {
    content = `<h1>${article.title}</h1>\n\n${content}`
  }

  // 转化为 Markdown
  let markdown = turndownService.turndown(content)
  if (argv.footer && argv.url && argv.url.startsWith('http') && argv.url.length < 255) {
    markdown = `${markdown}\n\n---\n\n[Original URL](${argv.url})`
  }

  // Markdown 后处理
  markdown = globalProcessHandler.postprocess(markdown, argv)
  try {
    if (argv.domain) {
      if (extendDomains[argv.domain] && extendDomains[argv.domain].postprocess && Utils._.isFunction(extendDomains[argv.domain].postprocess)) {
        const newMarkdown = extendDomains[argv.domain].postprocess(markdown, argv)
        if (newMarkdown && Utils._.isString(newMarkdown)) {
          markdown = newMarkdown
        }
      }
    }
  } catch (e) {}

  return { title: article.title, markdown, content, article }
}

export default convertUrlToMarkdown