import { encodeSecp256k1Signature, serializeSignDoc } from '@cosmjs/amino';
import { Secp256k1Signature } from '@cosmjs/crypto';
import { fromHex } from '@cosmjs/encoding';
import { SheLedgerOfflineAminoSigner } from '../';

const mockAddress = 'she13094hremwgx5gg7jhz684eqrs3ynuc82r2jht0';
const mockPubKey = '028a789b4e6db0f6b3c75e8bc7f83f91b823d2ffdb69a0e3db101d54b2be8e32cc';
const mockR = new Uint8Array([0, 1, 2]); // should be stripped
const mockS = new Uint8Array([0, 3, 4]); // should be stripped
const path = "m/44'/118'/0'/0/0";

const mockSheApp = {
	getCosmosAddress: jest.fn().mockResolvedValue({
		address: mockAddress,
		pubKey: mockPubKey
	}),
	signCosmos: jest.fn().mockResolvedValue({
		r: mockR,
		s: mockS
	})
};

describe('SheLedgerOfflineAminoSigner', () => {
	let signer: SheLedgerOfflineAminoSigner;

	beforeEach(() => {
		signer = new SheLedgerOfflineAminoSigner(mockSheApp as never, path);
		jest.clearAllMocks();
	});

	describe('getAccounts', () => {
		it('should return the correct AccountData', async () => {
			const accounts = await signer.getAccounts();
			expect(mockSheApp.getCosmosAddress).toHaveBeenCalledWith(path);
			expect(accounts).toEqual([
				{
					address: mockAddress,
					algo: 'secp256k1',
					pubkey: fromHex(mockPubKey)
				}
			]);
		});
	});

	describe('signAmino', () => {
		it('should sign the document and return the correct signature structure', async () => {
			const fakeDoc = {
				chain_id: 'she-chain',
				account_number: '1',
				sequence: '0',
				fee: { amount: [], gas: '200000' },
				msgs: [],
				memo: ''
			};

			const result = await signer.signAmino(mockAddress, fakeDoc);

			expect(mockSheApp.signCosmos).toHaveBeenCalledWith(path, Buffer.from(serializeSignDoc(fakeDoc)));
			expect(mockSheApp.getCosmosAddress).toHaveBeenCalledTimes(1);

			const expectedSig = new Secp256k1Signature(new Uint8Array([1, 2]), new Uint8Array([3, 4])).toFixedLength();
			expect(result).toEqual({
				signed: fakeDoc,
				signature: encodeSecp256k1Signature(fromHex(mockPubKey), expectedSig)
			});
		});
	});
});
