---
layout: page
permalink: /highlights/
title: Highlights
description: Research recognized with oral and spotlight presentations.
nav: true
nav_order: 3
publication_previews: true
---

<div class="publications">
  {% bibliography -f papers --query @*[oral=true || spotlight=true || highlight=true] %}
</div>

<a class="archive-link" href="{{ '/publications/' | relative_url }}">Browse all publications <span aria-hidden="true">&#8594;</span></a>
