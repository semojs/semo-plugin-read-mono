import fs from 'fs'
import path from 'path'
import { Utils } from '@semo/core'

export = async ({ format, title, markdown, argv, converted }) => {

  if (!title || !markdown) {
    Utils.error('No content')
    return
  }

  const mdName = path.resolve(argv.output, `${title}.md`)
  fs.writeFileSync(mdName, markdown)
  Utils.success(`Saved to ${Utils.chalk.yellow(mdName)} successfully.`)
}