# You Mean LLMs

A Chrome extension that clarifies what is usually meant by "AI".

| Replaced | With |
|---|---|
| Artificial Intelligence | large language models |
| AI | LLMs |

Replacements apply to all websites, including dynamically loaded content.

## Installation

1. Clone or download this repo
2. Open `generate-icons.html` in Chrome, click **Download all icons**, and move the three PNGs into an `icons/` folder in the project root
3. Go to `chrome://extensions`, enable **Developer mode**, click **Load unpacked**, and select this folder

## Files

- `manifest.json` — extension metadata and configuration
- `content.js` — content script that performs text replacement
- `generate-icons.html` — throwaway utility to generate the extension icons
