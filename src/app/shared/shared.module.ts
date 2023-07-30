import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { HomeIconComponent } from './icons/home-icon/home-icon.component';
import { NoteIconComponent } from './icons/note-icon/note-icon.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    HeaderComponent,
    SideMenuComponent,
    HomeIconComponent,
    NoteIconComponent,
  ],
  imports: [CommonModule, RouterModule, TranslateModule],
  exports: [
    FormsModule,
    HeaderComponent,
    RouterModule,
    TranslateModule,
    SideMenuComponent,
    HomeIconComponent,
    NoteIconComponent,
  ],
})
export class SharedModule {}
