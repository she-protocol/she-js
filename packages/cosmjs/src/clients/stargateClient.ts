import type { HttpEndpoint } from '@cosmjs/cosmwasm-stargate';
import { type GeneratedType, type OfflineSigner, Registry } from '@cosmjs/proto-signing';
import {
	AminoTypes,
	SigningStargateClient,
	type SigningStargateClientOptions,
	StargateClient,
	type StargateClientOptions,
	defaultRegistryTypes
} from '@cosmjs/stargate';
import { aminoConverters, seiProtoRegistry } from '@she-js/cosmos/encoding';

/**
 * Creates a Registry object that maps CosmWasm and She protobuf type identifiers to their actual implementations.
 *
 * @example
 * ```tsx
 * import { Registry } from "@cosmjs/proto-signing";
 * import { defaultRegistryTypes } from "@cosmjs/stargate";
 * import { getSigningStargateClient } from '@she-js/cosmjs';
 * import { seiProtoRegistry } from '@she-js/cosmos/encoding';
 *
 * ...
 *
 * // Set up She proto registry
 * const registry = createSeiRegistry();
 *
 * // Create a client with registry
 * const signingClient = await getSigningStargateClient(RPC_URL, offlineSigner, { registry });
 * ```
 *
 * @returns A Registry object that maps CosmWasm and She protobuf type identifiers to their actual implementations.
 * @category Config
 */
export const createSeiRegistry = (): Registry => {
	return new Registry([...defaultRegistryTypes, ...(seiProtoRegistry as ReadonlyArray<[string, GeneratedType]>)]);
};

/**
 * Creates a mapping of stargate message types to She Amino types.
 *
 * @example
 * ```tsx
 * import { Registry } from "@cosmjs/proto-signing";
 * import { defaultRegistryTypes } from "@cosmjs/stargate";
 * import { getSigningStargateClient } from '@she-js/cosmjs';
 * import { createSeiRegistry, createSeiAminoTypes } from "@she-js/cosmos/encoding";
 *
 * ...
 *
 * // Create a client with registry
 * const signingClient = await getSigningStargateClient(RPC_URL, offlineSigner, { registry: createSeiRegistry(), aminoTypes: createSeiAminoTypes() });
 * ```
 *
 * @returns A mapping of stargate message types to She Amino types.
 * @category Config
 */
export const createSeiAminoTypes = (): AminoTypes => {
	return new AminoTypes(aminoConverters);
};

/**
 * Gets a @cosmjs/stargate client used to interact with the She chain.
 *
 * @example
 * With custom registry and amino types
 * ```tsx
 * import { getStargateClient } from '@she-js/cosmjs';
 *
 * ...
 *
 * // Create a client with registry
 * const signingClient = await getStargateClient(RPC_URL);
 * ```
 *
 * @param rpcEndpoint The endpoint of the RPC node used to interact to the She chain.
 * @param options A StargateClientOptions object used to configure the stargate client.
 * @returns A StargateClient object used to interact with the She chain.
 * @category Clients
 */
export const getStargateClient = async (rpcEndpoint: string | HttpEndpoint, options?: StargateClientOptions): Promise<StargateClient> => {
	return StargateClient.connect(rpcEndpoint, options);
};

/**
 * Gets a @cosmjs/stargate client used to sign transactions on the She chain.
 *
 * @example
 * Standard usage
 * ```tsx
 * import { getSigningStargateClient } from '@she-js/cosmjs';
 *
 * // Don't forget to connect if using a wallet extension
 * // or create a wallet from a mnemonic (See above)
 * await window.compass.connect(chainId);
 *
 * const offlineSigner = await window.compass.getOfflineSigner(chainId);
 *
 * const signingClient = await getSigningStargateClient(RPC_URL, offlineSigner);
 * ```
 *
 * @example
 * With custom registry and amino types
 * ```tsx
 * import { Registry } from "@cosmjs/proto-signing";
 * import { defaultRegistryTypes } from "@cosmjs/stargate";
 * import { getSigningStargateClient } from '@she-js/cosmjs';
 * import { aminoConverters, seiProtoRegistry } from "@she-js/cosmos/encoding";
 *
 * ...
 *
 * // Set up She proto registry
 * const registry = new Registry([
 *   ...defaultRegistryTypes,
 *   ...seiProtoRegistry,
 * ]);
 *
 * // Create Amino Types
 * const aminoTypes = new AminoTypes(aminoConverters);
 *
 * const offlineSigner = await window.compass.getOfflineSigner(chainId);
 *
 * // Create a client with registry
 * const signingClient = await getSigningStargateClient(RPC_URL, offlineSigner, { registry, aminoTypes });
 * ```
 *
 * @example
 * Transfer tokens (Bank send):
 * ```tsx
 * import { calculateFee } from '@cosmjs/stargate';
 * import { getSigningStargateClient } from '@she-js/cosmjs';
 *
 * const fee = calculateFee(100000, "0.1usei");
 * const amount = { amount: SEND_AMOUNT, denom: TOKEN_DENOM };
 *
 * const offlineSigner = await window.compass.getOfflineSigner(chainId);
 *
 * const signingClient = await getSigningStargateClient(RPC_URL, offlineSigner);
 * const sendResponse = await signingClient.sendTokens(SENDER_ADDRESS, DESTINATION_ADDRESS, [amount], fee);
 * ```
 *
 * @example
 * IBC Transfer:
 * ```tsx
 * import { calculateFee } from '@cosmjs/stargate';
 * import { Encoder } from '@she-js/cosmos/encoding';
 *
 * const amount = { amount: SEND_AMOUNT, denom: TOKEN_DENOM };
 *
 * const ibcResponse = await signingClient.sendIbcTokens(SENDER_ADDRESS, DESTINATION_ADDRESS, amount, 'transfer', CHANNEL_ID, undefined, undefined, fee)
 *
 * // Create message to place an order
 * const msg = Encoder.cosmos.bank.v1beta1.MsgSend.fromPartial({ contractAddr, creator, funds, orders });
 * const fee = calculateFee(150000, "0.1usei");
 *
 * // Sign and broadcast the message
 * const response = signingClient.signAndBroadcast(firstAccount.address, [msg], fee);
 * ```
 *
 * @param rpcEndpoint The endpoint of the RPC node used to interact to the She chain.
 * @param signer An OfflineAminoSigner or OfflineDirectSigner from @cosmjs/amino containing info about the signer.
 * @param options A SigningStargateClientOptions object used to configure the stargate client.
 * @returns A SigningStargateClient object used to sign transactions on the She chain.
 * @category Clients
 */
export const getSigningStargateClient = async (
	rpcEndpoint: string | HttpEndpoint,
	signer: OfflineSigner,
	options?: SigningStargateClientOptions
): Promise<SigningStargateClient> => {
	const registry = createSeiRegistry();
	const aminoTypes = createSeiAminoTypes();
	return SigningStargateClient.connectWithSigner(rpcEndpoint, signer, {
		registry,
		aminoTypes,
		broadcastPollIntervalMs: options?.broadcastPollIntervalMs || 400, // Need to decrease this because She is so fast ⚡🏃💨💨
		...options
	});
};
