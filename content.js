function applyTheme(theme) {
  const body = document.body;
  if (!body) return;

  body.classList.remove("grauity-theme-light", "grauity-theme-dark");

  if (theme === "dark") {
    body.classList.add("grauity-theme-dark");
  } else {
    body.classList.add("grauity-theme-light");
  }
}

function loadTheme() {
  chrome.storage.local.get(["newtonTheme"], (res) => {
    applyTheme(res.newtonTheme || "light");
  });
}

// 1️⃣ Apply once DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadTheme);
} else {
  loadTheme();
}

// 2️⃣ Re-apply if site messes with DOM
const observer = new MutationObserver(() => {
  loadTheme();
});

observer.observe(document.documentElement, {
  childList: true,
  subtree: true,
});

// 3️⃣ React to popup toggle
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "local" && changes.newtonTheme) {
    applyTheme(changes.newtonTheme.newValue);
  }
});
