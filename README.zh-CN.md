# XiaoHammer QR Code

[English](README.md) | [简体中文](README.zh-CN.md) | [繁體中文](README.zh-TW.md)

一个注重隐私、可离线使用的二维码生成和图片解码工具。它以静态网页运行，可以直接通过 `file://` 打开，核心功能不需要后端、账号、CDN 或网络请求。

## 在线演示

GitHub Pages：

https://fionviber.github.io/XiaoHammerQRCode/

## 界面截图

![XiaoHammer QR Code 简体中文界面](assets/screenshots/screenshot-zh-CN.png)

## 功能

- 根据纯文本生成二维码
- 将生成的二维码下载为 PNG 图片
- 在浏览器允许剪贴板权限时复制二维码图片
- 从上传、拖拽或粘贴的图片中解码二维码
- 在当前会话中保留轻量的生成文本记录和解码文本记录
- 根据浏览器语言自动识别英语、简体中文、繁体中文
- 支持手动切换语言，并将偏好保存在本地
- 页面和本地打包库可用后，核心功能可以完全离线运行

## 使用

下载仓库后，用现代浏览器打开 `index.html`。

你也可以把这个仓库作为静态站点托管，不需要构建步骤。

## 隐私

二维码生成和图片解码都在浏览器中完成。页面不会把你的文本或图片上传到服务器。会话记录只保存在内存里，关闭或刷新页面后会清空。

## 致谢

开源库和第三方说明见 [CREDITS.md](CREDITS.md)。

## 开源许可

本项目使用 [BSD Zero Clause License](LICENSE)（`0BSD`）。
