export class Company {
  id?: string;
  companyName: string;
  uid?: string;
  createdDate: Date;
}

export class Project {
  companyId: string;
  uid?: string;
  projectName: string;
  createdDate: Date;
}
