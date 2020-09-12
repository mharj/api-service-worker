import {Plugin} from '../../src/lib/plugin';

export class TestPlugin extends Plugin<{}> {
	constructor(cb: (track: string) => void) {
		super(cb);
	}
	public async start() {
		this.setStatus('STARTED');
	}
	public async stop() {
		this.setStatus('STOPPED');
	}
}
