import { getChainSuggest } from '../utils';

describe('getChainSuggest', () => {
	it('should return a chain config', async () => {
		const chainId = 'pacific-1';
		const restUrl = 'https://rest-url';
		const rpcUrl = 'https://rpc-url';
		expect(getChainSuggest({ chainId, restUrl, rpcUrl })).toEqual({
			chainId,
			chainName: 'She',
			rpc: rpcUrl,
			rest: restUrl,
			bip44: {
				coinType: 118
			},
			bech32Config: {
				bech32PrefixAccAddr: 'she',
				bech32PrefixAccPub: `shepub`,
				bech32PrefixValAddr: `shevaloper`,
				bech32PrefixValPub: `shevaloperpub`,
				bech32PrefixConsAddr: `shevalcons`,
				bech32PrefixConsPub: `shevalconspub`
			},
			currencies: [
				{
					coinDenom: 'SHE',
					coinMinimalDenom: 'ushe',
					coinDecimals: 6
				}
			],
			feeCurrencies: [
				{
					coinDenom: 'SHE',
					coinMinimalDenom: 'ushe',
					coinDecimals: 6,
					gasPriceStep: { low: 0.02, average: 0.04, high: 0.06 }
				}
			],
			stakeCurrency: {
				coinDenom: 'SHE',
				coinMinimalDenom: 'ushe',
				coinDecimals: 6
			},
			coinType: 118,
			features: ['stargate', 'ibc-transfer', 'cosmwasm']
		});
	});
});
