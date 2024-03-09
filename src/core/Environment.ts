import dotenv from 'dotenv';
import { InferType } from 'yup';
import * as yup from 'yup';

import { ValidationsUtils } from './ValidationsUtils';

export class Environment {
	private static varsSchema = yup.object({
		NODE_ENV: yup.string().required().oneOf(['dev', 'test', 'prod']),
		PORT: yup.string().required(),

		APP_BLOCK_ORIGIN: yup.string().required().max(16),
		DB_LOGGING: yup.boolean().required(),

		MYSQL_HOST: yup.string().required(),
		MYSQL_PORT: yup.number().required(),
		MYSQL_USER: yup.string().required(),
		MYSQL_PASS: yup.string().required(),
		MYSQL_DATABASE: yup.string().required(),
		MYSQL_TIMEZONE: yup.string().required(),

		ENCRYPTION_KEY: yup.string().required().length(32),
		ENCRYPTION_IV: yup.string().required().length(16),

		JWT_EXP_IN_MINUTES: yup.number().required(),
		JWT_SECRET: yup.string().required(),

		INVERT_DB_SOURCE: yup.boolean().optional().default(false),
	});

	static vars: InferType<typeof Environment.varsSchema>;

	static assertInitialized() {
		if (Environment.isInitialized()) return;
		dotenv.config();

		try {
			Environment.vars = this.varsSchema.validateSync(process.env, { abortEarly: false });
		} catch (err) {
			if (err instanceof yup.ValidationError) {
				const formatted = ValidationsUtils.formatYupErrors(err);
				throw new Error(JSON.stringify({
					environment: formatted,
				}));
			}
		}
	}

	private static isInitialized() {
		return Environment.vars !== undefined;
	}

	static getType(): 'dev' | 'test' | 'prod' {
		return process.env.NODE_ENV as 'dev' | 'test' | 'prod';
	}
}
