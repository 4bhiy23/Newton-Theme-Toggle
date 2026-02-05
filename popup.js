document.getElementById("toggle").addEventListener("click", () => {
  chrome.storage.local.get(["newtonTheme"], (res) => {
    const current = res.newtonTheme || "light";
    if(current === "light"){
      chrome.storage.local.set({ newtonTheme: "dark" });
    } else {
      chrome.storage.local.set({ newtonTheme: "light" });
    }
  });
});
