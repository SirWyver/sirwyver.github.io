---
layout: page
permalink: /projects/
title: Projects
description: Research brought into products, and tools built for doing research.
nav: true
nav_order: 4
---

<div class="project-grid">
  {% for project in site.data.portfolio_projects %}
    <article class="portfolio-project" id="{{ project.id }}" aria-labelledby="{{ project.id }}-title">
      {% if project.image %}
        <figure class="project-visual">
          <img src="{{ project.image | relative_url }}" alt="{{ project.image_alt }}" width="640" height="360" loading="lazy" decoding="async">
          <figcaption>{{ project.image_caption }}</figcaption>
        </figure>
      {% endif %}
      <p class="eyebrow">{{ project.category }}</p>
      <h2 id="{{ project.id }}-title">{{ project.title }}</h2>
      <p class="project-organization">{{ project.organization }}</p>
      <p>{{ project.description }}</p>
      <p class="project-contribution"><strong>My contribution.</strong> {{ project.contribution }}</p>
      <div class="project-links">
        <a class="text-link" href="{{ project.url }}">{{ project.link_label }} <span aria-hidden="true">&#8599;</span></a>
        {% if project.pdf %}
          <a class="text-link" href="{{ project.pdf }}">Technical report (PDF) <span aria-hidden="true">&#8599;</span></a>
        {% endif %}
      </div>
    </article>
  {% endfor %}
</div>

<p class="page-crosslink">For research papers, methods, and datasets, explore the <a href="{{ '/publications/' | relative_url }}">publication archive</a>.</p>
