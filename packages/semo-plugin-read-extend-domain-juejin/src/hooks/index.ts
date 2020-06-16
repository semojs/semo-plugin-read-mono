
import * as juejinProcessHandler from '../commons/processHandlers/juejin.im'

/**
 * 实现钩子： read_domain
 * 定义支持的格式
 */
export const hook_read_domain = {
  'juejin.im': juejinProcessHandler,
}