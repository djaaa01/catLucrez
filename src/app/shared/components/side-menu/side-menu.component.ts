import {Component} from '@angular/core';
import {AuthService} from "../../../modules/auth/core/services/auth.service";

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent {
  constructor(private authService: AuthService) {
  }

  onLogout(): void {
    this.authService.logout();
  }
}
