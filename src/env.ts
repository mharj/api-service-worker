import {getConfigVariable, setLogger} from 'mharj-node-variable-util';
import {logger} from './logger';

setLogger(logger);

let httpPort: string | undefined;
export async function getHttpPort() {
	if (!httpPort) {
		httpPort = await getConfigVariable('PORT', '5259', {secretsFileLowerCase: true});
	}
	return httpPort;
}

let baseUrl: string | undefined;
export async function getBaseUrl() {
	if (!baseUrl) {
		baseUrl = await getConfigVariable('base_url', '/api/hooks', {showValue: true});
	}
	return baseUrl;
}
