import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { HomeIconComponent } from './icons/home-icon/home-icon.component';
import { NoteIconComponent } from './icons/note-icon/note-icon.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { WeekViewComponent } from './components/week-view/week-view.component';
import { ArrowIconComponent } from './icons/arrow-icon/arrow-icon.component';
import { ProjectIconComponent } from './icons/project-icon/project-icon.component';
import { XIconComponent } from './icons/x-icon/x-icon.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SideMenuComponent,
    HomeIconComponent,
    NoteIconComponent,
    WeekViewComponent,
    ArrowIconComponent,
    ProjectIconComponent,
    XIconComponent,
  ],
  imports: [CommonModule, RouterModule, TranslateModule],
  exports: [
    FormsModule,
    HeaderComponent,
    RouterModule,
    WeekViewComponent,
    ReactiveFormsModule,
    TranslateModule,
    SideMenuComponent,
    HomeIconComponent,
    NoteIconComponent,
    ArrowIconComponent,
    ProjectIconComponent,
    XIconComponent,
  ],
})
export class SharedModule {}
