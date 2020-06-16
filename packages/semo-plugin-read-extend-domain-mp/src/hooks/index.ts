
import * as mpProcessHandler from '../commons/processHandlers/mp.weixin.qq.com'

/**
 * 实现钩子： read_domain
 * 定义支持的格式
 */
export const hook_read_domain = {
  'mp.weixin.qq.com': mpProcessHandler,
}