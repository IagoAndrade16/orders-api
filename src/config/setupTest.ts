import 'reflect-metadata';
import { DependencyInjection } from '../core/DependencyInjection';
import { Environment } from '../core/Environment';

Environment.assertInitialized();
DependencyInjection.init();
jest.setTimeout(80 * 1000);
