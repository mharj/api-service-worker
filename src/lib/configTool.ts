import {config as dotEnvConfig} from 'dotenv';
import * as fs from 'fs';
import {logger} from '../logger';

dotEnvConfig();

export async function getConfigVariable(name: string, defaultValue: string, config?: {fileLowerCase?: boolean}): Promise<string>;
export async function getConfigVariable(name: string, defaultValue?: string, config?: {fileLowerCase?: boolean}): Promise<string | undefined> {
	const path = config && config.fileLowerCase ? `/run/secrets/${name.toLowerCase()}` : `/run/secrets/${name}`;
	if (fs.existsSync(path)) {
		logger.info(`config ${name} from ${path}`);
		return fs.readFileSync(path).toString();
	}
	if (name in process.env) {
		logger.info(`config ${name} from process.env.${name}`);
		return process.env[`${name}`];
	}
	if (defaultValue) {
		logger.info(`config ${name} from default value`);
		return defaultValue;
	}
	return undefined;
}
