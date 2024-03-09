export type HashProvider = {
	hash(text: string): Promise<string>;
	verify(text: string, hash: string): Promise<boolean>;
	phpVerifyPassword(password: string, hash: string): Promise<boolean>;
}

export const hashProviderAlias = 'HashProvider';
