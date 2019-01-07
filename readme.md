# Hover effect

Javascript library to draw and animate images on hover.

[**DEMO**](https://tympanus.net/Development/DistortionHoverEffect/)

[**ARTICLE**](https://tympanus.net/codrops/2018/04/10/webgl-distortion-hover-effects/)

## Example
<p align="center">
    <img alt="example 1" src="gifs/1.gif" width="256">
    <img alt="example 2" src="gifs/2.gif" width="256">
</p>

## Basic usage

This helper needs [Three.js](https://threejs.org) and [TweenMax](https://greensock.com/) to do the transition, so you need to include it before this little helper.

Then you only need a `div` element in HTML to start animating things with a piece of code like this:

```html
<!-- Div to draw the effect -->
<div class="my-div"></div>

<!-- library needed -->
<script src="three.min.js"></script>
<script src="TweenMax.min.js"></script>

<script src="dist/hover.umd.js"></script>
<script>
    var myAnimation = new hoverEffect({
        parent: document.querySelector('.my-div'),
        intensity: 0.3,
        image1: 'images/myImage1.jpg',
        image2: 'images/myImage2.jpg',
        displacementImage: 'images/myDistorsionImage.png'
    });
</script>
```

## Node JS usage

This helper can also be used in node js environments. Three.js and TweenMax scripts are included as dependencies in the package so you don't need to manually include them.

### Install

```
npm install hover-effect
```

### Import

```js
import hoverEffect from 'hover-effect'
```

### Init

Initialize just as you would in the basic usage example above.

## Options

### Mandatory parameters

| Name                    | Type            | Default         | Description |
|-------------------------|-----------------|-----------------|-------------|
|`parent`                 | `Dom element`   | `null`          | The DOM element where the animation will be injected. The images of the animation will take the parent's size. |
|`image1`                 | `Image`         | `null`          | The first `Image` of the animation. |
|`image2`                 | `Image`         | `null`          | The second `Image` of the animation. |
|`displacementImage`      | `Image`         | `null`          | The `Image` used to do the transition between the 2 main images. |

### Optional parameters

| Name                    | Type      | Default         | Description |
|-------------------------|-----------|-----------------|-------------|
|`intensity`              | `Float`   | `1`             | Used to determine the intensity of the distortion effect. 0 is no effect and 1 is full distortion. |
|`intensity1`             | `Float`   | `intensity`     | Overrides the distortion intensity of the first image. |
|`intensity2`             | `Float`   | `intensity`     | Overrides the distortion intensity of the second image. |
|`angle`                  | `Float`   | `Math.PI / 4`   | Angle of the distortion effect in Radians. Defaults to Pi / 4 (45 degrees). |
|`angle1`                 | `Float`   | `angle`         | Overrides the distortion angle for the first image. |
|`angle2`                 | `Float`   | `-angle * 3`    | Overrides the distortion angle for the second image. |
|`speedIn`                | `Float`   | `1.6`           | Speed of the inbound animation (in seconds). |
|`speedOut`               | `Float`   | `1.2`           | Speed of the outbound animation (in seconds). |
|`hover`                  | `Boolean` | `true`          | if set to false the animation will not be triggered on hover (see `next` and `previous` function to interact) |
|`easing`                 | `String`  | `Expo.easeOut`  | Easing of the transition, see [greensock easing](https://greensock.com/ease-visualizer)|

### Methods

| Name                    | Description             |
|-------------------------|-------------------------|
|`next`                   | Transition to the second image. |
|`previous`               | Transition to the first image. |

## Credits
Thanks to :
- [Codrops](https://twitter.com/crnacura) for the creation of the example
- [Aarni Koskela](https://github.com/akx/) for the improvements
- [Celso White](https://github.com/celsowhite) for the multiple module formats

## Made with it
<p align="center">
    <img alt="Alex Brown demo" src="gifs/alex_brown.gif" width="512">
</p>

- [Codepen demo](https://codepen.io/alxrbrown/pen/GxVQLr) and [Medium article](https://medium.com/@alxrbrown/create-a-distortion-hover-effect-using-webgl-32fc1ab50d24) by Alex Brown
