const REPLACEMENTS = [
  // 1. Longest phrase first to avoid partial replacement
  [/\bArtificial Intelligence\b/gi, "large language models"],

  // 2. "AI is" → "LLMs are" (verb changes form; preserve capitalisation of verb)
  [/\bAI (is)\b/gi, (_, verb) => `LLMs ${verb[0] === verb[0].toUpperCase() ? "Are" : "are"}`],

  // 3. "AI can/will" → "LLMs can/will" (verb form unchanged)
  [/\bAI (can|will)\b/gi, (_, verb) => `LLMs ${verb}`],

  // 4. Adjectival "AI" before a hyphen: "AI-powered" → "LLM-powered"
  [/\bAI(?=-)/g, "LLM"],

  // 5. Adjectival "AI" before a noun (any case), excluding verb words handled above
  [/\bAI\b(?=\s+(?!is\b|are\b|can\b|will\b|was\b)[a-zA-Z])/gi, "LLM"],

  // 6. All remaining standalone "AI" → "LLMs"
  [/\bAI\b/g, "LLMs"],
];

const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "TEXTAREA", "INPUT", "NOSCRIPT"]);

function replaceText(text) {
  let result = text;
  for (const [pattern, replacement] of REPLACEMENTS) {
    result = result.replace(pattern, replacement);
  }
  return result;
}

function walkTextNodes(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    const replaced = replaceText(node.textContent);
    if (replaced !== node.textContent) {
      node.textContent = replaced;
    }
  } else if (node.nodeType === Node.ELEMENT_NODE && !SKIP_TAGS.has(node.tagName)) {
    for (const child of node.childNodes) {
      walkTextNodes(child);
    }
  }
}

// Initial pass on page load
walkTextNodes(document.body);

// Watch for dynamically added content
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    for (const node of mutation.addedNodes) {
      walkTextNodes(node);
    }
  }
});

observer.observe(document.body, { childList: true, subtree: true });
