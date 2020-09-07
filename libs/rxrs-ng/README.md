# RxRs - ng - Reactive Responsive for Angular

A library enabling the easy use of reactive responsive design in any Angular project!

The idea behind responsive reactive design is that we should stop writing media queries in our css and move that management to our JS. The benifits for doing this include gains in readability, maintainability, testability, and performance.

[Here's a video showing the how and why](https://www.youtube.com/watch?v=GKPX0ZAaSCI)


### installation

```bash
npm install rxrs rxrs-ng

# or

yarn add rxrs rxrs-ng
```

### Usage

#### ScreenSizeService
To use the `ScreenSizeService` all you need to do is import it and referance it in your Constructor.
```js
// Your service class
import { ScreenSizeService } from 'rxrs-ng';

export class SomeComponent {
  constructor(private screenSizeService: ScreenSizeService) {}
```
After that you can subscribe to the `sizes$` observable for an object that holds booleans for all the size options.

* xSmall: 0px-599px
* small: 600px-959px
* medium: 960px-1279px
* large: 1280px-1919px
* xLarge: > 1920px

The object looks like this:
```json
{
  "xSmall": false,
  "small": true,
  "medium": false,
  "large": false,
  "xLarge": false
}
```
There is also a `size$` observable that holds the name of the current size ('xSmall', 'small', 'medium', 'large', or 'xLarge').

The service also fronts the base `rxrs` library's `observe` function so you can watch any custom media queries. This is an example usage of the observe function. This looks the same from both RxRs and the ScreenSizeService.

```js
const small = screenSizeService.observe('(max-width: 480px)'); // returns an Observable<boolean>

small.subscribe((mediaQueryMatched) => {
  // This will return true anytime the query is matched and
  // false anytime it is not mached
  console.log(mediaQueryMatched);
})
```
