'use client';

import { ReactNode } from 'react';

import { ChainProvider } from '@cosmos-kit/react';
import { COSMOS_KIT_ASSET_LIST } from '@she-js/cosmjs';
import { wallets as finWallets } from '@cosmos-kit/fin';
import { wallets as keplrWallets } from '@cosmos-kit/keplr';
import { CompassExtensionWallet, compassExtensionInfo } from '@cosmos-kit/compass-extension';
import { selectedChain } from '../constants';

interface Web3ProviderProps {
	children: ReactNode;
}

const compassWallet = new CompassExtensionWallet({
	...compassExtensionInfo,
	mobileDisabled: false
});

function Web3Provider({ children }: Web3ProviderProps) {
	// Define your supported wallets here
	const wallets = [compassWallet, ...finWallets, ...keplrWallets];

	// Define the list of she chain you would like to connect to here.
	const chains = [selectedChain];

	return (
		<ChainProvider chains={chains} assetLists={[COSMOS_KIT_ASSET_LIST]} wallets={wallets}>
			{children}
		</ChainProvider>
	);
}

export default Web3Provider;
