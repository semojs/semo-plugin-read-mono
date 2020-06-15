import markdownHandler from '../commons/formatHandlers/markdown'
import debugHandler from '../commons/formatHandlers/debug'
import consoleHandler from '../commons/formatHandlers/console'
import epubHandler from '../commons/formatHandlers/epub'
import mobiHandler from '../commons/formatHandlers/mobi'

export const hook_hook = {
  read_define_format: 'Define plugin supported formats.',
  read_domain: 'Custom preprocessor and postprocessor of your favorate domain.'
}

/**
 * 实现钩子： read_define_format
 * 定义支持的格式
 */
export const hook_read_define_format = {
  markdown: {
    describe: 'Markdown 格式',
    alias: 'md',
    handler: markdownHandler
  },
  debug: {
    describe: '查看识别到的中间 HTML 结果',
    handler: debugHandler
  },
  console: {
    describe: '终端直接输出',
    handler: consoleHandler
  },
}