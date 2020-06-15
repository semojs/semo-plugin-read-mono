import marked from 'marked'
import TerminalRenderer from 'marked-terminal'

export = async ({ format, title, markdown, argv, converted }) => {
  marked.setOptions({
    renderer: new TerminalRenderer()
  })
  console.log(marked(markdown))
}