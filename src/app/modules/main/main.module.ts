import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProjectsComponent } from './components/projects/projects.component';
import { NotesComponent } from './components/notes/notes.component';
import { AddProjectComponent } from './components/add-project/add-project.component';

@NgModule({
  declarations: [
    MainComponent,
    ProjectsComponent,
    NotesComponent,
    AddProjectComponent
  ],
  imports: [CommonModule, MainRoutingModule, SharedModule],
})
export class MainModule {}
