import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  FullScreenWidths,
  initialScreenSizes,
  ScreenSizeService as RxrsService,
  ScreenWidthEnum,
} from 'rxrs';

export { FullScreenWidths, ScreenWidthEnum } from 'rxrs';

@Injectable({
  providedIn: 'root',
})
export class ScreenSizeService extends RxrsService {
  rxrsService: RxrsService;
  isMobileState: Observable<boolean>;
  isTabletState: Observable<boolean>;
  sizes$: Observable<FullScreenWidths>;
  size$: Observable<ScreenWidthEnum>;

  private sizesSubject: BehaviorSubject<FullScreenWidths>;
  private sizeSubject: BehaviorSubject<ScreenWidthEnum>;
  private isMobileStateSubject: BehaviorSubject<boolean>;
  private isTabletStateSubject: BehaviorSubject<boolean>;

  constructor(private zone: NgZone) {
    super();
    this.rxrsService = new RxrsService();
    this.sizesSubject = new BehaviorSubject(initialScreenSizes);
    this.sizes$ = this.sizesSubject.asObservable();
    this.sizeSubject = new BehaviorSubject(<ScreenWidthEnum>'');
    this.size$ = this.sizeSubject.asObservable();
    this.isMobileStateSubject = new BehaviorSubject(<boolean>false);
    this.isMobileState = this.rxrsService.isMobileState;
    this.isTabletStateSubject = new BehaviorSubject(<boolean>false);
    this.isTabletState = this.rxrsService.isTabletState;

    this.rxrsService.sizes$.subscribe((sizes) => {
      this.zone.run(() => {
        this.sizesSubject.next(sizes);
      });
    });
    this.rxrsService.size$.subscribe((size) => {
      this.zone.run(() => {
        this.sizeSubject.next(size);
      });
    });
    this.rxrsService.isMobileState.subscribe((isMobile) => {
      this.zone.run(() => {
        this.isMobileStateSubject.next(isMobile);
      });
    });
    this.rxrsService.isTabletState.subscribe((isTablet) => {
      this.zone.run(() => {
        this.isTabletStateSubject.next(isTablet);
      });
    });
  }

  observe(query: string): Observable<boolean> {
    return this.rxrsService.observe(query);
  }
}
