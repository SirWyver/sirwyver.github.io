---
layout: page
permalink: /experience/
title: Experience
description: Research and engineering across agentic AI, controllable video generation, 3D generative models, and robotics.
nav: true
nav_order: 5
printable_cv: true
---

<div class="cv-actions">
  <a class="text-link" href="{{ '/assets/pdf/Norman_Mueller_Public_CV.pdf' | relative_url }}" download>Download public CV <span aria-hidden="true">&#8595;</span></a>
  <button type="button" id="print-cv" hidden>Print / save PDF</button>
</div>

<nav class="section-index" aria-label="Experience sections">
  <a href="#experience">Experience</a>
  <a href="#education">Education</a>
  <a href="#awards">Awards</a>
  <a href="#projects">Projects</a>
  <a href="#service">Service</a>
  <a href="#skills">Skills</a>
</nav>

<div class="public-cv">
  <header class="cv-print-header">
    <h1>{{ site.first_name }} {{ site.last_name }}</h1>
    <p>Research scientist &amp; engineer</p>
    <p>{{ site.email }} &middot; {{ site.url }}</p>
  </header>
  <section class="career-section" id="experience" aria-labelledby="experience-heading">
    <h2 id="experience-heading">Experience</h2>
    {% include career-timeline.liquid items=site.data.career.experience %}
  </section>
  <section class="career-section" id="education" aria-labelledby="education-heading">
    <h2 id="education-heading">Education</h2>
    {% include career-timeline.liquid items=site.data.career.education %}
  </section>
  <section class="career-section" id="awards" aria-labelledby="awards-heading">
    <h2 id="awards-heading">Awards &amp; honors</h2>
    {% include awards.liquid %}
  </section>
  <section class="career-section" id="projects" aria-labelledby="projects-heading">
    <h2 id="projects-heading">Projects</h2>
    <ul class="cv-projects">
      {% for project in site.data.portfolio_projects %}
        <li><a href="{{ project.url }}">{{ project.title }}</a> &mdash; {{ project.contribution }}</li>
      {% endfor %}
    </ul>
  </section>
  <section class="career-section" id="service" aria-labelledby="service-heading">
    <h2 id="service-heading">Academic service</h2>
    <dl class="career-facts">
      {% for item in site.data.career.service %}
        <dt>{{ item.role }}</dt>
        <dd>{{ item.venues }}</dd>
      {% endfor %}
    </dl>
  </section>
  <section class="career-section" id="skills" aria-labelledby="skills-heading">
    <h2 id="skills-heading">Technical skills</h2>
    <dl class="career-facts">
      {% for item in site.data.career.skills %}
        <dt>{{ item.label }}</dt>
        <dd>{{ item.value }}</dd>
      {% endfor %}
    </dl>
  </section>
  <p class="page-crosslink">Publications and research resources: <a href="{{ '/publications/' | absolute_url }}">{{ '/publications/' | absolute_url }}</a></p>
</div>
