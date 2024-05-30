import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  User as FirebaseUser,
  UserCredential,
} from '@angular/fire/auth';
import {FirestoreService} from "../../../../shared/core/services/firestore.service";
import {UserDetails} from "../../../../shared/core/models/user-details.model";
import {FirestoreCollections} from "../../../../shared/core/enums/firestore-colections.enum";


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private fireAuth: Auth,
    private router: Router,
    private firestoreService: FirestoreService
  ) {
  }

  login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.fireAuth, email, password);
  }

  getCurrentUse(): FirebaseUser {
    return this.fireAuth.currentUser as FirebaseUser;
  }

  register(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.fireAuth, email, password);
  }

  setUserDetails(userDetails: UserDetails): Promise<UserDetails> {
    return this.firestoreService.addCollectionData<UserDetails>(
      FirestoreCollections.UserDetails,
      userDetails
    );
  }

  async logout() {
    await this.fireAuth.signOut();
   
    this.router.navigate(['/login']);
  }
}
