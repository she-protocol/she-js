import { sheLocal } from '../chain';

describe('sheLocal chain', () => {
	it('should be a valid chain definition', () => {
		expect(sheLocal).toMatchObject({
			id: 713715,
			name: 'She Local',
			nativeCurrency: {
				name: 'She',
				symbol: 'SHE',
				decimals: 18
			},
			rpcUrls: {
				default: {
					http: ['http://localhost:8545']
				}
			}
		});
	});
});
