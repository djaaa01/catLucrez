import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor(private readonly translateService: TranslateService) {}

  getErrorMessage(authCode: string): string {
    switch (authCode) {
      case 'auth/email-already-in-use':
        return this.translateService.instant('EMAIL_USED');
      case 'auth/invalid-password':
      case 'auth/wrong-password':
        return this.translateService.instant('INVALID_PASSWORD');
      case 'auth/user-not-found':
        return this.translateService.instant('EMAIL_NOT_FOUND');
      default:
        return this.translateService.instant('GENERAL_ERROR');
    }
  }
}
