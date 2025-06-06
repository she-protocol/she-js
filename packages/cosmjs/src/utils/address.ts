import { ripemd160 } from '@cosmjs/crypto';
import { fromBech32 } from '@cosmjs/encoding';
import { secp256k1 } from '@noble/curves/secp256k1';
import { ec as EllipticCurve } from 'elliptic';
import { toBech32 } from './bech32';
import { sha256 } from './hash';

/**
 * Derives and returns the address from a given private key.
 * @param privateKeyHex A hex (0x) string of the private key of an account.
 * @returns The corresponding address for the given private key.
 * @category Utils
 */
export const deriveAddressesFromPrivateKey = (privateKeyHex: string) => {
	const privateKey = Uint8Array.from(Buffer.from(privateKeyHex.padStart(64, '0'), 'hex'));

	const publicKey = secp256k1.getPublicKey(privateKey, true);
	return compressedPubKeyToAddress(publicKey);
};

/**
 * Creates a hex encoded ECC KeyPair given a public key.
 * @param pubKey A byte array representing a public key.
 * @returns A hex encoded ECC KeyPair.
 * @category Utils
 */
export const pubKeyToKeyPair = (pubKey: Uint8Array): EllipticCurve.KeyPair => {
	const secp256k1 = new EllipticCurve('secp256k1');

	return secp256k1.keyFromPublic(Buffer.from(pubKey).toString('hex'), 'hex');
};

/**
 * Converts the given public key to a bytestring
 * @param pubKey The public key to convert.
 * @param uncompressed Whether the public key has already been compressed.
 * @returns A byte array representing the converted public key.
 * @category Utils
 */
export const pubKeyToBytes = (pubKey: Uint8Array, uncompressed?: boolean): Uint8Array => {
	if (uncompressed && pubKey.length === 65) {
		return pubKey;
	}
	if (!uncompressed && pubKey.length === 33) {
		return pubKey;
	}

	const keyPair = pubKeyToKeyPair(pubKey);

	if (uncompressed) {
		return new Uint8Array(Buffer.from(keyPair.getPublic().encode('hex', false), 'hex'));
	} else {
		return new Uint8Array(Buffer.from(keyPair.getPublic().encodeCompressed('hex'), 'hex'));
	}
};

/**
 * Gets the corresponding address from a byte array representing a compressed public key.
 * @param publicKey A byte array representing a compressed public key.
 * @returns The corresponding address to the given compressed public key.
 * @category Utils
 */
export const compressedPubKeyToAddress = (publicKey: Uint8Array) => {
	return toBech32(getAddressHashFromPubKey(publicKey));
};

/**
 * Gets the corresponding sha256 hashed address to a given compressed public key.
 * @param compressedPublicKey A byte array representing a compressed public key.
 * @returns A sha256 hashed address that corresponds to the given public key.
 * @category Utils
 */
export const getAddressHashFromPubKey = (compressedPublicKey: Uint8Array): Uint8Array => {
	return ripemd160(sha256(compressedPublicKey));
};

/**
 * Verifies a digest signed with a private key using the corresponding public key.
 * @param digest A byte array representing the digest we wish to verify.
 * @param signature A byte array representing the digital signature.
 * @param pubKey A byte array representing the public key of the signer.
 * @returns True if the digest is verified to have been signed using the private key complementing the given public key.
 * @category Utils
 */
export const verifyDigest32 = (digest: Uint8Array, signature: Uint8Array, pubKey: Uint8Array): boolean => {
	if (digest.length !== 32) {
		throw new Error(`Invalid length of digest to verify: ${digest.length}`);
	}

	if (signature.length !== 64) {
		throw new Error(`Invalid length of signature: ${signature.length}`);
	}

	const secp256k1 = new EllipticCurve('secp256k1');

	const r = signature.slice(0, 32);
	const s = signature.slice(32);

	return secp256k1.verify(
		digest,
		{
			r: Buffer.from(r).toString('hex'),
			s: Buffer.from(s).toString('hex')
		},
		pubKeyToKeyPair(pubKey)
	);
};

/**
 * Returns a boolean representing if the given string is a valid She address.
 * @param address The string we wish to verify.
 * @returns True if a string is a valid She address
 * @category Utils
 */
export const isValidSheCosmosAddress = (address: string) => {
	try {
		const { prefix } = fromBech32(address);
		return prefix && prefix === 'she';
	} catch (e) {
		return false;
	}
};

/**
 * Shortens a she address to display it in the format she...xxxxx where xxxxx is the last five characters of the address.
 * Used to display she address in an easily identifiable way.
 * @param address The address to truncate
 * @returns A shortened version of the address in the format she...xxxxx. Returns the input address if it is not a valid she address.
 * @category Utils
 */
export const truncateSheAddress = (address: string) => {
	if (!isValidSheCosmosAddress(address)) {
		return address;
	}
	return `${address.slice(0, 3)}....${address.slice(address.length - 5)}`;
};
