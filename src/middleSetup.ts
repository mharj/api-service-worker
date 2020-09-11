import * as bodyParser from 'body-parser';
import {Express} from 'express';

export const setupExpress = (app: Express): void => {
	// express settings
	app.set('etag', false);
	app.disable('x-powered-by');
	app.enable('trust proxy');
	// body parsers
	app.use(bodyParser.urlencoded({extended: false}));
	app.use(bodyParser.json());
	// middlewares
	/* 	app.use(corsMiddleWare);
	app.use('/api', rootRouter);
 */ // errors
	/* 	app.use(errorMiddleWare); */
};
