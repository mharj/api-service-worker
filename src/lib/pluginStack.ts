import {Plugin} from './plugin';

export class PluginStack {
	private plugins: Plugin[] = [];
	public add(plugin: Plugin) {
		this.plugins.push(plugin);
	}
	public remove(plugin: Plugin) {
		this.plugins = this.plugins.filter((p) => p !== plugin);
	}
	public start() {
		this.plugins.forEach((e) => e.start());
	}
	public stop() {
		this.plugins.forEach((e) => e.stop());
	}
}
