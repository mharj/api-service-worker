process.env.NODE_ENV = 'test';
import 'chai-http';
import * as chai from 'chai';
import {expect} from 'chai';
import 'mocha';
import {Express} from 'express';
import {getConfigVariable} from '../src/lib/configTool';
import {IConfigFile, readConfig} from '../src/lib/configUtil';
import {startExpress, stopExpress} from '../src/service';

chai.use(require('chai-http'));
let app: Express;
let baseUrl: string;
let config: IConfigFile;
describe('test hooks', () => {
	before(async () => {
		app = await startExpress('9475');
		baseUrl = await getConfigVariable('base_url', '/api/hooks');
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
