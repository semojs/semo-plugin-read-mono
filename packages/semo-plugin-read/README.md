semo-plugin-read
------------------

This is a Semo plugin, to provide a cli tool to grab web page and process to many useful formats for learning purpose.

## Usage

```bash
npm i -g @semo/cli semo-plugin-read

semo read [URL|本地 markdown] --format=[FORMAT]

semo read [url]

Parse and read a url or a md file with your favorate format.

选项：
  --format, -F                  Output format, use --available-formats to see all supported formats, default: markdown.
                                                                                                    [默认值: "markdown"]
  --clipboard                   Input from clipboard
  --proxy, -P                   Proxy images to prevent anti-hotlinking.
  --port                        Web server port.                                                          [默认值: 3000]
  --domain                      Set source input from which domain, without protocol and www.
  --open-browser, --open, -B    Auto open browser.
  --clear-console, --clear, -C  Auto open browser.
  --title                       Prepend title, use no-title to disable.
  --footer                      Append footer, use no-footer to disable.                                  [默认值: true]
  --toc                         Include TOC
  --rename, -R                  New name, with extension.
  --output, -O                  Location for output.
  --available-formats, -A       List all supported formats
```

## Extend plugin

There are 2 kinds of extensions, one is for defining formats, another one is for processing content. There are many extensions already under `/packages` directory.

**Define formats**

```js 
hook_define_format: new Utils.Hook('semo-plugin-read', async ({ format, title, markdown, argv, converted }) => {})
```

Arguments:

* format: Semo read option for format
* title: Web page url
* markdown: Parsed Markdown
* converted: converted.content is the main part html of the page body
* argv: Semo's argv

** Domain's processing **

```js
hook_domain: new Utils.Hook('semo-plugin-read', {
  preprocess: (html, argv) => html,
  postprocess: (markdown, argv) => markdown
})
```

* html: original html
* markdown: parsed markdown

## Examples

```bash
semo read https://juejin.im/post/5d82e116e51d453b7779d5f6
semo read README.md --format console
semo read --format=wechat # wechat format is defined by plugin 
semo run read URL --format=markdown # Semo can run read command in this way
semo read --available-formats # Show all formats
```

## Built-in formats

There are many format defined by read plugins, here only shows built-in formats.

* `markdown` or `md`: Convert web page to markdown
* `console`: Output markdown to console
* `debug`: Output parsed main page html, for debuging

## Known bugs

1. `mobi` plugin can not save remote images, we can first save to `epub` format, then covert to `mobi` using `ebook-convert` command.
2. Ajax content do not support for now.

## Contributions

PRs, Issues, Plugins are all welcome.

## About Semo

`semo` 是这个插件的驱动，是我开发的一个命令行开发框架，是在开源项目 `yargs` 基础上做的封装，大家感兴趣的话可以移步[这里](https://semo.js.org)和[这里](https://github.com/semojs)了解 更多。

`Semo` is the core of this plugin, is a command line framework, based on `yargs`. You can see more on [https://semo.js.org](https://semo.js.org) and [https://github.com/semojs](https://github.com/semojs)


## LICENSE

MIT