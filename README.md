# XiaoHammer QR Code

[English](README.md) | [简体中文](README.zh-CN.md) | [繁體中文](README.zh-TW.md)

A fully offline browser-based QR code generator and image decoder. It generates QR codes from plain text and decodes QR codes from local images directly in the browser.

## Live Demo

GitHub Pages:

https://fionviber.github.io/XiaoHammerQRCode/

## Screenshot

![XiaoHammer QR Code English interface](assets/screenshots/screenshot-en.png)

## Features

- Generate QR codes from plain text
- Download the generated QR code as a PNG image
- Copy the generated QR code image when clipboard access is available
- Decode QR codes from uploaded, dragged, or pasted images
- Keep lightweight in-session records for generated text and decoded text
- Auto-detect English, Simplified Chinese, and Traditional Chinese from the browser language
- Allow manual language switching with a saved local preference
- Show lightweight emoji toast feedback for generation, clearing, copying, downloading, decoding, and record actions
- Run fully offline after the page and vendored library are available locally

## Usage

Download the repository and open `index.html` in a modern browser.

You can also host the repository as a static site. No build step is required.

## Privacy

QR generation and image decoding happen in the browser. The page does not upload your text or images to a server, and the core QR tool does not require a backend, account, CDN, or network request.

## Credits

QR generation and image decoding are powered by the bundled ZXing Browser library.

See [CREDITS.md](CREDITS.md) and [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) for open-source library credits and third-party notices.

## Disclaimer

This project is provided "as is", without warranty of any kind. QR code readability can depend on image quality, lighting, cropping, and device behavior, so important use should still be checked manually.

## License

This project's original code and documentation are licensed under the [Zero-Clause BSD License](LICENSE) (`0BSD`).

Bundled third-party library code remains under its original license.
