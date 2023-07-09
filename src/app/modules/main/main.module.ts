import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { NotesComponent } from './components/notes/notes.component';

@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    NotesComponent
  ],
  imports: [CommonModule, MainRoutingModule, SharedModule],
})
export class MainModule {}
