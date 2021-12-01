/*!
* Hooks into a *reveal.js* slide deck and allows to control SVG animations (SMIL)
* through the normal slide controls (i.e. via *reveal.js* fragments).
*
* ## Automatic fragments
*
* In your SVG, number animations with "data-animation-step" and set begin to "indefinite":
*
* <animate data-animation-step="1" begin="indefinite" ... />
* <animate data-animation-step="2" begin="indefinite" ... />
*
* Fragments for controlling the animation will be inserted automatically.
*
* To properly play animations in reverse, a reverting/inverse animation can be
* added for each "normal" animation, by using negative step values:
*
* <animate data-animation-step="1" begin="indefinite" ... />
* <animate data-animation-step="-1" begin="indefinite" ... />
*
* ## Manual fragments
*
* In your SVG, mark animations with classes, and set begin to "indefinite":
*
* <animate class="first-animation" begin="indefinite" ... />
* <animate class="second-animation" begin="indefinite" ... />
*
* Include the SVG into the HTML directly, or using an <object> tag.
* Then, put empty/fake fragments on the slide with the SVG:
*
* <span class="fragment" data-svg-classes="first-animation"></span>
* <span class="fragment" data-svg-classes="second-animation"></span>
*
* A each fragment can also trigger multiple classes.
* Supports multiple SVGs per slide.
*
* Reverting/inverse animation can be added by using the class suffix "-revert":
*
* <animate class="first-animation" begin="indefinite" ... />
* <animate class="first-animation-revert" begin="indefinite" ... />
*
* ## Limitations
*
* - SVG elements to animate must have unique IDs within the document.
* - Auto-animations don't align with the ordering of other animations on the same slide.
*
* Copyright (C) 2021 Martin Lange
*/
var config = {
    revert_suffix: "-revert"
}
var svg_tags = [];

window.onload = onReady;

function onReady() {
    let objs = toArray(document.getElementsByTagName("object"));
    let svgs = toArray(document.getElementsByTagName("svg"));
    svg_tags = objs
                .map(obj => loadSvgFromObject(obj))
                .filter(el => el != null)
                .concat(svgs.map(obj => loadSvg(obj)));

    for(const entry of svg_tags) {
        initAutoAnimate(entry);
    }
}

function loadSvgFromObject(obj) {
    let doc = obj.contentDocument;
    if (doc != null) {
        let svg = doc.getElementsByTagName("svg");
        if(svg != null || svg.length > 0) {
            let section = obj.closest("section");
            return {svg: svg[0], section: section, container: obj};
        }
    }
    return null;
}

function loadSvg(svg) {
    let section = svg.closest("section");
    return {svg: svg, section: section, container: svg};
}

function initAutoAnimate(svg_entry) {
    let animations = toArray(svg_entry.svg.querySelectorAll('[data-animation-step]'));
    let anim_steps = animations.map(anim => {
        return {node: anim, step: parseInt(anim.getAttribute('data-animation-step'))};
    });
    anim_steps.sort((a, b) => a.step - b.step);

    for(const entry of anim_steps) {
        if(entry.step >= 0) {
            let cls = "auto-animate-" + entry.step;
            entry.node.classList.add(cls);

            let fragment = createFragment(cls, entry.step);
            svg_entry.container.parentElement.insertBefore(fragment, svg_entry.container);
        } else {
            entry.node.classList.add("auto-animate-" + Math.abs(entry.step) + config.revert_suffix);
        }
    }
}

function createFragment(cls, step) {
    let fragment = document.createElement("span");
    fragment.classList.add("fragment");
    fragment.setAttribute("data-svg-classes", cls);

    // TODO: enable after finding a solution for reveal's internal re-numbering
    // fragment.setAttribute("data-fragment-index", step);

    return fragment;
}

function toArray(nodeList) {
    return Array.prototype.slice.call(nodeList);
}

Reveal.on( 'fragmentshown', event => {
    fragmentChanged(event.fragment, true);
} );

Reveal.on( 'fragmenthidden', event => {
    fragmentChanged(event.fragment, false);
} );

function fragmentChanged(fragment, shown=true) {
    let section = fragment.closest("section");
    let index = fragment.getAttribute("data-fragment-index");

    // Unfortunately, fragment events are not fired for every single fragment, but only for one per index!
    // Thus, we need to collect all fragments with the current index.
    let fragments_now = toArray(section.getElementsByClassName("fragment")).filter(frag => {
        return index == frag.getAttribute("data-fragment-index")
    } );

    for(const frag of fragments_now) {
        if(! frag.hasAttribute('data-svg-classes')) {
            continue;
        }
        let classes = frag.getAttribute('data-svg-classes').split(/\s+/);

        for(const entry of svg_tags) {
            if(entry.section == section) {
                toggleAnimations(entry.svg, classes, shown);
            }
        }
    }
}

function toggleAnimations(svg, classes, begin=true) {
    for(const cls of classes) {
        let anims = svg.getElementsByClassName(cls);
        let revert = svg.getElementsByClassName(cls + config.revert_suffix);

        for(const anim of anims) {
            if(begin) {
                if(typeof anim.beginElement === 'function') {
                    anim.beginElement();
                }
            } else {
                if(typeof anim.endElement === 'function') {
                    anim.endElement();
                }
            }
        }
        for(const anim of revert) {
            if(begin) {
                if(typeof anim.beginElement === 'function') {
                    anim.endElement();
                }
            } else {
                if(typeof anim.beginElement === 'function') {
                    anim.beginElement();
                }
            }
        }
    }
}
