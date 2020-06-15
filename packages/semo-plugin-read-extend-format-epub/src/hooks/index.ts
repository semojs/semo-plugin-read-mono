import epubHandler from '../commons/formatHandlers/epub'

/**
 * 实现钩子： read_define_format
 * 定义支持的格式
 */
export const hook_read_define_format = {
  epub: {
    describe: 'EPUB 格式，基于 Pandoc',
    handler: epubHandler
  },
}