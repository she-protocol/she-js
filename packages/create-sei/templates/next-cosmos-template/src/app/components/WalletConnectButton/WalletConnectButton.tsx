import { useChain } from '@cosmos-kit/react';

import '@interchain-ui/react/styles';

import { truncateSheAddress } from '@she-js/cosmjs';
import { selectedChain } from '../../constants';

export function WalletConnectButton() {
	const { isWalletConnected, address, connect, openView } = useChain(selectedChain.chain_name);

	const truncatedSheAddr = address ? truncateSheAddress(address) : '';

	return (
		<button className="primary" onClick={isWalletConnected ? openView : connect}>
			{isWalletConnected ? truncateSheAddress(truncatedSheAddr) : 'Connect'}
		</button>
	);
}
