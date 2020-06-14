import fs from 'fs'
import path from 'path'

import mkdirp from 'mkdirp'
import { convertMd } from '@vipzhichengfork/pretty-markdown-pdf'
import { spawn } from 'child_process'

import shell from 'shelljs'

import marked from 'marked'
import TerminalRenderer from 'marked-terminal'

import { Utils } from '@semo/core'

const convertMarkdownToFile = async ({ format, title, markdown, argv, converted }) => {
  let dir = Utils._.get(argv, 'semo-plugin-read.directory', argv.dir)
  if (dir) {
    if (dir[0] === '~') {
      dir = dir.replace(/^~/, process.env.HOME)
    } else {
      dir = path.resolve(process.cwd(), dir)
    }
  } else {
    dir = process.cwd()
  }

  if (!fs.existsSync(dir)) {
    mkdirp.sync(dir)
  }

  const extendFormats = await Utils.invokeHook('read_implement_format')
  if (extendFormats[format]) {
    if (Utils._.isFunction(extendFormats[format])) {
      await ((extendFormats[format])({ format, title, markdown, argv, converted }))
      return
    } else {
      throw new Error(`Format ${format} exist, but handler is not a function.`)
    }
  } else if (['html', 'pdf', 'png', 'jpeg'].includes(format)) {

    // markdown is temp file in this process
    const mdName = `/tmp/semo-plugin-read/${title}.md`

    mkdirp.sync(path.dirname(mdName))
    fs.writeFileSync(mdName, markdown)

    await convertMd({ 
      markdownFilePath: mdName, 
      outputFileType: format,
      outputFilePath: path.resolve(dir, `${title}.${format}`),
      configFilePath: argv.configPath || path.resolve(__dirname, '../config.json'),
      executablePath: argv.executablePath
    })
    fs.unlinkSync(mdName)
  } else if (format === 'markdown' || format === 'md') {
    const mdName = path.resolve(dir, `${title}.md`)
    fs.writeFileSync(mdName, markdown)
  } else if (format === 'less') {
    marked.setOptions({
      renderer: new TerminalRenderer()
    })
    spawn(`cat <<< "${marked(markdown)}" | less -r`, { 
      stdio: 'inherit',
      shell: true
    })
  } else if (format === 'console') {
    console.log(markdown)
  } else if (format === 'epub') {
    if (shell.which('pandoc')) {
      // markdown is temp file in this process
      const mdName = `/tmp/semo-plugin-read/${title}.md`

      mkdirp.sync(path.dirname(mdName))
      fs.writeFileSync(mdName, markdown)

      shell.exec(`pandoc --metadata title="${title}" "${mdName}" -o "${dir}/${title}.epub" `)

      fs.unlinkSync(mdName)
    } else {
      console.log('.epub format need pandoc installed first.')
    }
  } else if (format === 'mobi') {
    if (shell.which('ebook-convert')) {
      // markdown is temp file in this process
      const mdName = `/tmp/semo-plugin-read/${title}.md`

      mkdirp.sync(path.dirname(mdName))
      fs.writeFileSync(mdName, markdown)

      shell.exec(`ebook-convert "${mdName}" "${dir}/${title}.mobi" --title ${title} --authors ${argv.domain}`)

      fs.unlinkSync(mdName)
    } else {
      console.log('.mobi format need ebook-convert of Calibre installed first.')
    }
  } else {
    throw new Error('Unsupported format!')
  }
}

export default convertMarkdownToFile