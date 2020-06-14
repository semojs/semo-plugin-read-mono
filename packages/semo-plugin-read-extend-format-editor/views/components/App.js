import React from "react";
import Vditor from "vditor";
import "vditor/src/assets/scss/index.scss"

// 编辑器默认的内容
const defaultText = document.getElementById('markdown').innerHTML;

class App extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    const vditor = new Vditor('vditor', {
      counter: true,
      toolbarConfig: {
        pin: true
      },
      toolbar: [
        "emoji",
        "headings",
        "bold",
        "italic",
        "strike",
        "link",
        "|",
        "list",
        "ordered-list",
        "check",
        "outdent",
        "indent",
        "|",
        "quote",
        "line",
        "code",
        "inline-code",
        "insert-before",
        "insert-after",
        "|",
        "table",
        "|",
        "undo",
        "redo",
        "|",
        "fullscreen",
        "preview",
        "outline",
        "edit-mode",
        "code-theme",
        {
            name: "more",
            toolbar: [
                "both",
                "format",
                "info",
            ],
        }],
      tab: '  ',
      outline: false,
      typewriterMode: false,
      cache: {
        enable: false
      },
      preview: {
        markdown: {
          sanitize: false,
          setext: true,
          codeBlockPreview: false
        }
      },
      after () {
        vditor.setValue(defaultText)
      },
    })
  }

  render () {
    return <div id="vditor"></div>
  }
}

export default App;