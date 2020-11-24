import { Utils } from '@semo/core'
import webHandler from '../common/web'

/**
 * 实现钩子： hook_define_format
 * 定义支持的格式
 */
export const hook_define_format = new Utils.Hook('read', {
  web: {
    describe: 'Markdown 文件 web 方式查看',
    handler: webHandler
  }
})