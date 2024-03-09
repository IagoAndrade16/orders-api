import { DataSource } from 'typeorm';

import { Environment } from '../core/Environment';
import { dataSource } from './source';

export class Database {
	static source: DataSource = dataSource;

	static async initialize(): Promise<void> {
		if (Database.source.isInitialized) return;

		const host = Environment.vars.MYSQL_HOST;
		if (host.includes('prod') && Environment.getType() !== 'prod') {
			throw Error('database host should not contain the word "prod" if NODE_ENV is not prod');
		}

		console.log(`Connecting to ${host}`);
		await Database.source.initialize();
	}

	static async close(): Promise<void> {
		await Database.source.destroy();
	}
}
