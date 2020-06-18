export = async (ctx, argv) => {
  ctx.json = false
  return await ctx.render('index.html', argv.viewsData || {})
}