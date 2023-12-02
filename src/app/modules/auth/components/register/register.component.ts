import { Component, HostListener, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountType } from 'src/app/shared/core/enums/account-type.enum';
import { AuthService } from '../../core/services/auth.service';
import { UserDetails } from 'src/app/shared/core/models/user-details.model';
import { NotifierService } from 'angular-notifier';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  AccountType = AccountType;
  isUser: boolean = false;
  isReferralId: boolean = false;
  emailRegex: RegExp = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private readonly router: Router,
    private readonly translateService: TranslateService,
    private readonly notifier: NotifierService,
    private readonly authService: AuthService
  ) {
    this.registerForm = this.fb.group(
      {
        email: ['', [Validators.required]],
        password: ['', Validators.required],
        confirmPassword: [null, [Validators.required]],
        accountType: [AccountType.ParentUser, [Validators.required]],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['referralId']) {
        this.isReferralId = true;
        this.registerForm.get('accountType')?.setValue(AccountType.User);
        this.onAccountType(params['referralId']);
      }
    });
  }

  private passwordMatchValidator(
    control: AbstractControl
  ): { [key: string]: any } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (
      password &&
      confirmPassword &&
      password.value !== confirmPassword.value
    ) {
      return { passwordMismatch: true };
    }

    return null;
  }

  onAccountType(referralId: string = ''): void {
    this.isUser =
      +this.registerForm.get('accountType')?.value === AccountType.User;

    if (this.isUser) {
      this.registerForm.addControl(
        'referralId',
        this.fb.control(referralId, [Validators.required])
      );
    } else if (this.registerForm.contains('referralId')) {
      this.registerForm.removeControl('referralId');
    }
  }

  onEmail(): void {
    const email = this.registerForm.get('email');
    const isValid = this.emailRegex.test(email?.value);

    if (isValid && email?.value !== '') {
      email?.setErrors(null);
    } else {
      email?.setErrors({});
    }
  }

  @HostListener('window:keyup.enter', ['$event', 'undefined'])
  onRegister(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.authService
        .register(
          this.registerForm.controls['email'].value,
          this.registerForm.controls['password'].value
        )
        .then(
          (response) => {
            const userDetails = new UserDetails();
            userDetails.email = this.registerForm.controls['email'].value;
            userDetails.userTypeId =
              this.registerForm.controls['accountType'].value;
            userDetails.uid = response.user.uid;
            if (this.registerForm.controls?.['referralId']?.value) {
              userDetails.referralId =
                this.registerForm.controls['referralId'].value;
            }

            this.authService.setUserDetails(userDetails).then(() => {
              this.notifier.notify(
                'success',
                this.translateService.instant('REGISTRATION_SUCCESSFUL')
              );
              setTimeout(() => {
                this.router.navigate(['/projects']);
              }, 200);
            });
          },
          (error) => {
            this.isLoading = false;
            if (error.code === 'auth/email-already-in-use') {
              this.notifier.notify(
                'error',
                this.translateService.instant('EMAIL_USED')
              );
            } else {
              this.notifier.notify(
                'error',
                `${this.translateService.instant('EMAIL_USED')}: ${
                  error.message
                }`
              );
            }
          }
        );
    } else {
      Object.values(this.registerForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
  }
}
