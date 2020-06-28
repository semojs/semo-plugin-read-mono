import { Utils } from '@semo/core'
import mkdirp from 'mkdirp'
import fs from 'fs'
import path from 'path'

export = async ({ format, title, markdown, argv, converted }) => {
  if (Utils.shell.which('pandoc')) {
    if (!title || !markdown) {
      Utils.error('No content')
      return
    }
    
    // markdown is temp file in this process
    const mdName = `/tmp/semo-plugin-read/${title}.md`

    mkdirp.sync(path.dirname(mdName))
    fs.writeFileSync(mdName, markdown)

    Utils.shell.exec(`pandoc --metadata title="${title}" "${mdName}" -o "${argv.output}/${title}.epub" --toc --toc-depth=2`)

    fs.unlinkSync(mdName)
    Utils.success(`Saved to ${Utils.chalk.yellow(argv.output + '/' + title + '.epub')} successfully.`)
  } else {
    console.log('.epub format need pandoc installed first.')
  }
}