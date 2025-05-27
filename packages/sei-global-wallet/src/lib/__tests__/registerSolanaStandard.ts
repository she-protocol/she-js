import { createSolanaWallet, registerWallet } from '@dynamic-labs/global-wallet-client/solana';
import { registerSolanaStandard } from '../registerSolanaStandard';
import Wallet from '../wallet';

jest.mock('@dynamic-labs/global-wallet-client/solana', () => ({
	createSolanaWallet: jest.fn(),
	registerWallet: jest.fn()
}));

jest.mock('../wallet', () => ({}));
jest.mock('../config', () => ({
	config: {
		walletIcon: 'test-icon',
		walletName: 'SHE Wallet'
	}
}));

describe('registerSolanaStandard', () => {
	it('calls createSolanaWallet and registers it', () => {
		const mockWalletObject = { id: 'she' };
		(createSolanaWallet as jest.Mock).mockReturnValue(mockWalletObject);

		registerSolanaStandard();

		expect(createSolanaWallet).toHaveBeenCalledWith(
			{
				icon: 'test-icon',
				name: 'SHE Wallet'
			},
			Wallet
		);

		expect(registerWallet).toHaveBeenCalledWith(mockWalletObject);
	});
});
