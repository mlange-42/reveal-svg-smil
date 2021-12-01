---
title: reveal.js SMIL demo
theme: night
css: https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css
scripts: reveal-svg-smil.js
revealOptions:
  transition: 'convex'
  controls: true
  progress: true
  center: true
---

# *reveal.js* SVG animations

[`reveal-svg-smil`<br /><i class="fa fa-github"></i>](https://github.com/mlange-42/reveal-svg-smil)

---

## What it is

Control SVG/SMIL animations through the [*reveal.js*](https://revealjs.com/) slideshow navigation

---

## Demo

### <big>&#8595;</big>

----

### Use the full potential of SMIL animations

Press **&#8594;** to play animations

<svg height="250" width="500">
  <rect x="5" y="5" width="490" height="240" stroke="var(--r-main-color)" stroke-width="3px" fill="var(--r-background-color)"/>
  <circle cx="60" cy="40" r="20" fill="var(--r-link-color)">
    <animate id="down_1" data-animation-step="1" begin="indefinite" fill="freeze"
		attributeName="cy" to="220" dur="0.3s" />
    <animate id="down_1_revert" data-animation-step="-1" begin="indefinite" fill="freeze"
		attributeName="cy" to="40" dur="0.3s" />
  </circle>
  <circle cx="120" cy="40" r="20" fill="var(--r-link-color)">
    <animate id="down_2" begin="down_1.end" fill="freeze"
		attributeName="cy" to="220" dur="0.3s" />
    <animate id="down_2_revert" begin="down_1_revert.end" fill="freeze"
		attributeName="cy" to="40" dur="0.3s" />
  </circle>
  <circle cx="180" cy="40" r="20" fill="var(--r-link-color)">
    <animate id="down_3" begin="down_2.end" fill="freeze"
		attributeName="cy" to="220" dur="0.3s" />
    <animate id="down_3_revert" begin="down_2_revert.end" fill="freeze"
		attributeName="cy" to="40" dur="0.3s" />
  </circle>
  <circle cx="240" cy="40" r="20" fill="var(--r-link-color)">
    <animate id="down_4" begin="down_3.end" fill="freeze"
		attributeName="cy" to="220" dur="0.3s" />
    <animate id="down_4_revert" begin="down_3_revert.end" fill="freeze"
		attributeName="cy" to="40" dur="0.3s" />
  </circle>
  <circle cx="300" cy="40" r="20" fill="var(--r-link-color)">
    <animate id="down_5" begin="down_4.end" fill="freeze"
		attributeName="cy" to="220" dur="0.3s" />
    <animate id="down_5_revert" begin="down_4_revert.end" fill="freeze"
		attributeName="cy" to="40" dur="0.3s" />
  </circle>
</svg>

---

## Usage

### <big>&#8595;</big>

----

usage...

---

## Installation

### <big>&#8595;</big>

----

installation...
