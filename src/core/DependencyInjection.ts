import SftpClient from 'ssh2-sftp-client';
import { container, InjectionToken } from 'tsyringe';

import { OrdersRepositoryTypeOrm } from '../modules/orders/repositories/implementations/OrdersRepositoryTypeOrm';
import { OrdersRepository, ordersRepositoryAlias } from '../modules/orders/repositories/OrdersRepository';
import { ProductsReportRepositoryTypeOrm } from '../modules/products/repositories/implementations/ProductsReportRepositoryTypeOrm';
import { ProductsRepositoryTypeOrm } from '../modules/products/repositories/implementations/ProductsRepositoryTypeOrm';
import { ProductsReportRepository, productsReportRepositoryAlias } from '../modules/products/repositories/ProductsReportRepository';
import { ProductsRepository, productsRepositoryAlias } from '../modules/products/repositories/ProductsRepository';
import { UsersRepositoryTypeOrm } from '../modules/users/repositories/implementations/UsersRepositoryTypeOrm';
import { UsersRepository, usersRepositoryAlias } from '../modules/users/repositories/UsersRepository';
import { ApiProvider, apiProviderAlias } from '../providers/api/ApiProvider';
import { ApiProviderAxios } from '../providers/api/implementations/ApiProviderAxios';
import { DateProvider, dateProviderAlias } from '../providers/date/DateProvider';
import { DateProviderImpl } from '../providers/date/implementations/DateProviderImpl';
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
		container.registerSingleton<UsersRepository>(usersRepositoryAlias, UsersRepositoryTypeOrm);
		container.registerSingleton<DateProvider>(dateProviderAlias, DateProviderImpl);
		container.registerSingleton<ProductsRepository>(productsRepositoryAlias, ProductsRepositoryTypeOrm);
		container.registerSingleton<ProductsReportRepository>(productsReportRepositoryAlias, ProductsReportRepositoryTypeOrm);
		container.registerSingleton<OrdersRepository>(ordersRepositoryAlias, OrdersRepositoryTypeOrm);
	}
}

export function find<T>(token: InjectionToken<T>): T {
	return container.resolve(token);
}
