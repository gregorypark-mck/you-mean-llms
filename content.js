const REPLACEMENTS = [
  // Longer phrase first to avoid partial replacement
  [/\bArtificial Intelligence\b/gi, "large language models"],
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
