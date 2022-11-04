import {
  WalletProvider,
  NetworkInfo,
  ReadonlyWalletSession,
} from '@terra-money/wallet-provider';


import { useWallet, WalletStatus } from '@terra-money/use-wallet';
import { useCallback, useEffect, useMemo, useState } from 'react';

export function NetworkSample() {
  const { status, supportFeatures } = useWallet();



  return (
    <div>
      <h1>Network Sample</h1>
      {supportFeatures.has('network') ? (
        <Component />
      ) : status === WalletStatus.WALLET_CONNECTED ? (
        <p>This connection does not support Network commands</p>
      ) : (
        <p>Wallet not connected!</p>
      )}
    </div>
  );
}

//const TEST_NETWORK = {
//  name: 'test-network',
// chainID: 'bombay-12',
//  lcd: 'https://lcd.terra.dev',
//};

// network information
const mainnet: NetworkInfo = {
  name: 'mainnet',
  chainID: 'columbus-5',
  lcd: 'https://lcd.terra.dev',
  walletconnectID: 1,

}



const testnet: NetworkInfo = {
    name: "testnet",
    chainID: "pisco-1",
    lcd: "https://pisco-lcd.terra.dev",
    walletconnectID: 0,
};





function Component() {
  const { hasNetwork, addNetwork } = useWallet();

  const [networkExists, setNetworkExists] = useState<
    'exists' | 'not exists' | null
  >(null);

  const availableAdd = useMemo(() => {
    return networkExists === 'not exists';
  }, [networkExists]);

  useEffect(() => {
    hasNetwork(testnet).then((result) =>
      setNetworkExists(result ? 'exists' : 'not exists'),
    );
  }, [hasNetwork]);

  const add = useCallback(() => {
    addNetwork(testnet).then((result) =>
      setNetworkExists(result ? 'exists' : 'not exists'),
    );
  }, [addNetwork]);

  return (
    <div>
      <pre>Network exists: {networkExists}</pre>
      {availableAdd && <button onClick={add}>Add network</button>}
    </div>
  );
}
