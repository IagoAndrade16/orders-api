import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import { xss } from 'express-xss-sanitizer';

import { DependencyInjection } from '../core/DependencyInjection';
import { Environment } from '../core/Environment';
import { handleErrors } from './middlewares/handleErrors';
import { appRouter } from './routes/router';

const app = express();

Environment.assertInitialized();
DependencyInjection.init();

app.use(cors({ origin: '*' }));
app.options('*', cors());

app.use(express.json({ limit: '30mb' }));
app.use(xss());
app.use(express.static('public'));

app.use(appRouter);
app.use(handleErrors);

export { app };
