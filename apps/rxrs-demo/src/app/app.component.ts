import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { FullScreenWidths, ScreenSizeService, ScreenWidthEnum } from 'rxrs-ng';

import { AppStateService } from './services/app-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'rxrs-demo';
  currentSize$: Observable<ScreenWidthEnum>;
  sideNavOpen$: Observable<boolean>;
  sizes = <FullScreenWidths>{
    xSmall: false,
    small: false,
    medium: false,
    large: false,
    xLarge: false,
  };

  constructor(
    private screenSizeService: ScreenSizeService,
    private state: AppStateService,
    private cdr: ChangeDetectorRef
  ) {
    this.sideNavOpen$ = this.state.sidenavOpen$;
    this.currentSize$ = this.screenSizeService.size$;
  }

  ngOnInit() {
    this.screenSizeService.sizes$.subscribe((size) => {
      if (size.xSmall) {
        this.state.closeSidenav();
      }

      this.sizes = size;
    });
  }
}
