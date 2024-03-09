import crypto from 'crypto';

import { Environment } from '../../../core/Environment';
import { EncryptionProvider } from '../EncryptionProvider';

export class EncryptionProviderImpl implements EncryptionProvider {
	private algorithm = 'aes-256-cbc';

	async encrypt(text: string): Promise<string> {
		const key = Buffer.from(Environment.vars.ENCRYPTION_KEY);
		const iv = Environment.vars.ENCRYPTION_IV;
		const cipher = crypto.createCipheriv(this.algorithm, key, iv);
		let encrypted = cipher.update(text);
		encrypted = Buffer.concat([encrypted, cipher.final()]);
		return encrypted.toString('hex');
	}

	async decrypt(text: string): Promise<string> {
		const encryptedText = Buffer.from(text, 'hex');
		const key = Buffer.from(Environment.vars.ENCRYPTION_KEY);
		const iv = Environment.vars.ENCRYPTION_IV;
		const decipher = crypto.createDecipheriv(this.algorithm, key, iv);
		let decrypted = decipher.update(encryptedText);
		decrypted = Buffer.concat([decrypted, decipher.final()]);
		return decrypted.toString();
	}
}
