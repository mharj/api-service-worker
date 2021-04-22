import {expect} from 'chai';
import 'mocha';
import {SonosPlugin} from '../../src/plugins/sonos';

describe('sonos plugin', () => {
	it('should test all sonos methods', async () => {
		const sonos = new SonosPlugin();
		expect(sonos.getStatus()).to.be.eq('CREATED');
		sonos.init({url: 'http://localhost:8080'});
		expect(sonos.getStatus()).to.be.eq('INIT');
		await sonos.start();
		expect(sonos.getStatus()).to.be.eq('STARTED');
		await sonos.stop();
		expect(sonos.getStatus()).to.be.eq('STOPPED');
	});
});
