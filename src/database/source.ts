import { DataSource } from 'typeorm';

import { Environment } from '../core/Environment';

Environment.assertInitialized();

export const dataSource = new DataSource({
	type: 'mysql',
	timezone: Environment.vars.MYSQL_TIMEZONE,
	host: Environment.vars.MYSQL_HOST,
	port: Environment.vars.MYSQL_PORT,
	username: Environment.vars.MYSQL_USER,
	password: Environment.vars.MYSQL_PASS,
	database: Environment.vars.MYSQL_DATABASE,
	logging: Environment.vars.DB_LOGGING,
	entities: [
		Environment.vars.INVERT_DB_SOURCE
			? Environment.getType() === 'dev' ? '**/entities/*.js' : '**/entities/*.ts'
			: Environment.getType() === 'prod' ? '**/entities/*.js' : '**/entities/*.ts',
	],
	migrations: [
		Environment.vars.INVERT_DB_SOURCE
			? Environment.getType() === 'dev' ? '**/migrations/*.js' : '**/migrations/*.ts'
			: Environment.getType() === 'prod' ? '**/migrations/*.js' : '**/migrations/*.ts',
	],
	synchronize: false,
});
