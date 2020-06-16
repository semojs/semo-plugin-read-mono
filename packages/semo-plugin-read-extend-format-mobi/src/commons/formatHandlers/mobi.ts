import { Utils } from '@semo/core'
import mkdirp from 'mkdirp'
import fs from 'fs'
import path from 'path'

export = async ({ format, title, markdown, argv, converted }) => {
  if (Utils.shell.which('ebook-convert')) {
    // markdown is temp file in this process
    const mdName = `/tmp/semo-plugin-read/${title}.md`

    mkdirp.sync(path.dirname(mdName))
    fs.writeFileSync(mdName, markdown)

    console.log(`ebook-convert "${mdName.replace(/(\s+)/g, '\\$1')}" "${argv.dir}/${title.replace(/(\s+)/g, '\\$1')}.mobi" --title "${title.replace(/(\s+)/g, '\\$1')}" --authors ${argv.domain}`)
    Utils.shell.exec(`ebook-convert ${mdName.replace(/(\s+)/g, '\\$1')} "${argv.dir}/${title.replace(/(\s+)/g, '\\$1')}.mobi" --title "${title.replace(/(\s+)/g, '\\$1')}" --authors ${argv.domain}`)

    fs.unlinkSync(mdName)
    Utils.success(`Saved to ${Utils.chalk.yellow(argv.dir + '/' + title + '.mobi')} successfully.`)
  } else {
    console.log('.mobi format need ebook-convert of Calibre installed first.')
  }
}