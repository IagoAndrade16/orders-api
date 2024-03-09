export type EncryptionProvider = {
	encrypt(text: string): Promise<string>;
	decrypt(text: string): Promise<string>;
}

export const encryptionProviderAlias = 'EncryptionProvider';
