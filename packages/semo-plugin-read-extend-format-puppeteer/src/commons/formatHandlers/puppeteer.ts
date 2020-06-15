import { convertMd } from '@vipzhichengfork/pretty-markdown-pdf'
import mkdirp from 'mkdirp'
import fs from 'fs'
import path from 'path'

export = async ({ format, title, markdown, argv, converted }) => {
  // markdown is temp file in this process
  const mdName = `/tmp/semo-plugin-read/${title}.md`

  mkdirp.sync(path.dirname(mdName))
  fs.writeFileSync(mdName, markdown)

  if (format === 'jpg') {
    format = 'jpeg'
  }

  await convertMd({ 
    markdownFilePath: mdName, 
    outputFileType: format,
    outputFilePath: path.resolve(argv.dir, `${title}.${format}`),
    configFilePath: argv.configPath || path.resolve(__dirname, '../../config.json'),
    executablePath: argv.executablePath
  })
  fs.unlinkSync(mdName)
}