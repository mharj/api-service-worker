export const pluginActionRequestTypes = ['INIT', 'STATUS'] as const;
export type PluginActionRequestType = typeof pluginActionRequestTypes[number];
export const pluginActionResponseTypes = ['STATUS', 'DATA'] as const;
export type PluginActionResponseType = typeof pluginActionResponseTypes[number];

interface PluginActionRequestBase<T extends PluginActionRequestType> {
	uuid: string;
	type: T;
}
export interface PluginActionInitRequest<P extends Record<string, any>> extends PluginActionRequestBase<'INIT'> {
	props: P;
}

export type PluginActionStatusRequest = PluginActionRequestBase<'STATUS'>;
