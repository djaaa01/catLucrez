import { WhereFilterOp } from "@angular/fire/firestore";

export class CustomCondition {
    firstField?: string;
    condition?: WhereFilterOp;
    secondField?: string | string[];
}
