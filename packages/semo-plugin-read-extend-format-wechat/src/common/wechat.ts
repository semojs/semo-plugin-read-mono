import { startServer } from 'semo-plugin-serve'
import path from 'path'

export = async ({ title, markdown, converted, argv }) => {

  markdown = markdown || '# ' // 如果为空会有默认帮助文档
  await startServer({
    port: argv.port,
    proxy: true,
    // gzip: true,
    fileIndex: false,
    routeDir: path.resolve(__dirname, '../routers'),
    publicDir: path.resolve(__dirname, '../../assets'),
    viewsDir: path.resolve(__dirname, '../../views'),
    viewsData: { title, markdown },
    disableGlobalExcpetionRouter: true
  })
}