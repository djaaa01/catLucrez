import { Injectable } from '@angular/core';
import { collection, Firestore, addDoc, doc } from '@angular/fire/firestore';
import { FirestoreCollections } from '../enums/firestore-colections.enum';

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
}
