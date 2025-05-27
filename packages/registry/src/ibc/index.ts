import IBCInfoJSON from '../../chain-registry/ibc_info.json';
import { Network } from '../index';

/**
 * Represents information about an IBC channel, facilitating communication
 * between She and different blockchain networks.
 */
export interface ChannelInfo {
	/**
	 * The name of the counterparty chain with which the channel is established.
	 */
	counterparty_chain_name: string;
	/**
	 * The channel identifier on the destination chain.
	 */
	dst_channel: string;
	/**
	 * The channel identifier on the source (She) chain.
	 */
	src_channel: string;
	/**
	 * The port identifier used in the IBC communication.
	 */
	port_id: string;
	/**
	 * The client identifier used for IBC communication.
	 */
	client_id: string;
}

/**
 * A mapping of She network names to arrays of `ChannelInfo`, providing
 * detailed IBC channel configurations for each network.
 */
type IBCInfo = {
	/**
	 * Associates each official She network with its respective array of `ChannelInfo` objects,
	 * detailing the IBC channels available on that network.
	 */
	[network in Network]: ChannelInfo[];
};

/**
 * A constant that holds the IBC channel information for each network, imported from the official She [chain-registry](https://github.com/she-protocol/chain-registry)
 *
 * @example
 * ```tsx
 * import { IBC_INFO } from '@she-js/registry';
 *
 * const pacific1 = IBC_INFO['pacific-1'].find((ibcInfo) => ibcInfo.counterparty_chain_name === 'cosmoshub-4');
 * ```
 */
export const IBC_INFO: IBCInfo = IBCInfoJSON as IBCInfo;
