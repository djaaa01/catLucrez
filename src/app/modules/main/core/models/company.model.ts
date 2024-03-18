import { Day } from "src/app/shared/core/models/day.model";

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
  week?: Day[];
}

export class Companies {
  company: Company;
  filterProjects: Project[];
}
