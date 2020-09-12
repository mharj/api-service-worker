process.env.NODE_ENV = 'test';
import {expect} from 'chai';
import * as sinon from 'sinon';
import 'mocha';
import {PluginStack} from '../src/lib/pluginStack';
import {TestPlugin} from './lib/TestPlugin';

describe('plugin stack', () => {
	it('should test all sonos methods', async () => {
		const fake = sinon.fake();
		const plugin1 = new TestPlugin(fake);
		const plugin2 = new TestPlugin(fake);
		expect(fake.callCount).to.be.eq(2);
		const stack = new PluginStack();
		stack.add(plugin1);
		stack.add(plugin2);
		stack.start();
		expect(fake.callCount).to.be.eq(4);
		stack.stop();
		expect(fake.callCount).to.be.eq(6);
		// check delete plugin1 and check stack to filter this out
	});
});
