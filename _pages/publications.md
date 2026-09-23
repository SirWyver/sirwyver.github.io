---
layout: page
permalink: /publications/
title: Publications
description: Research in agentic models, 3D generation, reconstruction, and visual understanding.
nav: true
nav_order: 2
publication_previews: true
---

<div class="publication-search" hidden>
  <label for="publication-query">Find a publication</label>
  <div class="search-field">
    <input id="publication-query" type="search" placeholder="Search by title, author, venue, or year" aria-controls="publication-archive" autocomplete="off">
    <button type="button" id="clear-publication-query">Clear</button>
  </div>
  <p id="publication-count" role="status" aria-live="polite" aria-atomic="true"></p>
</div>

<div class="publications publication-archive" id="publication-archive">
  {% bibliography -f papers %}
</div>

<p id="publication-empty" hidden>No matching publications. Try another title, author, venue, or year.</p>
