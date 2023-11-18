import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  User as FirebaseUser,
  UserCredential,
} from '@angular/fire/auth';
import { FirestoreService } from 'src/app/shared/core/services/firestore.service';
import { FirestoreCollections } from 'src/app/shared/core/enums/firestore-colections.enum';
import { UserDetails } from 'src/app/shared/core/models/user-details.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private fireAuth: Auth,
    private router: Router,
    private firestoreService: FirestoreService
  ) {}

  login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.fireAuth, email, password);
  }

  getCurrentUse(): FirebaseUser | null {
    return this.fireAuth.currentUser;
  }

  register(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.fireAuth, email, password);
  }

  setUserDetails(userDetails: UserDetails): Promise<any> {
    return this.firestoreService.addCollentionData(
      FirestoreCollections.UserDetails,
      userDetails
    );
  }

  async logout() {
    await this.fireAuth.signOut();
    this.router.navigate(['/login']);
  }
}
