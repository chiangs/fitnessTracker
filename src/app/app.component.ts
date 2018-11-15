import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ScreenService } from './shared/_services/screen.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ng-material';
  screen$: Subscription;
  isDesktop = false;

  constructor(private screenSvc: ScreenService) {}

  ngOnInit(): void {
    this.screen$ = this.screenSvc
      .getDeviceSize()
      .subscribe(
        screen => (this.isDesktop = !screen.isMobileSize && !screen.isPhoneSize)
      );
  }

  ngOnDestroy(): void {
    this.screen$.unsubscribe();
  }
}