import { Injectable } from '@angular/core';
import { collection, Firestore, addDoc } from '@angular/fire/firestore';
import { FirestoreCollections } from '../enums/firestore-colections.enum';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: Firestore) {}

  async addCollentionData(
    collectionName: FirestoreCollections,
    data: any
  ): Promise<any> {
    const collectionRef = collection(this.firestore, collectionName);
    const dataRef = await addDoc(collectionRef, { ...data });
    return dataRef;
  }
}
