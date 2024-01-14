import { AccountType } from '../enums/account-type.enum';

export class UserDetails {
  email: string;
  referralId?: string;
  uid: string;
  userTypeId: AccountType;
}
