import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { FirestoreService } from 'src/app/shared/core/services/firestore.service';
import { Company, Project } from '../models/company.model';
import { FirestoreCollections } from 'src/app/shared/core/enums/firestore-colections.enum';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(
    private fireAuth: Auth,
    private router: Router,
    private firestoreService: FirestoreService
  ) {}

  addCompany(companyData: Company): Promise<Company> {
    return this.firestoreService.addCollectionData<Company>(
      FirestoreCollections.Companies,
      companyData
    );
  }

  addProject(prjectData: Project): Promise<Project> {
    return this.firestoreService.addCollectionData<Project>(
      FirestoreCollections.Projects,
      prjectData
    );
  }
}
