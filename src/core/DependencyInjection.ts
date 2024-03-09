import SftpClient from 'ssh2-sftp-client';
import { container, InjectionToken } from 'tsyringe';

import { ApiProvider, apiProviderAlias } from '../providers/api/ApiProvider';
import { ApiProviderAxios } from '../providers/api/implementations/ApiProviderAxios';
import { EncryptionProvider, encryptionProviderAlias } from '../providers/encryption/EncryptionProvider';
import { EncryptionProviderImpl } from '../providers/encryption/implementations/EncryptionProviderImpl';
import { HashProvider, hashProviderAlias } from '../providers/hash/HashProvider';
import { HashProviderImpl } from '../providers/hash/implementations/HashProviderImpl';
import { JwtProviderImpl } from '../providers/jwt/implementations/JwtProviderImpl';
import { JwtProvider, jwtProviderAlias } from '../providers/jwt/JwtProvider';
import { RandomProviderImpl } from '../providers/random/implementations/RandomProviderImpl';
import { RandomProvider, randomProviderAlias } from '../providers/random/RandomProvider';

export class DependencyInjection {
	static init(): void {
		container.registerSingleton<ApiProvider>(apiProviderAlias, ApiProviderAxios);
		container.registerSingleton<EncryptionProvider>(encryptionProviderAlias, EncryptionProviderImpl);
		container.registerSingleton<HashProvider>(hashProviderAlias, HashProviderImpl);
		container.registerSingleton<RandomProvider>(randomProviderAlias, RandomProviderImpl);
		container.registerSingleton<JwtProvider>(jwtProviderAlias, JwtProviderImpl);
	}
}

export function find<T>(token: InjectionToken<T>): T {
	return container.resolve(token);
}
