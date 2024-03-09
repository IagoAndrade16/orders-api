import { EncryptionProviderImpl } from '../implementations/EncryptionProviderImpl';

describe('EncryptionProviderImpl', () => {
	it('should encrypt and decrypt', async () => {
		const provider = new EncryptionProviderImpl();

		const encrypted = await provider.encrypt('test');
		const decrypted = await provider.decrypt(encrypted);

		expect(decrypted).toBe('test');
	});
});
