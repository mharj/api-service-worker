import {logger} from '../logger';

const pluginStatusList = ['CREATED', 'INIT', 'STARTED', 'STOPPED', 'LOADING', 'ERROR'] as const;
export type PluginStatus = typeof pluginStatusList[number];
const isPluginStatus = (status: any): status is PluginStatus => {
	return status && pluginStatusList.findIndex((s) => s === status) !== -1;
};

export abstract class Plugin<P = Record<string, any>> {
	protected props: P;
	private status: PluginStatus;
	private statusCallback: ((status: string) => void) | undefined;
	constructor(statusCallback?: (status: string) => void) {
		this.statusCallback = statusCallback;
		this.setStatus('CREATED');
	}
	public init(props: P): void {
		logger.debug('Plugin::init', props);
		this.props = props;
		this.setStatus('INIT');
	}
	abstract start(): Promise<void>;
	abstract stop(): Promise<void>;
	protected setStatus(status: PluginStatus) {
		logger.debug('Plugin::setStatus', status);
		if (!isPluginStatus(status)) {
			throw new Error(`wrong status type ${status} `);
		}
		this.status = status;
		if (this.statusCallback) {
			this.statusCallback(this.status);
		}
	}
	public getStatus() {
		logger.debug('Plugin::getStatus');
		return this.status;
	}
}
