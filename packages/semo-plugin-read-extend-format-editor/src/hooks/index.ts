import { Utils } from '@semo/core'
import editorHandler from '../common/editor'

/**
 * 实现钩子： hook_define_format
 * 定义支持的格式
 */
export const hook_define_format = new Utils.Hook('read', {
  editor: {
    describe: 'Markdown 的编辑器 基于国产的 Vditor',
    handler: editorHandler
  }
})