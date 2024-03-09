export class TextBuilder {
	private lines: string[] = [];

	private constructor(data: {
		lines: string[];
	}) {
		this.lines = data.lines;
	}

	static lines(lines: string[]): TextBuilder {
		return new TextBuilder({ lines });
	}

	get text(): string {
		return this.build();
	}

	build(): string {
		return this.lines.join('\n');
	}

	toString(): string {
		return this.build();
	}
}
