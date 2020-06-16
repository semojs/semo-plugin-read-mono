import clipboardy from 'clipboardy'
import { Utils } from '@semo/core'

export = async ({ format, title, markdown, argv, converted }) => {
  clipboardy.writeSync(markdown)
  Utils.success(`Copied to system clipboard successfully.`)
}