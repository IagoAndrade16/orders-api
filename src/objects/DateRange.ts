export class DateRange {
	constructor(
		private readonly start: Date,
		private readonly end: Date,
	) {
		if (start > end) {
			throw new Error('Start date cannot be greater than end date');
		}

		if (!start || !end) {
			throw new Error('Start date and end date are required');
		}

		this.start = start;
		this.end = end;
	}

	static parse(start: Date, end: Date): DateRange {
		return new DateRange(start, end);
	}

	get getStart(): Date {
		return this.start;
	}

	get getEnd(): Date {
		return this.end;
	}
}
