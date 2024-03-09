import * as bcrypt from 'bcrypt';

import { HashProvider } from '../HashProvider';

export class HashProviderImpl implements HashProvider {
	async hash(text: string): Promise<string> {
		return bcrypt.hash(text, 14);
	}

	async verify(text: string, hash: string): Promise<boolean> {
		return bcrypt.compare(text, hash);
	}

	async phpVerifyPassword(password: string, hash: string): Promise<boolean> {
		const treatedHash = hash.replace('$2y$', '$2a$');
		return bcrypt.compare(password, treatedHash);
	}
}
