# @she-js/ledger

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [createTransportAndApp](#createtransportandapp)
  - [Parameters](#createTransportAndApp-parameters)
- [getAddresses](#getaddresses)
  - [Parameters](#getAddresses-parameters)
- [SheLedgerOfflineAminoSigner](#sheledgerofflineaminosigner)
  - [Constructor](#SheLedgerOfflineAminoSigner-constructor)
  - [getAccounts](#SheLedgerOfflineAminoSigner-getAccounts)
  - [signAmino](#SheLedgerOfflineAminoSigner-signAmino)
- [removeLeadingZeros](#removeleadingzeros)
  - [Parameters](#removeLeadingZeros-parameters)

## Installation
```bash
yarn add @she-js/ledger
```

## Example Usage
```typescript
import {
  coins,
  SigningStargateClient,
  StdFee
} from "@cosmjs/stargate";

import {
  createTransportAndApp,
  getAddresses,
  SheLedgerOfflineAminoSigner
} from "@she-js/ledger";

const testApp = async () => {
  const validatorAddress = "shevaloper1sq7x0r2mf3gvwr2l9amtlye0yd3c6dqa4th95v";
  const rpcUrl = "https://rpc-testnet.she-apis.com/";
  const memo = "Delegation";
  const path = "m/44'/60'/0'/0/0";

  const {app} = await createTransportAndApp();
  const {nativeAddress} = await getAddresses(app, path);
  const ledgerSigner = new SheLedgerOfflineAminoSigner(app, path)
  const signingStargateClient = await SigningStargateClient.connectWithSigner(rpcUrl, ledgerSigner)

  const msgDelegate = {
    typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
    value: {
      delegatorAddress: nativeAddress.address,
      validatorAddress: validatorAddress,
      amount: coins(500, "ushe"),
    },
  };

  const fee: StdFee = {
    amount: [{denom: "ushe", amount: "20000"}],
    gas: "200000",
  };

  const result = await signingStargateClient.signAndBroadcast(nativeAddress.address, [msgDelegate], fee, memo)
  console.log("Broadcast result:", result);
};

testApp();
```


## createTransportAndApp

### Parameters:
- None.

### Returns:
- `Promise<{transport: Transport, app: SheApp}>`: A promise that resolves to an object containing the `transport` and `app` instances.

### Usage:
```typescript
import { createTransportAndApp } from '@she-js/ledger';

const { transport, app } = await createTransportAndApp();
console.log(transport, app);
```

## getAddresses

### Parameters:
- `app` (`SheApp`): An instance of the Ledger She app.
- `path` (`string`): The HD derivation path (e.g., `"m/44'/60'/0'/0/0"`).

### Returns:
- `Promise<{evmAddress: string, nativeAddress: string}>`: A promise that resolves to an object containing the EVM and Cosmos addresses.

### Usage:
```typescript
import { getAddresses } from '@she-js/ledger';

const { evmAddress, nativeAddress } = await getAddresses(app, "m/44'/60'/0'/0/0");
console.log(evmAddress, nativeAddress);
```

## SheLedgerOfflineAminoSigner

### Constructor

```typescript
new SheLedgerOfflineAminoSigner(app: SheApp, path: string)
```

#### Parameters:
- `app` (`SheApp`): An instance of the Ledger She app.
- `path` (`string`): The HD derivation path (e.g., `"m/44'/60'/0'/0/0"`).

#### Usage:
```typescript
import { SheLedgerOfflineAminoSigner } from '@she-js/ledger';

const ledgerSigner = new SheLedgerOfflineAminoSigner(app, "m/44'/60'/0'/0/0");
```

### getAccounts

#### Returns:
- `Promise<readonly AccountData[]>`: A promise that resolves to an array of `AccountData` objects containing the address and public key.

#### Usage:
```typescript
import { SheLedgerOfflineAminoSigner } from '@she-js/ledger';

const accounts = await ledgerSigner.getAccounts();
console.log(accounts); // { address: 'she1...', pubkey: { type: 'tendermint/PubKeySecp256k1', value: '...' } }
```

### signAmino

#### Parameters:
- `_signerAddress` (`string`): The address of the signer (unused in this method).
- `signDoc` (`StdSignDoc`): The sign document to be signed.

#### Returns:
- `Promise<AminoSignResponse>`: A promise that resolves to an object containing the signed document and the signature.

#### Usage:
```typescript
import { SheLedgerOfflineAminoSigner } from '@she-js/ledger';
import { StdSignDoc } from '@cosmjs/amino';

const signDoc: StdSignDoc = { /* your StdSignDoc object */ };
const signResponse = await ledgerSigner.signAmino('she123...', signDoc);
console.log(signResponse.signed, signResponse.signature);
```
