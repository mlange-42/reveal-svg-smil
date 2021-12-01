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

Control SVG/[SMIL](https://www.w3.org/TR/REC-smil/) animations through the [*reveal.js*](https://revealjs.com/) slideshow navigation

---

## Demo

### <big>&darr;</big>

----

### Use the full potential of SMIL animations

Press **&darr;** and **&uarr;** to play animations

<svg width="500" height="250">
  <rect x="5" y="5" width="490" height="240" stroke="var(--r-main-color)" stroke-width="3px" fill="var(--r-background-color)"/>
  <rect x="220" y="95" width="60" height="60" rx="30" fill="var(--r-main-color)">
    <!-- Change color -->
    <animate data-fragment-index="1" begin="indefinite" fill="freeze"
      attributeName="fill" to="var(--r-link-color)" dur="0.5s" />
    <animate data-fragment-index="-1" begin="indefinite" fill="freeze"
      attributeName="fill" to="var(--r-main-color)" dur="0.5s" />
    <!-- Change to circle -->
    <animate data-fragment-index="2" begin="indefinite" fill="freeze"
      attributeName="rx" to="0" dur="1s" />
    <animate data-fragment-index="-2" begin="indefinite" fill="freeze"
      attributeName="rx" to="30" dur="1s" />
    <!-- Rotate -->
    <animateTransform data-fragment-index="3" begin="indefinite" fill="freeze"
      attributeName="transform" type="rotate" from="0 250 125" to="360 250 125" dur="1s" />
    <animateTransform data-fragment-index="-3" begin="indefinite" fill="freeze"
      attributeName="transform" type="rotate" from="360 250 125" to="0 250 125" dur="1s" />
    <!-- Fall -->
    <animate data-fragment-index="4" begin="indefinite" fill="freeze"
      attributeName="y" to="185" dur="0.3s" />
    <animate data-fragment-index="-4" begin="indefinite" fill="freeze"
      attributeName="y" to="95" dur="0.3s" />
    <!-- Move out -->
    <animate id="anim_move_out" data-fragment-index="5" begin="indefinite" fill="freeze"
      attributeName="x" to="500" dur="1s" />
    <animate id="anim_move_out_revert" data-fragment-index="-5" begin="indefinite" fill="freeze"
      attributeName="x" to="220" dur="1s" />
  </rect>
  <text x="-120" y="135" fill="var(--r-link-color)" font-family="var(--r-heading-font)" text-anchor="middle">
    SMIL(E)!
    <animate begin="anim_move_out.end" fill="freeze"
      attributeName="x" to="250" dur="0.6s" />
    <animate begin="anim_move_out_revert.begin" fill="freeze"
      attributeName="x" to="-120" dur="0.6s" />
  </text>
</svg>

---

## Usage

Automatic mode

### <big>&darr;</big>

----

<!-- .slide: data-transition="convex none" data-auto-animate -->

### Add SMIL animation

Animate you SVG as usual

```html [3-4]
<svg width="500" height="250" ...>
  <circle cx="50" cy="50" r="10">
    <animate
      attributeName="r" to="40" dur="2s" fill="freeze" />
  </circle>
</svg>
```
<!-- .element: data-id="code-block" -->

----

<!-- .slide: data-transition="none" data-auto-animate -->

### Add SMIL animation

Animate you SVG as usual

Add a `data-fragment-index`

```html [4]
<svg width="500" height="250" ...>
  <circle cx="50" cy="50" r="10">
    <animate
      data-fragment-index="1"
      attributeName="r" to="40" dur="2s" fill="freeze" />
  </circle>
</svg>
```

<!-- .element: data-id="code-block" -->

----

<!-- .slide: data-transition="none" data-auto-animate -->

### Add SMIL animation

Animate you SVG as usual

Add a `data-fragment-index`

Set `begin="indefinite"`

```html [4-5]
<svg width="500" height="250" ...>
  <circle cx="50" cy="50" r="10">
    <animate
      data-fragment-index="1"
      begin="indefinite"
      attributeName="r" to="40" dur="2s" fill="freeze" />
  </circle>
</svg>
```
<!-- .element: data-id="code-block" -->

----

<!-- .slide: data-transition="none" data-auto-animate -->

###  That's it!

Fragments for control are automatically generated.

```html [4-5]
<svg width="500" height="250" ...>
  <circle cx="50" cy="50" r="10">
    <animate
      data-fragment-index="1"
      begin="indefinite"
      attributeName="r" to="40" dur="2s" fill="freeze" />
  </circle>
</svg>
```
<!-- .element: data-id="code-block" -->

SVG can be included directly, or as an external file using `<object>`

---

## Usage

Manual mode

### <big>&darr;</big>

----

<!-- .slide: data-transition="convex none" data-auto-animate -->

### Add SMIL animation

Again, animate you SVG as usual

```html [3-4]
<svg width="500" height="250" ...>
  <circle cx="50" cy="50" r="10">
    <animate
      attributeName="r" to="40" dur="2s" fill="freeze" />
  </circle>
</svg>
```
<!-- .element: data-id="code-block" -->

----

<!-- .slide: data-transition="none" data-auto-animate -->

### Add SMIL animation

Again, animate you SVG as usual

Add a `class` to the animation

```html [4]
<svg width="500" height="250" ...>
  <circle cx="50" cy="50" r="10">
    <animate
      class="first-animation"
      attributeName="r" to="40" dur="2s" fill="freeze" />
  </circle>
</svg>
```

<!-- .element: data-id="code-block" -->

----

<!-- .slide: data-transition="none convex" data-auto-animate -->

### Add SMIL animation

Again, animate you SVG as usual

Add a `class` to the animation

Set `begin="indefinite"`

```html [4]
<svg width="500" height="250" ...>
  <circle cx="50" cy="50" r="10">
    <animate
      class="first-animation"
      begin="indefinite"
      attributeName="r" to="40" dur="2s" fill="freeze" />
  </circle>
</svg>
```

<!-- .element: data-id="code-block" -->

----

### Add fragments

Use dummy fragments with `data-svg-classes` to control animations

```html
<span class="fragment" 
      data-svg-classes="first-animation"></span>
```

---

## Usage

Reverse animations

### <big>&darr;</big>

---

## Installation

### <big>&darr;</big>

----

installation...
