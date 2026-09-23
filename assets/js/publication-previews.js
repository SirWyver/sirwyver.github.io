(() => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  document.querySelectorAll(".publication-media").forEach((media) => {
    const image = media.querySelector("img[data-animated-src]");
    const button = media.querySelector(".preview-toggle");
    if (!image || !button) return;

    const label = button.querySelector(".preview-toggle-label");
    const poster = image.getAttribute("src");
    const sources = Array.from(media.querySelectorAll("source[data-animated-srcset]"), (source) => ({
      element: source,
      poster: source.srcset,
    }));
    let playing = false;

    const setPlaying = (value) => {
      playing = value;
      sources.forEach(({ element, poster }) => {
        element.srcset = playing ? element.dataset.animatedSrcset : poster;
      });
      image.src = playing ? image.dataset.animatedSrc : poster;
      label.textContent = playing ? "Pause preview" : "Play preview";
    };

    button.hidden = false;
    button.addEventListener("click", () => setPlaying(!playing));
    reducedMotion.addEventListener("change", () => {
      if (reducedMotion.matches && playing) setPlaying(false);
    });
  });
})();
