import {Plugin} from '../lib/plugin';

export interface ISonosProps {
	url: string;
}

export class SonosPlugin extends Plugin<ISonosProps> {
	public getStatus() {
		return 'STARTED' as 'STARTED';
	}
	public async start() {
		// TODO
	}
	public async stop() {
		// TODO
	}
}
