import * as jianshuProcesHandler from '../commons/processHandlers/jianshu.com'

/**
 * 实现钩子： read_domain
 * 定义支持的格式
 */
export const hook_read_domain = {
  'jianshu.com': jianshuProcesHandler
}