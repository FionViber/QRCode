(function () {
  "use strict";

  const QR_SIZE_DEFAULT = 400;
  const MAX_RECORDS = 100;
  const SVG_NS = "http://www.w3.org/2000/svg";
  const LANGUAGE_STORAGE_KEY = "localQrToolkitLanguage";
  const SUPPORTED_LANGUAGES = ["en", "zh-CN", "zh-TW"];

  const translations = {
    en: {
      documentTitle: "QR Code Tool",
      appTitle: "QR Code Generator and Decoder",
      languageLabel: "Language",
      languageAuto: "Auto",
      generatorTitle: "QR Code Generator",
      decoderTitle: "QR Code Decoder",
      textInputLabel: "Enter text",
      textInputPlaceholder: "Enter text",
      sizeLabel: "Size",
      generateButton: "Generate QR Code",
      clearButton: "Clear",
      generatedResultLabel: "Generated QR Code",
      qrEmpty: "Waiting to generate",
      downloadImage: "Download Image",
      copyImage: "Copy Image",
      imageDecodeTitle: "Image Decode",
      dropzoneText: "Choose an image, or drop/paste one",
      recordsAriaLabel: "Records",
      generationRecordsTitle: "Generation History",
      decodeRecordsTitle: "Decode Results",
      copyAllButton: "Copy All",
      noGenerationRecords: "No generation history",
      noDecodeRecords: "No decode results",
      textMeta: "{chars} characters / {bytes} bytes",
      enterTextError: "Enter text before generating.",
      generatingStatus: "Generating...",
      generatedStatus: "Generated.",
      generationFailed: "Failed to generate.",
      noQrToCopy: "No QR code to copy",
      imageCopied: "Image copied",
      imageDataUrlCopied: "Image Data URL copied",
      clipboardUnavailable: "Clipboard permission is not available",
      noQrToDownload: "No QR code to download",
      noSupportedImage: "No supported image found.",
      decodingImages: "Decoding {count} image(s)...",
      decodeSuccess: "Done: {success}/{total} image(s) decoded.",
      decodeFailure: "No QR code found.",
      libraryLoadError: "zxing-browser.min.js failed to load.",
      imageReadError: "The image could not be read.",
      copyButton: "Copy",
      textCopied: "Copied",
      regenerateButton: "Make QR Code",
      openButton: "Open",
    },
    "zh-CN": {
      documentTitle: "二维码工具",
      appTitle: "二维码生成及解码工具",
      languageLabel: "语言",
      languageAuto: "自动",
      generatorTitle: "二维码生成",
      decoderTitle: "二维码解码",
      textInputLabel: "请输入文字",
      textInputPlaceholder: "请输入文字",
      sizeLabel: "尺寸",
      generateButton: "生成二维码",
      clearButton: "清空",
      generatedResultLabel: "生成结果",
      qrEmpty: "等待生成",
      downloadImage: "下载图片",
      copyImage: "复制图片",
      imageDecodeTitle: "图片解码",
      dropzoneText: "选择图片，或拖拽/粘贴图片",
      recordsAriaLabel: "记录",
      generationRecordsTitle: "生成记录",
      decodeRecordsTitle: "解码结果",
      copyAllButton: "复制全部",
      noGenerationRecords: "暂无生成记录",
      noDecodeRecords: "暂无解码结果",
      textMeta: "{chars} 字符 / {bytes} 字节",
      enterTextError: "请输入文字后再生成。",
      generatingStatus: "正在生成...",
      generatedStatus: "已生成。",
      generationFailed: "生成失败。",
      noQrToCopy: "当前没有可复制的二维码",
      imageCopied: "已复制图片",
      imageDataUrlCopied: "已复制图片 Data URL",
      clipboardUnavailable: "浏览器没有开放剪贴板权限",
      noQrToDownload: "当前没有可下载的二维码",
      noSupportedImage: "没有可识别的图片。",
      decodingImages: "正在解码 {count} 张图片...",
      decodeSuccess: "完成：{success}/{total} 张识别成功。",
      decodeFailure: "没有识别到二维码。",
      libraryLoadError: "zxing-browser.min.js 未加载。",
      imageReadError: "图片无法读取。",
      copyButton: "复制",
      textCopied: "已复制",
      regenerateButton: "转成二维码",
      openButton: "打开",
    },
    "zh-TW": {
      documentTitle: "二維碼工具",
      appTitle: "二維碼產生及解碼工具",
      languageLabel: "語言",
      languageAuto: "自動",
      generatorTitle: "二維碼產生",
      decoderTitle: "二維碼解碼",
      textInputLabel: "請輸入文字",
      textInputPlaceholder: "請輸入文字",
      sizeLabel: "尺寸",
      generateButton: "產生二維碼",
      clearButton: "清空",
      generatedResultLabel: "產生結果",
      qrEmpty: "等待產生",
      downloadImage: "下載圖片",
      copyImage: "複製圖片",
      imageDecodeTitle: "圖片解碼",
      dropzoneText: "選擇圖片，或拖曳/貼上圖片",
      recordsAriaLabel: "記錄",
      generationRecordsTitle: "產生記錄",
      decodeRecordsTitle: "解碼結果",
      copyAllButton: "全部複製",
      noGenerationRecords: "暫無產生記錄",
      noDecodeRecords: "暫無解碼結果",
      textMeta: "{chars} 字元 / {bytes} 位元組",
      enterTextError: "請輸入文字後再產生。",
      generatingStatus: "正在產生...",
      generatedStatus: "已產生。",
      generationFailed: "產生失敗。",
      noQrToCopy: "目前沒有可複製的二維碼",
      imageCopied: "已複製圖片",
      imageDataUrlCopied: "已複製圖片 Data URL",
      clipboardUnavailable: "瀏覽器未開放剪貼簿權限",
      noQrToDownload: "目前沒有可下載的二維碼",
      noSupportedImage: "沒有可辨識的圖片。",
      decodingImages: "正在解碼 {count} 張圖片...",
      decodeSuccess: "完成：{success}/{total} 張辨識成功。",
      decodeFailure: "沒有辨識到二維碼。",
      libraryLoadError: "zxing-browser.min.js 未載入。",
      imageReadError: "圖片無法讀取。",
      copyButton: "複製",
      textCopied: "已複製",
      regenerateButton: "轉成二維碼",
      openButton: "開啟",
    },
  };

  const localeByLanguage = {
    en: "en-US",
    "zh-CN": "zh-CN",
    "zh-TW": "zh-TW",
  };

  const els = {
    languageSelect: document.getElementById("languageSelect"),
    textInput: document.getElementById("textInput"),
    textMeta: document.getElementById("textMeta"),
    sizeSelect: document.getElementById("sizeSelect"),
    generateBtn: document.getElementById("generateBtn"),
    clearTextBtn: document.getElementById("clearTextBtn"),
    generateStatus: document.getElementById("generateStatus"),
    qrCanvas: document.getElementById("qrCanvas"),
    qrEmpty: document.getElementById("qrEmpty"),
    downloadPng: document.getElementById("downloadPng"),
    copyPngBtn: document.getElementById("copyPngBtn"),
    fileInput: document.getElementById("fileInput"),
    dropzone: document.getElementById("dropzone"),
    imageStatus: document.getElementById("imageStatus"),
    generationRecordList: document.getElementById("generationRecordList"),
    decodeRecordList: document.getElementById("decodeRecordList"),
    clearGenerationRecordsBtn: document.getElementById("clearGenerationRecordsBtn"),
    copyAllDecodeBtn: document.getElementById("copyAllDecodeBtn"),
    clearDecodeRecordsBtn: document.getElementById("clearDecodeRecordsBtn"),
    toast: document.getElementById("toast"),
  };

  const encoder = new TextEncoder();
  const state = {
    language: "en",
    languageMode: "auto",
    pngDataUrl: "",
    generationRecords: [],
    decodeRecords: [],
    qrReader: null,
  };

  function t(key, params) {
    const languagePack = translations[state.language] || translations.en;
    const template = languagePack[key] || translations.en[key] || key;
    return template.replace(/\{(\w+)\}/g, (match, name) => {
      return Object.prototype.hasOwnProperty.call(params || {}, name) ? String(params[name]) : match;
    });
  }

  function normalizeLanguage(language) {
    const value = String(language || "").toLowerCase();
    if (!value) return "";
    if (value === "zh" || value.includes("hans") || value.startsWith("zh-cn") || value.startsWith("zh-sg")) {
      return "zh-CN";
    }
    if (
      value.includes("hant") ||
      value.startsWith("zh-tw") ||
      value.startsWith("zh-hk") ||
      value.startsWith("zh-mo")
    ) {
      return "zh-TW";
    }
    if (value.startsWith("en")) {
      return "en";
    }
    return "";
  }

  function detectLanguage() {
    const candidates = [];
    if (Array.isArray(navigator.languages)) {
      candidates.push(...navigator.languages);
    }
    candidates.push(navigator.language);

    for (const candidate of candidates) {
      const normalized = normalizeLanguage(candidate);
      if (normalized) return normalized;
    }
    return "en";
  }

  function getStoredLanguageMode() {
    try {
      const value = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (value === "auto" || SUPPORTED_LANGUAGES.includes(value)) {
        return value;
      }
    } catch (error) {
      return "";
    }
    return "";
  }

  function setStoredLanguageMode(languageMode) {
    try {
      if (languageMode === "auto") {
        localStorage.removeItem(LANGUAGE_STORAGE_KEY);
      } else {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, languageMode);
      }
    } catch (error) {
      return;
    }
  }

  function resolveLanguage(languageMode) {
    return SUPPORTED_LANGUAGES.includes(languageMode) ? languageMode : detectLanguage();
  }

  function updateTranslatedDom() {
    document.documentElement.lang = state.language;
    document.title = t("documentTitle");

    document.querySelectorAll("[data-i18n]").forEach((node) => {
      node.textContent = t(node.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
      node.setAttribute("placeholder", t(node.dataset.i18nPlaceholder));
    });
    document.querySelectorAll("[data-i18n-aria-label]").forEach((node) => {
      node.setAttribute("aria-label", t(node.dataset.i18nAriaLabel));
    });

    els.languageSelect.value = state.languageMode;
  }

  function refreshStatuses() {
    [els.generateStatus, els.imageStatus].forEach((el) => {
      const key = el.dataset.statusKey;
      if (!key) return;
      let params = {};
      try {
        params = JSON.parse(el.dataset.statusParams || "{}");
      } catch (error) {
        params = {};
      }
      el.textContent = t(key, params);
    });
  }

  function applyLanguage(languageMode) {
    state.languageMode = languageMode === "auto" || SUPPORTED_LANGUAGES.includes(languageMode) ? languageMode : "auto";
    state.language = resolveLanguage(state.languageMode);
    updateTranslatedDom();
    updateTextMeta();
    refreshStatuses();
    renderGenerationRecords();
    renderDecodeRecords();
  }

  function setStatus(el, key, type, params) {
    el.dataset.statusKey = key || "";
    el.dataset.statusParams = params ? JSON.stringify(params) : "";
    el.textContent = key ? t(key, params) : "";
    el.classList.toggle("good", type === "good");
    el.classList.toggle("error", type === "error");
  }

  function showToast(key, params) {
    window.clearTimeout(showToast.timer);
    els.toast.textContent = t(key, params);
    els.toast.classList.add("show");
    showToast.timer = window.setTimeout(() => {
      els.toast.classList.remove("show");
    }, 1800);
  }

  function updateTextMeta() {
    const value = els.textInput.value;
    els.textMeta.textContent = t("textMeta", {
      chars: value.length,
      bytes: encoder.encode(value).length,
    });
  }

  function assertLibraries() {
    if (!window.ZXingBrowser) {
      throw new Error(t("libraryLoadError"));
    }
  }

  function getQrReader() {
    assertLibraries();
    if (!state.qrReader) {
      state.qrReader = new window.ZXingBrowser.BrowserQRCodeReader();
    }
    return state.qrReader;
  }

  function disableDownload(link) {
    link.href = "#";
    link.setAttribute("aria-disabled", "true");
  }

  function enableDownload(link, href) {
    link.href = href;
    link.removeAttribute("aria-disabled");
  }

  function setQrEmpty() {
    state.pngDataUrl = "";
    els.qrCanvas.style.display = "none";
    els.qrEmpty.style.display = "block";
    disableDownload(els.downloadPng);
  }

  function isUrlLike(text) {
    try {
      const url = new URL(text);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch (error) {
      return false;
    }
  }

  function formatRecordTime(timestamp) {
    const locale = localeByLanguage[state.language] || localeByLanguage.en;
    return new Date(timestamp).toLocaleString(locale);
  }

  function addRecord(records, text) {
    const value = String(text || "").trim();
    if (!value) return;
    records.unshift({
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      text: value,
      timestamp: Date.now(),
    });
    if (records.length > MAX_RECORDS) {
      records.length = MAX_RECORDS;
    }
  }

  function createRecordItem(record, options) {
    const item = document.createElement("article");
    item.className = "record-item";

    const meta = document.createElement("div");
    meta.className = "record-meta";
    meta.textContent = formatRecordTime(record.timestamp);

    const text = document.createElement("div");
    text.className = `record-text ${options.textClassName || ""}`.trim();
    text.textContent = record.text;

    const actions = document.createElement("div");
    actions.className = "record-actions";

    const copyButton = document.createElement("button");
    copyButton.type = "button";
    copyButton.className = "secondary";
    copyButton.textContent = t("copyButton");
    copyButton.addEventListener("click", () => copyText(record.text));
    actions.appendChild(copyButton);

    if (options.allowRegenerate) {
      const generateButton = document.createElement("button");
      generateButton.type = "button";
      generateButton.className = "secondary";
      generateButton.textContent = t("regenerateButton");
      generateButton.addEventListener("click", () => {
        els.textInput.value = record.text;
        updateTextMeta();
        generateQr();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
      actions.appendChild(generateButton);
    }

    if (options.allowOpenLink && isUrlLike(record.text)) {
      const openLink = document.createElement("a");
      openLink.className = "download-link secondary";
      openLink.href = record.text;
      openLink.target = "_blank";
      openLink.rel = "noreferrer";
      openLink.textContent = t("openButton");
      actions.appendChild(openLink);
    }

    item.append(meta, text, actions);
    return item;
  }

  function renderRecordList(listEl, records, emptyKey, options) {
    if (!records.length) {
      listEl.innerHTML = "";
      const empty = document.createElement("div");
      empty.className = "records-empty";
      empty.textContent = t(emptyKey);
      listEl.appendChild(empty);
      return;
    }

    listEl.innerHTML = "";
    for (const record of records) {
      listEl.appendChild(createRecordItem(record, options));
    }
  }

  function renderGenerationRecords() {
    renderRecordList(els.generationRecordList, state.generationRecords, "noGenerationRecords", {
      allowRegenerate: true,
      allowOpenLink: false,
      textClassName: "generation-record-text",
    });
  }

  function renderDecodeRecords() {
    renderRecordList(els.decodeRecordList, state.decodeRecords, "noDecodeRecords", {
      allowRegenerate: true,
      allowOpenLink: true,
      textClassName: "decode-record-text",
    });
  }

  async function generateQr() {
    const text = els.textInput.value.trim();
    updateTextMeta();
    if (!text) {
      setQrEmpty();
      setStatus(els.generateStatus, "enterTextError", "error");
      return;
    }

    const size = Number(els.sizeSelect.value) || QR_SIZE_DEFAULT;

    try {
      els.generateBtn.disabled = true;
      setStatus(els.generateStatus, "generatingStatus");
      els.qrCanvas.width = size;
      els.qrCanvas.height = size;

      const writer = new window.ZXingBrowser.BrowserQRCodeSvgWriter();
      const svg = writer.write(text, size, size);
      const background = document.createElementNS(SVG_NS, "rect");
      background.setAttribute("x", "0");
      background.setAttribute("y", "0");
      background.setAttribute("width", "100%");
      background.setAttribute("height", "100%");
      background.setAttribute("fill", "#ffffff");
      svg.insertBefore(background, svg.firstChild);

      const serializedSvg = new XMLSerializer().serializeToString(svg);
      const svgBlob = new Blob([serializedSvg], { type: "image/svg+xml" });
      const imageUrl = URL.createObjectURL(svgBlob);
      const image = new Image();
      image.src = imageUrl;
      await image.decode();

      const context = els.qrCanvas.getContext("2d");
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, size, size);
      context.drawImage(image, 0, 0, size, size);
      URL.revokeObjectURL(imageUrl);

      state.pngDataUrl = els.qrCanvas.toDataURL("image/png");
      els.downloadPng.download = "qrcode.png";
      enableDownload(els.downloadPng, state.pngDataUrl);
      els.qrEmpty.style.display = "none";
      els.qrCanvas.style.display = "block";

      addRecord(state.generationRecords, text);
      renderGenerationRecords();
      setStatus(els.generateStatus, "generatedStatus", "good");
    } catch (error) {
      setQrEmpty();
      setStatus(els.generateStatus, "generationFailed", "error");
    } finally {
      els.generateBtn.disabled = false;
    }
  }

  async function copyGeneratedPng() {
    if (!state.pngDataUrl) {
      showToast("noQrToCopy");
      return;
    }
    try {
      const blob = await (await fetch(state.pngDataUrl)).blob();
      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob }),
      ]);
      showToast("imageCopied");
    } catch (error) {
      try {
        await navigator.clipboard.writeText(state.pngDataUrl);
        showToast("imageDataUrlCopied");
      } catch (clipboardError) {
        showToast("clipboardUnavailable");
      }
    }
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      showToast("textCopied");
    } catch (error) {
      showToast("clipboardUnavailable");
    }
  }

  function loadImageFromFile(file) {
    return new Promise((resolve, reject) => {
      const objectUrl = URL.createObjectURL(file);
      const image = new Image();
      image.onload = () => resolve({ image, objectUrl });
      image.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        reject(new Error(t("imageReadError")));
      };
      image.src = objectUrl;
    });
  }

  async function decodeOneFile(file) {
    const reader = getQrReader();
    let objectUrl = "";
    try {
      const loaded = await loadImageFromFile(file);
      objectUrl = loaded.objectUrl;
      const result = await reader.decodeFromImageElement(loaded.image);
      addRecord(state.decodeRecords, result.getText());
      return true;
    } finally {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    }
  }

  async function decodeFiles(fileList) {
    const imageFiles = Array.from(fileList || []).filter((file) => file.type.startsWith("image/"));
    if (!imageFiles.length) {
      setStatus(els.imageStatus, "noSupportedImage", "error");
      return;
    }

    setStatus(els.imageStatus, "decodingImages", "", { count: imageFiles.length });
    let success = 0;
    for (const file of imageFiles) {
      try {
        if (await decodeOneFile(file)) success += 1;
      } catch (error) {
        console.warn("Decode image failed:", file.name, error);
      }
    }

    renderDecodeRecords();
    if (success) {
      setStatus(els.imageStatus, "decodeSuccess", "good", {
        success,
        total: imageFiles.length,
      });
    } else {
      setStatus(els.imageStatus, "decodeFailure", "error");
    }
  }

  function bindEvents() {
    els.languageSelect.addEventListener("change", () => {
      const nextLanguageMode = els.languageSelect.value;
      setStoredLanguageMode(nextLanguageMode);
      applyLanguage(nextLanguageMode);
    });
    els.textInput.addEventListener("input", updateTextMeta);
    els.textInput.addEventListener("keydown", (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
        generateQr();
      }
    });
    els.sizeSelect.addEventListener("change", () => {
      if (els.textInput.value.trim()) generateQr();
    });
    els.generateBtn.addEventListener("click", generateQr);
    els.clearTextBtn.addEventListener("click", () => {
      els.textInput.value = "";
      updateTextMeta();
      setQrEmpty();
      setStatus(els.generateStatus, "");
      els.textInput.focus();
    });
    els.copyPngBtn.addEventListener("click", copyGeneratedPng);
    [els.downloadPng].forEach((link) => {
      link.addEventListener("click", (event) => {
        if (link.getAttribute("aria-disabled") === "true") {
          event.preventDefault();
          showToast("noQrToDownload");
        }
      });
    });

    els.fileInput.addEventListener("change", () => decodeFiles(els.fileInput.files));
    els.dropzone.addEventListener("dragover", (event) => {
      event.preventDefault();
      els.dropzone.classList.add("active");
    });
    els.dropzone.addEventListener("dragleave", () => {
      els.dropzone.classList.remove("active");
    });
    els.dropzone.addEventListener("drop", (event) => {
      event.preventDefault();
      els.dropzone.classList.remove("active");
      decodeFiles(event.dataTransfer.files);
    });
    document.addEventListener("paste", (event) => {
      const files = Array.from(event.clipboardData.files || []).filter((file) => file.type.startsWith("image/"));
      if (files.length) decodeFiles(files);
    });

    els.clearGenerationRecordsBtn.addEventListener("click", () => {
      state.generationRecords.length = 0;
      renderGenerationRecords();
    });
    els.clearDecodeRecordsBtn.addEventListener("click", () => {
      state.decodeRecords.length = 0;
      renderDecodeRecords();
    });
    els.copyAllDecodeBtn.addEventListener("click", () => {
      if (!state.decodeRecords.length) {
        showToast("noDecodeRecords");
        return;
      }
      copyText(state.decodeRecords.map((item) => item.text).join("\n"));
    });
  }

  function init() {
    applyLanguage(getStoredLanguageMode() || "auto");
    try {
      assertLibraries();
      bindEvents();
      setQrEmpty();
      renderGenerationRecords();
      renderDecodeRecords();
    } catch (error) {
      setStatus(els.generateStatus, "libraryLoadError", "error");
      setStatus(els.imageStatus, "libraryLoadError", "error");
    }
  }

  init();
})();
