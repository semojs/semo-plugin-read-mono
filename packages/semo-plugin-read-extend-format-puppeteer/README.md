# semo-plugin-read-extend-format-puppeteer

这是一个 `semo-plugin-read`的插件， 为其添加了pdf, html, jpeg, png 等格式，基于 Puppeteer

## 用法

```
npm i -g @semo/cli semo-plugin-read semo-plugin-read-extend-format-puppeteer
semo read --help
semo read -A
semo read URL --format=pdf
semo read URL --format=html
semo read URL --format=png
semo read URL --format=jpeg
```

## semo-plugin-read

`semo-plugin-read` 的作用是分析一个网页的主要内容，并处理成自己想要的格式。主要是为了帮助把喜欢的网页内容收藏和处理成想要的格式，便于整理。

## 协议

MIT

