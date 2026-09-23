---
layout: page
permalink: /publications/
title: Publications
description: Research in agentic models, controllable video generation, 3D generation, reconstruction, and visual understanding.
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
  <fieldset class="publication-topics">
    <legend>Filter by topic</legend>
    <button type="button" data-topic="all" aria-pressed="true" aria-controls="publication-archive">All topics</button>
    {% for topic in site.data.publication_topics %}
      <button type="button" data-topic="{{ topic.id }}" aria-pressed="false" aria-controls="publication-archive">{{ topic.label }}</button>
    {% endfor %}
  </fieldset>
  <p id="publication-count" role="status" aria-live="polite" aria-atomic="true"></p>
</div>

<div class="publications publication-archive" id="publication-archive">
  {% bibliography -f papers %}
</div>

<p id="publication-empty" hidden>No matching publications. Try another topic, title, author, venue, or year, or clear the filters.</p>
