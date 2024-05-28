import moment from 'moment';

export class DateRange {
	constructor(
		private readonly start: string,
		private readonly end: string,
	) {
		// if (start > end) {
		// 	throw new Error('Start date cannot be greater than end date');
		// }

		if (!start || !end) {
			throw new Error('Start date and end date are required');
		}

		this.start = moment(start).add(3, 'hours').format('YYYY-MM-DD 00:00:00');
		this.end = moment(end).add(3, 'hours').format('YYYY-MM-DD 23:59:59');
	}

	static parse(start: Date, end: Date): DateRange {
		return new DateRange(start.toString(), end.toString());
	}

	get getStart(): string {
		return this.start;
	}

	get getEnd(): string {
		return this.end;
	}
}
