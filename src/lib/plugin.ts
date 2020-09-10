const pluginStatusList = ['STARTED', 'STOPPED', 'LOADING', 'ERROR'] as const;
export type PluginStatus = typeof pluginStatusList[number];

export abstract class Plugin<P extends Record<string, any>> {
	protected props: P;
	public init(props: P): void {
		this.props = props;
	}
	abstract start(): Promise<void>;
	abstract stop(): Promise<void>;
	abstract getStatus(): PluginStatus;
}
