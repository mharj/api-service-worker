import * as fs from 'fs';
import {v4 as uuid} from 'uuid';

const getConfigName = () => {
	switch (process.env.NODE_ENV) {
		case 'production':
			return 'config.json';
		default:
			return `config-${process.env.NODE_ENV}.json`;
	}
};

export interface IConfigFile {
	startHookUrl: string;
	stopHookUrl: string;
}

const generateHooks = (): IConfigFile => ({
	startHookUrl: uuid(),
	stopHookUrl: uuid(),
});

export const readConfig = (): Promise<IConfigFile> => {
	return new Promise((resolve, reject) => {
		const configFile = getConfigName();
		if (fs.existsSync(configFile)) {
			fs.readFile(configFile, (err, data) => {
				if (err) {
					reject(err);
				} else {
					resolve(JSON.parse(data.toString()));
				}
			});
		} else {
			const config = generateHooks();
			writeConfig(config);
			resolve(config);
		}
	});
};

export const writeConfig = (configData: IConfigFile): Promise<void> => {
	return new Promise((resolve, reject) => {
		fs.writeFile(getConfigName(), JSON.stringify(configData), (err) => {
			if (err) {
				reject(err);
			} else {
				resolve();
			}
		});
	});
};
