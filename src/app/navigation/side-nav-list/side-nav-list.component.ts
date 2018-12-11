import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { AuthService } from 'src/app/auth/_services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-side-nav-list',
  templateUrl: './side-nav-list.component.html',
  styleUrls: ['./side-nav-list.component.scss']
})
export class SideNavListComponent implements OnInit, OnDestroy {
  @Output()
  closeSideNav: EventEmitter<void> = new EventEmitter();
  auth$: Subscription;
  isAuth: boolean;

  constructor(private authSvc: AuthService) {}

  ngOnInit() {
    this.auth$ = this.authSvc.authChange.subscribe(
      authChange => (this.isAuth = authChange)
    );
  }

  ngOnDestroy(): void {
    if (this.auth$) {
      this.auth$.unsubscribe();
    }
  }

  onLogout(): void {
    this.onClose();
    this.authSvc.logout();
  }

  onClose(): void {
    this.closeSideNav.emit();
  }
}
