import {Plugin} from '../lib/plugin';
import {logger} from '../logger';

export interface ISonosProps {
	url: string;
}

export class SonosPlugin extends Plugin<ISonosProps> {
	public async start() {
		logger.debug('SonosPlugin:start');
		this.setStatus('STARTED');
		// TODO
	}
	public async stop() {
		logger.debug('SonosPlugin:stop');
		this.setStatus('STOPPED');
		// TODO
	}
}
