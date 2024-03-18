import * as moment from 'moment';

export class Day {
  day: string;
  month: string;
  date: string;
  year: string;
  unformatDate: moment.Moment;
  selected?: boolean;
  counter?: Counter;
}

export class Counter {
  hours: number;
  minutes: number;
}
