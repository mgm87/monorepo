import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RxRs } from './rxrs';

/**
 * Enum to track the key names for the ScreenWidths
 */
export enum ScreenWidthEnum {
  xSmall = 'xSmall',
  small = 'small',
  medium = 'medium',
  large = 'large',
  xLarge = 'xLarge',
}

/**
 * The screen width options
 * xSmall - < 600
 * small - 600 - 960
 * medium - 960 - 1280
 * large - 1280 - 1920
 * xLarge - > 1920
 */
export interface FullScreenWidths {
  [ScreenWidthEnum.xSmall]: boolean;
  [ScreenWidthEnum.small]: boolean;
  [ScreenWidthEnum.medium]: boolean;
  [ScreenWidthEnum.large]: boolean;
  [ScreenWidthEnum.xLarge]: boolean;
}

/**
 * The screen size break points
 */
const screenSizes = {
  xSmall: 600,
  small: 960,
  medium: 1280,
  large: 1920,
};

/**
 * The initial (all false) screen sizes
 */
const initialScreenSizes: FullScreenWidths = {
  [ScreenWidthEnum.xSmall]: false,
  [ScreenWidthEnum.small]: false,
  [ScreenWidthEnum.medium]: false,
  [ScreenWidthEnum.large]: false,
  [ScreenWidthEnum.xLarge]: false,
};

export class ScreenSizeService {
  /**
   * Tracks if the screen is a mobile size
   */
  isMobileState: Observable<boolean>;

  /**
   * Tracks if the screen is a mobile size
   */
  isTabletState: Observable<boolean>;

  /**
   * The observable of screen sizes
   */
  sizes$: Observable<FullScreenWidths>;

  /**
   * The observable of the current size
   */
  size$: Observable<ScreenWidthEnum>;

  private rxrs: RxRs;

  constructor() {
    this.rxrs = new RxRs();

    this.sizes$ = combineLatest([
      this.rxrs.observe(this.buildWidthQuery(0, screenSizes.xSmall - 1)),
      this.rxrs.observe(this.buildWidthQuery(screenSizes.xSmall, screenSizes.small - 1)),
      this.rxrs.observe(this.buildWidthQuery(screenSizes.small, screenSizes.medium - 1)),
      this.rxrs.observe(this.buildWidthQuery(screenSizes.medium, screenSizes.large - 1)),
      this.rxrs.observe(this.buildWidthQuery(screenSizes.large)),
    ]).pipe(
      map(
        ([xSmall, small, medium, large, xLarge]) =>
          ({
            xSmall,
            small,
            medium,
            large,
            xLarge,
          } as FullScreenWidths)
      )
    );

    this.size$ = this.sizes$.pipe(
      map(
        (sizes) =>
          Object.keys(sizes)
            .filter((key) => (<any>sizes)[key])
            .pop() as ScreenWidthEnum
      )
    );

    this.isMobileState = this.sizes$.pipe(map((sizes) => sizes.xSmall));
    this.isTabletState = this.sizes$.pipe(map((sizes) => sizes.small));
  }

  buildWidthQuery(minWidth: number, maxWidth?: number) {
    return maxWidth
      ? `(min-width: ${minWidth}px) and (max-width: ${maxWidth}px)`
      : `(min-width: ${minWidth}px)`;
  }

  observe(query: string): Observable<boolean> {
    return this.rxrs.observe(query);
  }
}
