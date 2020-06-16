import * as zhihuProcessHandler from '../commons/processHandlers/zhihu.com'

/**
 * 实现钩子： read_domain
 * 定义支持的格式
 */
export const hook_read_domain = {
  'zhihu.com': zhihuProcessHandler
}