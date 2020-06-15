import wechatHandler from '../common/wechat'

/**
 * 实现钩子： read_define_format
 * 定义支持的格式
 */
export const hook_read_define_format = {
  wechat: '基于 Markdown 的微信公众号文章编辑器，基于国产的 Markdown Nice',
  handler: wechatHandler
}