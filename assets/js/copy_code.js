(() => {
  document.querySelectorAll("pre").forEach((codeBlock) => {
    const code = codeBlock.querySelector("pre:not(.lineno)") || codeBlock.querySelector("code");
    if (
      !code ||
      code.matches(".language-chartjs, .language-diff2html, .language-echarts, .language-geojson, .language-mermaid, .language-vega_lite")
    ) {
      return;
    }

    const citation = codeBlock.closest(".citation-details");
    const label = citation ? "Copy citation" : "Copy code";
    const title = citation ? citation.closest(".publication-content").querySelector(".title").textContent.trim() : "";
    const button = document.createElement("button");
    button.className = "copy";
    button.type = "button";
    button.textContent = label;
    button.setAttribute("aria-label", title ? `${label} for ${title}` : label);

    const status = document.createElement("p");
    status.className = "copy-status";
    status.setAttribute("role", "status");
    let resetTimer;

    button.addEventListener("click", async () => {
      window.clearTimeout(resetTimer);
      button.disabled = true;
      status.textContent = "";
      try {
        if (!navigator.clipboard || !navigator.clipboard.writeText) throw new Error("Clipboard access is unavailable.");
        await navigator.clipboard.writeText(code.innerText.trim());
        button.textContent = "Copied";
        status.textContent = citation ? "Citation copied to clipboard." : "Code copied to clipboard.";
        resetTimer = window.setTimeout(() => {
          button.textContent = label;
          status.textContent = "";
        }, 3000);
      } catch (error) {
        console.warn("Unable to copy to clipboard:", error);
        button.textContent = label;
        status.textContent = "Could not copy automatically. Select the text and copy it manually.";
      } finally {
        button.disabled = false;
      }
    });

    const wrapper = document.createElement("div");
    wrapper.className = "code-display-wrapper";
    codeBlock.parentElement.insertBefore(wrapper, codeBlock);
    wrapper.append(codeBlock, button, status);
  });
})();
