import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { provideAuth } from '@angular/fire/auth';
import { getAuth } from '@firebase/auth';
import { MainModule } from './modules/main/main.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './modules/auth/auth.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NotifierModule } from 'angular-notifier';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatDialogModule,
} from '@angular/material/dialog';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const firebaseConfig = {
  apiKey: 'AIzaSyC7CFQWATLWn_uo3gYG7P6p4gy9sH_30kA',
  authDomain: 'catlucrez.firebaseapp.com',
  projectId: 'catlucrez',
  storageBucket: 'catlucrez.appspot.com',
  messagingSenderId: '93539560135',
  appId: '1:93539560135:web:cfb3e159472d5fa1666ce2',
  measurementId: 'G-H3RRE4QCM9',
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    AppRoutingModule,
    MatDialogModule,
    NotifierModule,
    MatAutocompleteModule,
    NotifierModule.withConfig({
      position: {
        horizontal: {
          position: 'right',
        },
        vertical: {
          position: 'top',
        },
      },
    }),
    AuthModule,
    MainModule,
    SharedModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    NoopAnimationsModule,
  ],
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: firebaseConfig },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: { autoFocus: false },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
