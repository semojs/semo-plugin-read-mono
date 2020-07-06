import { Utils } from '@semo/core'
import epubHandler from '../commons/formatHandlers/epub'

/**
 * 实现钩子： hook_define_format
 * 定义支持的格式
 */
export const hook_define_format = new Utils.Hook('read', {
  epub: {
    describe: 'EPUB 格式，基于 Pandoc',
    handler: epubHandler
  },
})