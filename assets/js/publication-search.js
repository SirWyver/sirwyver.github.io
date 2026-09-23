(() => {
  const archive = document.getElementById("publication-archive");
  const search = document.querySelector(".publication-search");
  if (!archive || !search) return;

  const input = document.getElementById("publication-query");
  const count = document.getElementById("publication-count");
  const empty = document.getElementById("publication-empty");
  const topicButtons = Array.from(search.querySelectorAll("[data-topic]"));
  let selectedTopic = "all";
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
      entries: Array.from(list.children, (element) => {
        const entry = element.querySelector(".publication-entry");
        const text = Array.from(
          element.querySelectorAll(".title, .author, .venue-badge, .periodical, .publication-takeaway"),
          (node) => node.textContent
        ).join(" ");
        return {
          element,
          topics: entry.dataset.topics.split(/\s+/),
          text: normalize(`${heading.textContent} ${entry.dataset.venue} ${text}`),
        };
      }),
    };
  });
  const total = groups.reduce((sum, group) => sum + group.entries.length, 0);

  const filter = (updateURL = true) => {
    const terms = normalize(input.value).trim().split(/\s+/).filter(Boolean);
    let visible = 0;

    groups.forEach(({ list, heading, entries }) => {
      let groupVisible = 0;
      entries.forEach(({ element, text, topics }) => {
        const matches = (selectedTopic === "all" || topics.includes(selectedTopic)) && terms.every((term) => text.includes(term));
        element.hidden = !matches;
        if (matches) groupVisible++;
      });
      list.hidden = groupVisible === 0;
      heading.hidden = groupVisible === 0;
      visible += groupVisible;
    });

    topicButtons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.topic === selectedTopic)));
    const topicLabel = topicButtons.find((button) => button.dataset.topic === selectedTopic).textContent;
    count.textContent = terms.length || selectedTopic !== "all" ? `${visible} of ${total} publications` : `${total} publications`;
    if (selectedTopic !== "all") count.textContent += ` - ${topicLabel}`;
    empty.hidden = visible !== 0;
    if (updateURL) {
      const url = new URL(window.location.href);
      if (input.value.trim()) url.searchParams.set("q", input.value.trim());
      else url.searchParams.delete("q");
      if (selectedTopic !== "all") url.searchParams.set("topic", selectedTopic);
      else url.searchParams.delete("topic");
      window.history.replaceState(null, "", url);
    }
  };

  const restoreFilters = () => {
    const params = new URLSearchParams(window.location.search);
    input.value = params.get("q") || "";
    const topic = params.get("topic");
    selectedTopic = topicButtons.some((button) => button.dataset.topic === topic) ? topic : "all";
    filter(false);
  };

  search.hidden = false;
  input.addEventListener("input", () => filter());
  topicButtons.forEach((button) => {
    button.addEventListener("click", () => {
      selectedTopic = button.dataset.topic;
      filter();
    });
  });
  document.getElementById("clear-publication-query").addEventListener("click", () => {
    input.value = "";
    selectedTopic = "all";
    filter();
    input.focus();
  });
  window.addEventListener("popstate", restoreFilters);
  restoreFilters();
})();
