import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ScreenSizeService, ScreenWidthEnum } from 'rxrs-ng';

import { AppStateService } from '../services/app-state.service';

@Component({
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.scss'],
})
export class TitleBarComponent implements OnInit {
  sideNavOpen = false;
  currentSize$: Observable<ScreenWidthEnum>;

  constructor(
    private state: AppStateService,
    private screenSizeService: ScreenSizeService
  ) {
    this.currentSize$ = this.screenSizeService.size$;
  }

  ngOnInit() {
    this.state.sidenavOpen$.subscribe((isOpen) => {
      this.sideNavOpen = isOpen;
    });
  }

  toggleMenu() {
    if (this.sideNavOpen) {
      this.state.closeSidenav();
    } else {
      this.state.openSidenav();
    }
  }
}
