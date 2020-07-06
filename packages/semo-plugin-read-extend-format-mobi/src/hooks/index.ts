import { Utils } from '@semo/core'
import mobiHandler from '../commons/formatHandlers/mobi'

/**
 * 实现钩子： hook_define_format
 * 定义支持的格式
 */
export const hook_define_format = new Utils.Hook('read', {
  mobi: {
    describe: 'MOBI 格式，基于 Calibre 的 ebook-convert',
    handler: mobiHandler
  },
})