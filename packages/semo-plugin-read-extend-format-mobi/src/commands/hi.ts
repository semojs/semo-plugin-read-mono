export const disabled = false // Set to true to disable this command temporarily
export const command = 'hi'
export const desc = 'hi'
// export const aliases = ''
// export const middleware = (argv) => {}

export const builder = function (yargs: any) {
  // yargs.option('option', { default, describe, alias })
  // yargs.commandDir('hi')
}

export const handler = async function (argv: any) {
  console.log('Hey you!')
}
