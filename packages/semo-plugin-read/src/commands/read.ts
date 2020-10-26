import fs from 'fs'
import path from 'path'
import convertUrlToMarkdown from '../commons/convertUrlToMarkdown'
import convertMarkdownToFile from '../commons/convertMarkdownToFile'
import chalk from 'chalk'
import _ from 'lodash'
import mkdirp from 'mkdirp'

export const plugin = 'read'
export const disabled = false // Set to true to disable this command temporarily
export const command = 'read [url]'
export const desc = 'Parse and read a url or a md file with your favorate format.'
// export const aliases = ''
// export const middleware = (argv) => {}

export const builder = function (yargs: any) {
  yargs.option('format', { describe: 'Output format, use --available-formats to see all supported formats, default is markdown.', alias: 'F' })
  yargs.option('clipboard', { describe: 'Input from clipboard'})

  // web format related
  yargs.option('proxy', { describe: 'Proxy images to prevent anti-hotlinking.', alias: 'P' })
  yargs.option('port', { describe: 'Web server port. default is 3000' })
  yargs.option('domain', { describe: 'Set source input from which domain, without protocol and www.' })
  yargs.option('open-browser', { describe: 'Auto open browser.', alias: ['open', 'B'] })
  yargs.option('clear-console', { describe: 'Auto open browser.', alias: ['clear', 'C'] })

  yargs.option('title', { describe: 'Prepend title, use no-title to disable.' })
  yargs.option('footer', { describe: 'Append footer, use no-footer to disable. default is true' })
  yargs.option('toc', { describe: 'Include TOC' })

  yargs.option('rename', { describe: 'New name, with extension.', alias: 'R' })
  yargs.option('output', { describe: 'Location for output.', alias: 'O' })

  yargs.option('available-formats', { describe: 'List all supported formats', alias: 'A' })
}

export const handler = async function (argv: any) {
  const { Utils } = argv.$semo

  argv.format = Utils.pluginConfig('format', 'markdown')
  argv.clipboard = Utils.pluginConfig('clipboard')
  argv.proxy = Utils.pluginConfig('proxy')
  argv.port = Utils.pluginConfig('port', 3000)
  argv.domain = Utils.pluginConfig('domain')
  argv.openBrowser = Utils.pluginConfig('openBrowser')
  argv.clearConsole = Utils.pluginConfig('clearConsole')
  argv.title = Utils.pluginConfig('title')
  argv.footer = Utils.pluginConfig('footer', true)
  argv.toc = Utils.pluginConfig('toc')
  argv.rename = Utils.pluginConfig('rename')
  argv.output = Utils.pluginConfig('output')
  argv.availableFormats = Utils.pluginConfig('availableFormats')

  // set semo core cache
  const cache = Utils.getInternalCache()
  cache.set('argv', argv) // set argv first time
  
  if (argv.availableFormats) {
    const formats = await Utils.invokeHook('read:define_format')
    const headers = ['格式', '说明', '别名']
    const rows = [headers]
    Object.keys(formats).forEach(key => {
      const format = formats[key]
      const describe = _.isObject(format) ? format.describe : format
      const alias = _.isObject(format) ? format.alias : ''
      rows.push([
        key, describe, alias
      ])
    })

    console.log(Utils.chalk.green('\nSupported formats: --format=[FORMAT]\n'))
    Utils.outputTable(rows)
    process.exit(0)
  }

  let output = argv.output
  if (output) {
    if (output[0] === '~') {
      output = output.replace(/^~/, process.env.HOME)
    } else {
      output = path.resolve(process.cwd(), output)
    }
  } else {
    output = process.cwd()
  }

  if (!fs.existsSync(output)) {
    mkdirp.sync(output)
  }

  argv.output = output

  // Even the format is not web or mobi, other plugins may need these values
  argv.port = argv.port || 3000
  
  let format = argv.format
  let title
  let markdown
  let converted

 
  cache.set('argv', argv) // set argv again

  try {
    if (argv.url && argv.url.match(/\.md$/) && !argv.url.match(/^http/)) {
      // local
      let filePath = argv.url[0] !== '/' ? path.resolve(process.cwd(), argv.url) : argv.url
      markdown = fs.readFileSync(filePath, { encoding: 'utf8' })
      title = path.basename(filePath, '.md')
    } else {
      converted = await convertUrlToMarkdown(argv)
      if (!converted) {
        return
      }
      title = converted.title
      markdown = converted.markdown
    }
  
    if (argv.rename) {
      title = path.basename(argv.rename, path.extname(argv.rename))
      format = path.extname(argv.rename) ? path.extname(argv.rename).substring(1) : format
    }
    await convertMarkdownToFile({ format, title, markdown, argv, converted })

    return false // 禁止退出
  } catch (e) {
    console.log(chalk.red('Error: ' + e.stack))
    return true
  }
}
