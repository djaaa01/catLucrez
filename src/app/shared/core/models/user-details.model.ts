import { FirestoreCollections } from '../enums/firestore-colections.enum';

export class UserDetails {
  email: string;
  referralId?: string;
  uid: string;
  userTypeId: FirestoreCollections;
}
