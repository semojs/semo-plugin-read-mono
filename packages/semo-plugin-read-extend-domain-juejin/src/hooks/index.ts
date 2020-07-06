import { Utils } from '@semo/core'
import * as juejinProcessHandler from '../commons/processHandlers/juejin.im'

/**
 * 实现钩子： hook_domain
 * 定义支持的格式
 */
export const hook_domain = new Utils.Hook('read', {
  'juejin.im': juejinProcessHandler,
})