// utils.spec.ts
import { createTransportAndApp, getAddresses } from '../utils';

jest.mock('@ledgerhq/hw-transport-node-hid');
jest.mock('@zondax/ledger-she');

import Transport from '@ledgerhq/hw-transport-node-hid';
import { SheApp } from '@zondax/ledger-she';

describe('Ledger utils', () => {
	const mockTransport = {};
	const mockGetEVMAddress = jest.fn();
	const mockGetCosmosAddress = jest.fn();

	beforeEach(() => {
		(Transport.create as jest.Mock).mockResolvedValue(mockTransport);

		(SheApp as unknown as jest.Mock).mockImplementation(() => ({
			getEVMAddress: mockGetEVMAddress,
			getCosmosAddress: mockGetCosmosAddress
		}));

		mockGetEVMAddress.mockReset();
		mockGetCosmosAddress.mockReset();
	});

	it('createTransportAndApp returns correct transport and app', async () => {
		const result = await createTransportAndApp();

		expect(Transport.create).toHaveBeenCalled();
		expect(SheApp).toHaveBeenCalledWith(mockTransport);
		expect(result).toEqual({
			transport: mockTransport,
			app: expect.any(Object)
		});
	});

	it('getAddresses returns both EVM and native address', async () => {
		const mockEvmAddress = '0x123';
		const mockNativeAddress = { address: 'she123', pubKey: 'abcd' };

		mockGetEVMAddress.mockResolvedValueOnce(mockEvmAddress);
		mockGetCosmosAddress.mockResolvedValueOnce(mockNativeAddress);

		const { app } = await createTransportAndApp();
		const path = "m/44'/60'/0'/0/0";
		const result = await getAddresses(app, path);

		expect(mockGetEVMAddress).toHaveBeenCalledWith(path);
		expect(mockGetCosmosAddress).toHaveBeenCalledWith(path);
		expect(result).toEqual({
			evmAddress: mockEvmAddress,
			nativeAddress: mockNativeAddress
		});
	});
});
