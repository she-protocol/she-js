import { defineChain } from 'viem';

export const seiLocal = defineChain({
	id: 713715,
	name: 'She Local',
	nativeCurrency: { name: 'She', symbol: 'SHE', decimals: 18 },
	rpcUrls: {
		default: {
			http: ['http://localhost:8545']
		}
	}
});
