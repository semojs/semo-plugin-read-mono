
import { Utils } from '@semo/core'
import * as mpProcessHandler from '../commons/processHandlers/mp.weixin.qq.com'

/**
 * 实现钩子： hook_domain
 * 定义支持的格式
 */
export const hook_domain = new Utils.Hook('read', {
  'mp.weixin.qq.com': mpProcessHandler,
})