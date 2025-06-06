import Transport from '@ledgerhq/hw-transport-node-hid';
import { SheApp } from '@zondax/ledger-she';

/**
 * Creates a transport and app instance
 *
 * @returns {Promise<{transport: Transport, app: SheApp}>} transport and app instances
 */
export const createTransportAndApp = async () => {
	const transport = await Transport.create();
	const app = new SheApp(transport);
	return { transport, app };
};

/**
 * Get the EVM and Cosmos addresses from the Ledger device
 * @param app Ledger She app instance
 * @param path hd derivation path (e.g. "m/44'/60'/0'/0/0")
 *
 * @returns {Promise<{evmAddress: string, nativeAddress: string}>} EVM and Cosmos address objects containing
 * address and public key
 */
export const getAddresses = async (app: SheApp, path: string) => {
	const evmAddress = await app.getEVMAddress(path);
	const nativeAddress = await app.getCosmosAddress(path);
	return { evmAddress, nativeAddress };
};
