import { Utils } from '@semo/core'

import markdownHandler from '../commons/formatHandlers/markdown'
import debugHandler from '../commons/formatHandlers/debug'
import consoleHandler from '../commons/formatHandlers/console'
import clipboardHandler from '../commons/formatHandlers/clipboard'


export const hook_hook = new Utils.Hook('semo', {
  define_format: 'Define plugin supported formats.',
  domain: 'Custom preprocessor and postprocessor of your favorate domain.'
})

/**
 * 实现钩子： hook_define_format
 * 定义支持的格式
 */
export const hook_define_format = new Utils.Hook('read', {
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
  clipboard: {
    describe: '输出到剪切板',
    handler: clipboardHandler
  }
})