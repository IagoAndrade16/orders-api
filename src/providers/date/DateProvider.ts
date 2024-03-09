import { DateProvided } from './DateProvided';

export type DateProvider = {
	nowPlusMinutes(minutes: number): DateProvided;
	nowPlusHours(hours: number): DateProvided;
}

export const dateProviderAlias = 'DateProvider';
