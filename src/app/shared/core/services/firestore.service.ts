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
  WhereFilterOp,
} from '@angular/fire/firestore';
import { FirestoreCollections } from '../enums/firestore-colections.enum';
import { Observable } from 'rxjs';
import { CustomCondition } from '../models/customCondition.model';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: Firestore) {}

  async addCollectionData<T>(
    collectionName: FirestoreCollections,
    data: any
  ): Promise<T> {
    const collectionRef = collection(this.firestore, collectionName);
    const dataRef = await addDoc(collectionRef, { ...data });
    return dataRef as T;
  }

  getCollention<T>(collectionName: string, uid: string): Observable<T[]> {
    const q = query(
      collection(this.firestore, collectionName),
      where('uid', '==', uid)
    );
    const getColectionData = collectionData(q, { idField: 'id' });

    return getColectionData as Observable<T[]>;
  }

  getCustomCollention<T>(
    collectionName: string,
    customCondition: CustomCondition
  ): Observable<T[]> {
    const q = query(
      collection(this.firestore, collectionName),
      where(
        customCondition.firstField as string,
        customCondition.condition as WhereFilterOp,
        customCondition.secondField as string | string[]
      )
    );
    const getColectionData = collectionData(q, { idField: 'id' });

    return getColectionData as Observable<T[]>;
  }
}
