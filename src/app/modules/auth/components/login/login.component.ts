import { Component, HostListener } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { HelperService } from 'src/app/shared/core/services/helper.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string;
  password: string;
  isLoading = false;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly notifier: NotifierService,
    private readonly helperService: HelperService
  ) {}

  @HostListener('window:keyup.enter', ['$event', 'undefined'])
  onLogin(): void {
    if (this.email && this.password) {
      this.isLoading = true;
      this.authService.login(this.email, this.password).then(
        () => {
          this.isLoading = false;
          this.router.navigate(['/projects']);
        },
        (error) => {
          this.isLoading = false;
          this.notifier.notify('error', this.helperService.getErrorMessage(error.code));
        }
      );
    }
  }

}
