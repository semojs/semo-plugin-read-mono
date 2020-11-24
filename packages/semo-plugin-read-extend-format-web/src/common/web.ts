import path from 'path'

import { startServer } from 'semo-plugin-serve'
import marked from 'marked'

export = async ({ title, markdown, converted, argv }) => {

  let html = marked(markdown)

  console.log({html, markdown})

  await startServer({
    port: argv.port,
    proxy: true,
    // gzip: true,
    fileIndex: false,
    routeDir: path.resolve(__dirname, '../routers'),
    publicDir: path.resolve(__dirname, '../../assets'),
    viewsDir: path.resolve(__dirname, '../../views'),
    viewsData: { title, html },
    disableGlobalExcpetionRouter: true,
    openBrowser: argv.openBrowser,
    clearConsole: argv.clearConsole
  })
}