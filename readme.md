# Hover effect

Javascript library to draw and animate images on hover.

<!-- [**DEMO**](https://tympanus.net/Tutorials/PiecesSlider/) -->

<!-- [**TUTORIAL**](https://tympanus.net/codrops/2018/02/21/animated-fragment-slideshow/) -->


## Basic usage

This helper needs [Three.js](https://threejs.org) and [TweenMax](https://greensock.com/) to do the transition, so you need to include it before this little helper.

Then you only need a `div` element in HTML to start animating things with a piece of code like this:

```html
<!-- Div to draw the effect -->
<div class="my-div"></div>

<!-- library needed -->
<script src="three.min.js"></script>
<script src="TweenMax.min.js"></script>

<script src="hover.js"></script>
<script>
    var myAnimation = new hoverEffect({
        parent: document.querySelector('.my-div'),
        intensity: 0.3,
        image1: 'images/myImage1.jpg',
        image2: 'images/myImage1.jpg',
        displacementImage: 'images/myDistorsionImage.png'
    });
</script>
```


## Options

mandatory parameters :

| Name                    | Type                    | Default         | Description |
|-------------------------|-------------------------|-----------------|-------------|
|`parent`                 | `Dom element`   | `null`          | A dom element where the animation will be injected. The images of the animation will take the parent's size. |
|`image1`                  | `Image`      | `null`            | first `Image` of the animation. |
|`image2`                  | `Image`      | `null`            | second `Image` of the animation. |
|`displacementImage`                  | `Image`      | `null`            | `Image` used to do the transition between the 2 main images. |

optional parameters:

| Name                    | Type                    | Default         | Description |
|-------------------------|-------------------------|-----------------|-------------|
|`intensity`                      | `Integer`   | `1`             | Used to determinate the `intensity` of the effect, 0 is no effect and 1 is full distorsion. |
|`speedIn`                      | `Integer`   | `1.6`             | Speed of the first step of the animation (in second). |
|`speedOut`                      | `Integer`   | `1.2`             | Speed of the second step of the animation (in second). |
