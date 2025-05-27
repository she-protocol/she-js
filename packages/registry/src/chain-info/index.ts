import ChainInfoJSON from '../../chain-registry/chain_info.json';

/**
 * Represents the essential information about an official She network.
 */
export interface ChainInfo {
	/** The name of the chain. (She) */
	chain_name: string;
	/** The type of network, indicating whether it's a mainnet, testnet, or devnet. */
	network_type: 'mainnet' | 'testnet' | 'devnet';
	/** The unique identifier for the She network. 'pacific-1' | 'atlantic-2' | 'arctic-1' */
	chain_id: string;
	/** The name of the daemon process that runs the node software for the blockchain. (shed) */
	daemon_name: string;
	/** The prefix used for Bech32 encoded addresses on the network. (she) */
	bech32_prefix: string;
	/** An array of cryptographic algorithms supported by the network for key generation. */
	key_algos: string[];
	/** The SLIP-44 coin type number assigned to the network for HD wallet purposes. */
	slip44: number;
	/** The denomination of the fee token used for transaction fees on the network. */
	fee_token: string;
	/** A list of wallet software that supports this blockchain network. */
	supported_wallets: string[];
}

/**
 * A constant that holds the chain information, imported from the official She [chain-registry](https://github.com/she-protocol/chain-registry).
 *
 * @example
 * ```tsx
 * import { CHAIN_INFO } from '@she-js/registry';
 *
 * console.log(CHAIN_INFO.bech32_prefix); // 'she'
 * ```
 */
export const CHAIN_INFO: ChainInfo = ChainInfoJSON as ChainInfo;
