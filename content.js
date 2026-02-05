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

// Wait until body exists
const observer = new MutationObserver(() => {
  if (document.body) {
    chrome.storage.local.get(["newtonTheme"], (res) => {
      applyTheme(res.newtonTheme || "light");
    });
    observer.disconnect();
  }
});

observer.observe(document.documentElement, { childList: true });


// Applies changes to the page
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "local" && changes.newtonTheme) {
    applyTheme(changes.newtonTheme.newValue);
  }
});
