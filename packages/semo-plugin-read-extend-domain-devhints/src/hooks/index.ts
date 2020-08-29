import { Utils } from '@semo/core'
import * as processHandler from '../commons/processHandlers/devhints'

/**
 * 实现钩子： hook_domain
 * 定义支持的格式
 */
export const hook_domain = new Utils.Hook('read', {
  'devhints.io': processHandler,
})