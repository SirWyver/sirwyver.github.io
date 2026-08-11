const loadPublicationPreview = (image) => {
  image
    .closest("picture")
    .querySelectorAll("source[data-animated-srcset]")
    .forEach((source) => {
      source.srcset = source.dataset.animatedSrcset;
      delete source.dataset.animatedSrcset;
    });

  image.src = image.dataset.animatedSrc;
  delete image.dataset.animatedSrc;
};

const previews = document.querySelectorAll("img[data-animated-src]");

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadPublicationPreview(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "100px 0px" },
    );

    previews.forEach((preview) => observer.observe(preview));
  } else {
    previews.forEach(loadPublicationPreview);
  }
}
