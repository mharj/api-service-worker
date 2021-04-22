// tslint:disable: no-require-imports
// tslint:disable: no-var-requires
import * as chai from 'chai';
import 'chai-http';
import {Express} from 'express';
import 'mocha';
import {getBaseUrl} from '../src/env';
import {IConfigFile, readConfig} from '../src/lib/configUtil';
import {startExpress, stopExpress} from '../src/service';

const expect = chai.expect;

chai.use(require('chai-http'));
let app: Express;
let baseUrl: string;
let config: IConfigFile;
describe('test hooks', () => {
	before(async () => {
		app = await startExpress('9475');
		baseUrl = await getBaseUrl();
		config = await readConfig();
	});
	it('should test start hook', async () => {
		const res = await chai.request(app).post(`${baseUrl}/${config.startHookUrl}`);
		expect(res.status).to.be.eq(200);
	});
	it('should test stop hook', async () => {
		const res = await chai.request(app).post(`${baseUrl}/${config.stopHookUrl}`);
		expect(res.status).to.be.eq(200);
	});
	after(async () => {
		await stopExpress();
	});
});
