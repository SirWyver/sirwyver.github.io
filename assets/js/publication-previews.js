(() => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const previews = new Map();
  const observer =
    "IntersectionObserver" in window
      ? new IntersectionObserver((entries) => {
          entries.forEach(({ target, isIntersecting }) => {
            const preview = previews.get(target);
            preview.visible = isIntersecting;
            preview.update();
          });
        })
      : null;

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
    const preview = {
      visible: !observer,
      preference: null,
      playing: false,
      update() {
        const enabled = this.preference === null ? !reducedMotion.matches : this.preference;
        const playing = this.visible && !document.hidden && enabled;
        if (playing === this.playing) return;

        this.playing = playing;
        sources.forEach(({ element, poster }) => {
          element.srcset = playing ? element.dataset.animatedSrcset : poster;
        });
        image.src = playing ? image.dataset.animatedSrc : poster;
        label.textContent = playing ? "Pause GIF" : "Play GIF";
      },
    };

    previews.set(media, preview);
    button.hidden = false;
    button.addEventListener("click", () => {
      preview.preference = !preview.playing;
      preview.update();
    });
    if (observer) observer.observe(media);
    else preview.update();
  });

  reducedMotion.addEventListener("change", () => {
    previews.forEach((preview) => {
      if (reducedMotion.matches && preview.preference === true) preview.preference = null;
      preview.update();
    });
  });
  document.addEventListener("visibilitychange", () => {
    previews.forEach((preview) => preview.update());
  });
})();
