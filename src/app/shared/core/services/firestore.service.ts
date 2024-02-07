import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  setDoc,
  query,
  where,
  docData,
  deleteDoc,
} from '@angular/fire/firestore';
import { FirestoreCollections } from '../enums/firestore-colections.enum';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/core/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(
    private firestore: Firestore,
    private readonly authService: AuthService
  ) {}
  currentUser = this.authService.getCurrentUse()?.uid;

  async addCollectionData<T>(
    collectionName: FirestoreCollections,
    data: any
  ): Promise<T> {
    const collectionRef = collection(this.firestore, collectionName);
    const dataRef = await addDoc(collectionRef, { ...data });
    return dataRef as T;
  }

  getCollention<T>(collectionName: string): Observable<T[]> {
    const q = query(
      collection(this.firestore, collectionName),
      where('userUID', '==', this.currentUser)
    );
    const getColectionData = collectionData(q, { idField: 'id' });

    return getColectionData as Observable<T[]>;
  }
}
