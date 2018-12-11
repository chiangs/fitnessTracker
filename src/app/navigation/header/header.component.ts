import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
  OnDestroy
} from '@angular/core';
import { AuthService } from 'src/app/auth/_services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input()
  isDesktop: boolean;
  @Output()
  toggleSideNav: EventEmitter<void> = new EventEmitter();
  isAuth = false;
  auth$: Subscription;

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

  onToggleSideNav(): void {
    this.toggleSideNav.emit();
  }

  onLogout(): void {
    this.authSvc.logout();
  }
}
