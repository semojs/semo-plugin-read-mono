import { Utils } from '@semo/core'
import puppeteerHandler from '../commons/formatHandlers/puppeteer'

/**
 * 实现钩子： hook_define_format
 * 定义支持的格式
 */
export const hook_define_format = new Utils.Hook('read', {
  pdf: {
    describe: 'PDF 格式，基于 puppeteer',
    handler: puppeteerHandler
  },
  png: {
    describe: 'PNG 格式，基于 puppeteer',
    handler: puppeteerHandler
  },
  jpeg: {
    describe: 'JPEG 格式，基于 puppeteer',
    alias: 'jpg',
    handler: puppeteerHandler
  },
  html: {
    describe: 'Markdown 转 HTML 格式，基于 puppeteer',
    handler: puppeteerHandler
  },
})