import { Component, HostListener, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { HelperService } from '../../../../shared/core/services/helper.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string;
  password: string;
  isLoading = false;

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  private readonly notifier = inject(NotifierService);
  private readonly helperService = inject(HelperService);

  @HostListener('window:keyup.enter', ['$event', 'undefined'])
  onLogin(): void {
    if (!this.email || !this.password) {
      return;
    }

    this.isLoading = true;

    this.authService.login(this.email, this.password).then(
      () => {
        this.isLoading = false;

        void this.router.navigate(['/projects']);
      },
      (error) => {
        this.isLoading = false;
        this.notifier.notify(
          'error',
          this.helperService.getErrorMessage(error?.code)
        );
      }
    );
  }
}
