(() => {
  const archive = document.getElementById("publication-archive");
  const search = document.querySelector(".publication-search");
  if (!archive || !search) return;

  const input = document.getElementById("publication-query");
  const count = document.getElementById("publication-count");
  const empty = document.getElementById("publication-empty");
  const normalize = (text) =>
    text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  const groups = Array.from(archive.querySelectorAll("ol.bibliography"), (list) => {
    const heading = list.previousElementSibling;
    return {
      list,
      heading,
      entries: Array.from(list.children, (element) => ({
        element,
        text: normalize(`${heading.textContent} ${element.textContent}`),
      })),
    };
  });
  const total = groups.reduce((sum, group) => sum + group.entries.length, 0);

  const filter = () => {
    const terms = normalize(input.value).trim().split(/\s+/).filter(Boolean);
    let visible = 0;

    groups.forEach(({ list, heading, entries }) => {
      let groupVisible = 0;
      entries.forEach(({ element, text }) => {
        const matches = terms.every((term) => text.includes(term));
        element.hidden = !matches;
        if (matches) groupVisible++;
      });
      list.hidden = groupVisible === 0;
      heading.hidden = groupVisible === 0;
      visible += groupVisible;
    });

    count.textContent = terms.length ? `${visible} of ${total} publications` : `${total} publications`;
    empty.hidden = visible !== 0;
  };

  search.hidden = false;
  input.addEventListener("input", filter);
  document.getElementById("clear-publication-query").addEventListener("click", () => {
    input.value = "";
    filter();
    input.focus();
  });
  filter();
})();
