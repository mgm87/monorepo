import { Component, OnInit } from '@angular/core';
import { AppStateService } from '../services/app-state.service';
import {
  WindowSizeService,
  FullScreenWidthEnum,
} from '../services/window-size.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.scss'],
})
export class TitleBarComponent implements OnInit {
  sideNavOpen = false;
  currentSize$: Observable<FullScreenWidthEnum>;

  constructor(
    private state: AppStateService,
    private windowSizeService: WindowSizeService
  ) {
    this.currentSize$ = this.windowSizeService.currentSize$;
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
