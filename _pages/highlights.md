---
layout: page
permalink: /highlights/
title: Highlights
description: Awards, academic honors, and research recognized with oral, highlight, and spotlight presentations.
nav: true
nav_order: 3
publication_previews: true
---

<section id="awards" aria-labelledby="awards-heading">
  <h2 id="awards-heading">Awards &amp; honors</h2>
  {% include awards.liquid %}
</section>

<section class="career-section" aria-labelledby="recognized-research-heading">
  <h2 id="recognized-research-heading">Recognized research</h2>
  <div class="publications">
    {% bibliography -f papers --query @*[oral=true || spotlight=true || highlight=true] %}
  </div>
</section>

<a class="archive-link" href="{{ '/publications/' | relative_url }}">Browse all publications <span aria-hidden="true">&#8594;</span></a>
