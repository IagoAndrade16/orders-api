import 'reflect-metadata';
import { Environment } from '../core/Environment';
import { PM2 } from '../core/PM2';
import { Database } from '../database/Database';
import { app } from './app';
import { onListening, shutDownGracefully } from './setup';

(async () => {
	await Database.initialize();

	const server = app.listen(Environment.vars.PORT, onListening);
	PM2.onClose(() => shutDownGracefully(server));
})();
