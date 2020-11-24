
import { Utils } from '@semo/core'

const convertMarkdownToFile = async ({ format, title, markdown, argv, converted }) => {
  const extendFormats: any = await Utils.invokeHook('read:define_format')
  
  // support format alias
  Object.keys(extendFormats).forEach((format: any) => {
    let formatObject = extendFormats[format]
    if (formatObject.alias) {
      formatObject.alias = Utils._.castArray(formatObject.alias)
      formatObject.alias.forEach(alias => {
        extendFormats[alias] = {
          handler: formatObject.handler,
        }
      })
    }
  })

  if (extendFormats[format]) {
    if (extendFormats[format] && Utils._.isObject(extendFormats[format]) && extendFormats[format].handler && Utils._.isFunction(extendFormats[format].handler)) {
      await ((extendFormats[format].handler)({ format, title, markdown, argv, converted }))
      return
    } else {
      throw new Error(`Format ${format} exist, but handler is not a function.`)
    }
  } else {
    throw new Error('Unsupported format!')
  }
}

export default convertMarkdownToFile