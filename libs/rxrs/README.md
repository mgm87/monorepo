# RxRs - Reactive Responsive

A library enabling the easy use of reactive responsive design in any project!

The idea behind responsive reactive design is that we should stop writing media queries in our css and move that management to our JS. The benifits for doing this include gains in readability, maintainability, testability, and performance.

[Here's a video showing the how and why](https://www.youtube.com/watch?v=GKPX0ZAaSCI)


### installation

```bash
npm install rxrs

# or

yarn add rxrs
```

### Usage

There are two ways to use RxRs.

1. Use the `ScreenSizeService` class. It comes with some presets so you can just add it to your project and see the benifits!
2. Use the core RxRs class. This will give you ultimate flexability, but also the most setup.

#### ScreenSizeService
To use the `ScreenSizeService` you will want to create a single instance for your app (singlton).
```js
// Your service class
import { ScreenSizeService } from 'rxrs';

export ServiceClass {
  screenSizeService: ScreenSizeService;

  constructor() {
    // Create an instance of ScreenSizeService.
    // If your JS framework provides DI you can tie ScreenSizeService directly into it.
    this.screenSizeService = new ScreenSizeService();
  }

}
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

The service also fronts the base library's `observe` function so you can watch any custom media queries. This is an example usage of the observe function. This looks the same from both RxRs and the ScreenSizeService.

```js
const small = screenSizeService.observe('(max-width: 480px)'); // returns an Observable<boolean>

small.subscribe((mediaQueryMatched) => {
  // This will return true anytime the query is matched and
  // false anytime it is not mached
  console.log(mediaQueryMatched);
})
```

#### RxRs
To use the core RxRs class you will want to establish what breakpoints you want in your app (media queries). Then I would reccomend tying RxRs into your frameworks DI engine. Otherwise you can create a service class to manage access to RxRs. You just will want to treat RxRs as a singleton.

This is how you would initialize RxRs:

```js
// Your service class
import { RxRs } from 'rxrs';

export ServiceClass {
  rxrs: RxRs;

  constructor() {
    // Create an instance of RxRs.
    // If your JS framework provides DI you can tie RxRs directly into it.
    this.rxrs = new RxRs();
  }

}
```
