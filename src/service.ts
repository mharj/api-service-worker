import * as express from 'express';
import {Server} from 'http';
import {getHttpPort} from './env';
import {logger} from './logger';
const app = express();

import {setupExpress} from './middleSetup';

let server: undefined | Server;

export const startExpress = (port: string | number): Promise<express.Express> => {
	setupExpress(app);
	return new Promise((resolve, reject) => {
		if (!app) {
			reject(new Error('no express instance found'));
		} else {
			server = app.listen(port, () => {
				resolve(app);
			});
		}
	});
};

export const stopExpress = (): Promise<void> => {
	return new Promise((resolve) => {
		if (server) {
			server.close(() => resolve());
		} else {
			resolve();
		}
	});
};

export const startAll = async (): Promise<void> => {
	const port = await getHttpPort();
	await startExpress(port);
	logger.info(`api-service-worker listening on port http://localhost:${port} [${process.env.NODE_ENV}]`);
};
// tslint:disable: no-floating-promises
if (process.env.NODE_ENV !== 'test') {
	startAll();
}

export const startService = async (): Promise<void> => {};

export const stopService = async (): Promise<void> => {};
