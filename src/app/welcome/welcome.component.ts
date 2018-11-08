import { Component, OnInit, OnDestroy } from '@angular/core';
import { ScreenService } from '../shared/_services/screen.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, OnDestroy {
  screen$: Subscription;
  isDesktop: boolean;

  constructor(private screenSvc: ScreenService) {}

  ngOnInit() {
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
