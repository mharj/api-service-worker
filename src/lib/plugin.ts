import {logger} from '../logger';

const pluginStatusList = ['CREATED', 'INIT', 'STARTED', 'STOPPED', 'LOADING', 'ERROR'] as const;
export type PluginStatus = typeof pluginStatusList[number];
const isPluginStatus = (status: any): status is PluginStatus => {
	return status && pluginStatusList.findIndex((s) => s === status) !== -1;
};

export abstract class Plugin<P extends Record<string, any>> {
	protected props: P;
	private status: PluginStatus = 'CREATED';
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
	}
	public getStatus() {
		logger.debug('Plugin::getStatus');
		return this.status;
	}
}
