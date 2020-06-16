import Koa from 'koa'
import Router from 'koa-router'
import views from 'koa-views'
import serve from 'koa-static'

import axios from 'axios'

import { startServer } from 'semo-plugin-serve'

export = async ({ title, markdown, converted, argv }) => {
  const app = new Koa()
  var router = new Router();

  markdown = markdown || '# ' // 如果为空会有默认帮助文档

  router.get('/proxy/(.*)', async (ctx, next) => {
    const proxyUrl = ctx.request.url.substring(7)
    return axios({
      url: proxyUrl,
      responseType: 'stream'
    }).then(response => {
      ctx.type = response.headers['content-type']
      ctx.body = response.data
    })
  });

  app.use(router.routes())

  app.use(views(__dirname + '/../../views', {
    map: {
      html: 'nunjucks',
      extension: 'html'
    }
  }));

  app.use(serve(__dirname + '/../../assets'))

  app.use(async function (ctx) {
    return await ctx.render('index.html', {
      title, markdown
    });
  });

  await startServer({
    port: argv.port
  }, app)
}