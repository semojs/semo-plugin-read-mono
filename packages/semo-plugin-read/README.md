semo-plugin-read
------------------

这是一个简单的工具插件，目的是实现一个能够方便的获取网页主体的命令行工具，以方面我们以各种方式搜集整理学习资料，支持各种格式，有一些特色模式，为了简单这里也称之为格式。

## 安装和使用

```bash
npm i -g @semo/cli semo-plugin-read

# 用法
semo read [URL|本地 markdown] --format=[FORMAT]

# 帮助
semo read [url]

Parse and read a url or a md file with your favorate format.

选项：
  --format, -F                  Output format, use --available-formats to see all supported formats,
                                default: markdown.                                 [默认值: "markdown"]
  --read-only, --ro             Only render html, used with web format.
  --proxy, -P                   Proxy images to prevent anti-hotlinking.
  --port                        Web server port.
  --localhost                   Localhost host with port, auto set and you can change.
  --nethost                     WLAN host with port, auto set and you can change.
  --open-browser, --open, --ob  Auto open browser in web format.
  --clear-console, --clear      Auto clear console.
  --title                       Prepend title, use no-title to disable.                  [默认值: true]
  --footer                      Append footer, use no-footer to disable.                 [默认值: true]
  --toc                         Include TOC                                              [默认值: true]
  --rename, -R                  New name, with extension.
  --output, -O            Location for output.
  --available-formats, -A       List supported formats
```

## 扩展

一共有两类扩展，一类是扩展新格式，一类是扩展对特殊网站的处理规则，具体的扩展相关的插件可能会比较多就不一一列举了，可以看项目的 packages 目录里的项目。

扩展格式的钩子是：

```js 
read_define_format: async ({ format, title, markdown, argv, converted }) => {}
```

其中各个参数的含义为：

* format: 命令输入的格式选项
* title: 网页的标题
* markdown: 通过 HTML 解析出的 Markdown 格式的文档
* converted: converted.content 是分析出的网页主体
* argv: 是 Semo 接收到的所有参数和配置

扩展文档预处理和后处理的钩子是：

```js
hook_read_domain: {
  preprocess: (html, argv) => html,
  postprocess: (markdown, argv) => markdown
}
```

参数里的 html 是网页的原始 HTML， markdown 是解析之后的 Markdown。

## 使用举例

```bash
semo read https://juejin.im/post/5d82e116e51d453b7779d5f6
semo read README.md # 欣赏一下自己项目的 README
semo read --format=wechat # wechat 是插件提供的格式，需要安装响应的插件
semo run read URL --format=markdown # 这种方式不需要『下载』即可使用
semo read --available-formats # 查看支持的格式
```

## 内置支持的格式

通过扩展可以扩展出很多个性化的格式，这里只说一下内置的格式

* `markdown|md` 或 `md`: 最基本的格式和用途
* `console`: 将 `markdown` 直接输出到终端，可以按需处理
* `debug`: 输出原始网页被程序处理出来的主体部分，用于调试

## 已知 BUG

1. 生成 `mobi` 格式时，远程图片会丢失，可以先转成 `epub`，然后自己用 `ebook-convert` 转成 `mobi`。
2. 部分网站采用 AJAX 的方式动态获取内容，目前还不支持。

## 感谢

本项目只是为了达到开发目的，对各种相关开源项目进行测试，优选和组合，我写的代码不值一提，更多的核心功能都来自于各个依赖包，希望大家能够喜欢我做的整合，并多提宝贵意见。

## 未来规划

这个插件的实现不是很复杂，主要是要适配各个网站，如果能适配的好，那就是有用的，目前已经提供了扩展方式，希望以后有越来越多的格式支持和各个优质内容网站的定制处理，同时也希望能够形成社区，欢迎大家试用，发现 BUG 和提 ISSUE。

### 注意事项

1. 如果你要把自己实现的插件发布到 npm，建议你分开实现这两个钩子，一个插件只做一件事情。如果你只是自己用，那么你可以一个插件实现所有的钩子，维护更加方便。
2. 大家按照规则扩展出来的插件可能出现格式重名或者网站重名，这种情况无法避免。但是欢迎大家把自己开发的插件通过 PR 提交给本项目，这样人工审核可以尽量避免这种事情的发生。


## 关于 semo

`semo` 是这个插件的驱动，是我开发的一个命令行开发框架，是在开源项目 `yargs` 基础上做的封装，大家感兴趣的话可以移步[这里](https://semo.js.org)和[这里](https://github.com/semojs)了解 更多。


## 协议

MIT