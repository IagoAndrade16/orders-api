export type RandomProvider = {
	string(length: number, type: StringType): string;
	integer(min?: number, max?: number): number;
	sample<T>(array: T[], amount: number): T[];
}

export type StringType = 'alpha' | 'numeric' | 'alphanumeric';

export const randomProviderAlias = 'RandomProvider';
