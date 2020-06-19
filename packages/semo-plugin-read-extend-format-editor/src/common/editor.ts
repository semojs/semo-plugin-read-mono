import path from 'path'

import { startServer } from 'semo-plugin-serve'

export = async ({ title, markdown, converted, argv }) => {

  await startServer({
    port: argv.port,
    proxy: true,
    // gzip: true,
    fileIndex: false,
    routeDir: path.resolve(__dirname, '../routers'),
    publicDir: path.resolve(__dirname, '../../assets'),
    viewsDir: path.resolve(__dirname, '../../views'),
    viewsData: { title, markdown },
    disableGlobalExcpetionRouter: true,
    openBrowser: argv.openBrowser,
    clearConsole: argv.clearConsole
  })
}