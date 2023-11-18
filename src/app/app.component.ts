import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private translateService: TranslateService) {
    this.translateService.addLangs(['en', 'ro']);
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');
    this.updatePageTitle();
  }

  private updatePageTitle() {
    this.translateService
      .get('APP_NAME')
      .subscribe((translatedTitle: string) => {
        this.setPageTitle(translatedTitle);
      });
  }

  private setPageTitle(title: string) {
    document.title = title;
  }
}
