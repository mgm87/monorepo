import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ScreenSizeService, ScreenWidthEnum } from 'rxrs-ng';

import { AppStateService } from '../services/app-state.service';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss'],
})
export class MainDashboardComponent implements OnInit {
  /** Based on the screen size, switch from standard to one column per row */
  viewState: Observable<MainDashboardViewState>;
  filterPanelOpen$: Observable<boolean>;

  constructor(
    private screenSizeService: ScreenSizeService,
    private state: AppStateService
  ) {
    this.filterPanelOpen$ = this.state.filterPanelOpen$;
    this.viewState = combineLatest([
      this.screenSizeService.sizes$,
      this.screenSizeService.isMobileState,
      this.state.sidenavOpen$,
      this.state.filterPanelOpen$,
    ]).pipe(
      map(([sizes, isMobile, sidenavOpen, filtersOpen]) => {
        let viewToReturn: MainDashboardViewState;
        if (sizes.xSmall || (sizes.small && sidenavOpen)) {
          viewToReturn = {
            cards: [
              { title: 'Card 1', cols: 2, rows: 1 },
              { title: 'Card 2', cols: 2, rows: 1 },
              { title: 'Card 3', cols: 2, rows: 1 },
              { title: 'Card 4', cols: 2, rows: 1 },
            ],
            filterClass: ScreenWidthEnum.xSmall,
            isMobile,
          };
        } else if (sizes.small && !sidenavOpen && filtersOpen) {
          viewToReturn = {
            cards: [
              { title: 'Card 1', cols: 2, rows: 1 },
              { title: 'Card 2', cols: 2, rows: 1 },
              { title: 'Card 3', cols: 2, rows: 1 },
              { title: 'Card 4', cols: 2, rows: 1 },
            ],
            filterClass: ScreenWidthEnum.medium,
            isMobile,
          };
        } else if (sizes.medium && sidenavOpen && filtersOpen) {
          viewToReturn = {
            cards: [
              { title: 'Card 1', cols: 2, rows: 1 },
              { title: 'Card 2', cols: 2, rows: 1 },
              { title: 'Card 3', cols: 2, rows: 1 },
              { title: 'Card 4', cols: 2, rows: 1 },
            ],
            filterClass: ScreenWidthEnum.medium,
            isMobile,
          };
        } else {
          viewToReturn = {
            cards: [
              { title: 'Card 1', cols: 2, rows: 1 },
              { title: 'Card 2', cols: 1, rows: 1 },
              { title: 'Card 3', cols: 1, rows: 2 },
              { title: 'Card 4', cols: 1, rows: 1 },
            ],
            filterClass: ScreenWidthEnum.medium,
            isMobile,
          };
        }

        return viewToReturn;
      })
    );
  }

  ngOnInit() {}

  openFilters() {
    this.state.openFilterPanel();
  }

  closeFilters() {
    this.state.closeFilterPanel();
  }
}

interface MainDashboardViewState {
  cards: Card[];
  filterClass: ScreenWidthEnum;
  isMobile: boolean;
}

interface Card {
  title: string;
  cols: number;
  rows: number;
}
