import React from "react";
import MarkdownNice from "markdown-nice";

function htmlDecode(input){
  let e = document.createElement('textarea')
  e.innerHTML = input;
  // handle case of empty input
  return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}

// 编辑器默认的内容
const defaultText = htmlDecode(document.getElementById('markdown').innerHTML);
// 标题，是一个字符串
const defaultTitle = "微信公众号编辑器";

function App() {
  return (
    <MarkdownNice
      defaultTitle={defaultTitle}
      defaultText={defaultText}
      onTextChange={(t) => console.log("text => ", t)}
    />
  );
}

export default App;