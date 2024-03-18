import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { FirestoreService } from 'src/app/shared/core/services/firestore.service';
import { Company, Project } from '../models/company.model';
import { FirestoreCollections } from 'src/app/shared/core/enums/firestore-colections.enum';
import { Observable } from 'rxjs';
import { CustomCondition } from 'src/app/shared/core/models/customCondition.model';

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

  getCompanies(uid: string): Observable<Company[]> {
    return this.firestoreService.getCollention<Company>(
      FirestoreCollections.Companies, uid
    );
  }

  getProjects(companyIdsList: string[]): Observable<Project[]> {
    const customCondition = new CustomCondition();
    customCondition.firstField = 'companyId';
    customCondition.secondField = companyIdsList;
    customCondition.condition = 'in';

    return this.firestoreService.getCustomCollention<Project>(
      FirestoreCollections.Projects,
      customCondition
    );
  }
}
