import * as bodyParser from 'body-parser';
import {Express} from 'express';
import {getConfigVariable} from './lib/configTool';
import {readConfig} from './lib/configUtil';
import {logger} from './logger';
import {route as startRoute} from './routes/start';
import {route as stopRoute} from './routes/stop';

export const setupExpress = async (app: Express): Promise<void> => {
	// express settings
	app.set('etag', false);
	app.disable('x-powered-by');
	app.enable('trust proxy');
	// body parsers
	app.use(bodyParser.urlencoded({extended: false}));
	app.use(bodyParser.json());
	// setup hooks
	const baseUrl = await getConfigVariable('base_url', '/api/hooks');
	const config = await readConfig();
	logger.info(`registered start hook: ${baseUrl}/${config.startHookUrl}`);
	app.use(`${baseUrl}/${config.startHookUrl}`, startRoute);
	logger.info(`registered stop hook: ${baseUrl}/${config.stopHookUrl}`);
	app.use(`${baseUrl}/${config.stopHookUrl}`, stopRoute);
};
