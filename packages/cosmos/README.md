# @she-js/cosmos

`@she-js/cosmos` is a set of TypeScript libraries for interaction with She, using Cosmos standards and interfaces. It provides:

> **For EVM Developers**: @she-js/cosmos/types provides TypeScript types for all custom She modules, simplifying integration between Cosmos and EVM ecosystems.

### Installation
Install the package using Yarn: `yarn add @she-js/cosmos`

### Exported Packages
- [@she-js/cosmos/types](#she-jscosmostypes): TypeScript types for all modules and types.
- [@she-js/cosmos/encoding](#she-jscosmosencoding): Protobuf encoding/decoding utilities, cosmjs stargate amino converters and registry types.
- [@she-js/cosmos/rest](#she-jscosmosrest): REST client for querying She chain state through the Cosmos REST interface.

## `@she-js/cosmos/types`
Provides TypeScript types, enums, and interfaces for all She modules, including transaction messages, queries, coins, and REST and gRPC request/response types.

## Features
- Msg, Query, and enum types for all She modules and transactions

> **Usage with other packages**: Works with `@she-js/cosmos/rest`, `@she-js/cosmos/encoding`, `@she-js/cosmjs` and `@cosmjs/stargate`.

### Example Usage

#### Ex.) Bank Send Tx Msg
```typescript
// Import the MsgSend type from the bank module
import { MsgSend } from '@she-js/cosmos/types/cosmos/bank/v1beta1';

// Create an object that conforms to the MsgSend type
const msgSend: MsgSend = {
  from_address: 'she1hafptm4zxy5nw8rd2pxyg83c5ls2v62tstzuv2',
  to_address: 'she1v6459sl87jyfkvzmy6y8a6j2fj8k5r6x2n2l9',
  amount: [{ denom: 'ushe', amount: '100' }]
};
```

#### Ex.) TokenFactory Tx Msg's
```typescript
// Import the MsgCreateDenom and MsgMint types from tokenfactory module
import type { MsgCreateDenom, MsgMint } from "@she-js/cosmos/types/tokenfactory";

// Create an object that conforms to the MsgCreateDenom type
const msgCreateDenom: MsgCreateDenom = {
  sender: accounts[0].address,
  subdenom: "mytoken",
  allow_list: {
    addresses: ["she123..."],
  }
}

// Create an object that conforms to the MsgMint type
const msgMint: MsgMint = {
  sender: accounts[0].address,
  amount: { denom: "ushe", amount: "100000" },
}

// Do what you want with the messages
```

## `@she-js/cosmos/encoding`

The @she-js/cosmos/encoding package provides utilities for encoding/decoding She transactions using Protobuf. It also includes amino converters and a type URL registry for gRPC and legacy Cosmos SDK interactions.

> **gRPC interface only**: This package is meant for usage with gRPC interfaces. For REST interfaces, use `@she-js/cosmos/rest`.

### Features

- Protobuf encoding/decoding for all She native transactions and queries
- Aggregated message typeUrl registry for usage `@cosmjs/stargate` clients
- Amino message converters for use with Ledger or legacy Cosmos signing
- Uses official types from `@she-js/cosmos/types`


### Importing
```typescript
// Import Encoder, then follow the path to the desired module
import { Encoder } from '@she-js/cosmos/encoding';

// Import Amino converters for legacy Cosmos SDK support
import { aminoConverters } from "@she-js/cosmos/encoding";

// Import typeUrl registry for cosmjs Stargate clients
import { sheProtoRegistry } from "@she-js/cosmos/encoding";
```

### Encoding/Decoding and getting type URLs.
Cosmos gRPC transactions are encoded using protobuf. This library exports encoding and decoding classes for all valid She Msg types.

```typescript
import { Encoder } from '@she-js/cosmos/encoding';

// Follow the path to the desired module and message type
const msgSend = Encoder.cosmos.bank.v1beta1.MsgSend.fromPartial({
  from_address: 'she1hafptm4zxy5nw8rd2pxyg83c5ls2v62tstzuv2',
  to_address: 'she1v6459sl87jyfkvzmy6y8a6j2fj8k5r6x2n2l9',
  amount: [{ denom: 'ushe', amount: '100' }]
});


// Or use @she-js/cosmos/types to create the message, see below.

// Encode the message
const encoded = Encoder.cosmos.bank.v1beta1.MsgSend.encode(msgSend).finish();

// Or if you have an encoded message, you can decode it
const decoded = Encoder.cosmos.bank.v1beta1.MsgSend.decode(encoded);

// Create the proto message using the typeUrl and encoded message
const protoMsgSend = { typeUrl: `/${MsgSend.$type}`, value: encoded };
```

### Usage with @cosmjs/stargate

The package provides pre-built registries and amino converters for usage with `@cosmjs/stargate`. These can be used to set up Stargate clients to sign and broadcast She transactions.

> Check out the [@she-js/cosmjs](https://www.npmjs.com/package/@she-js/cosmjs) package for pre-built clients and helpful configs when using @cosmjs.

```typescript
import { Encoder } from '@she-js/cosmos/encoding';
import { sheProtoRegistry } from "@she-js/cosmos/encoding";
import { aminoConverters } from "@she-js/cosmos/encoding";

import {SigningStargateClient} from "@cosmjs/stargate";
import {Registry} from "@cosmjs/proto-signing";

// or any other way to get an offline signer
const offlineSigner = await window.compass.getOfflineSigner("arctic-1");
const accounts = await offlineSigner.getAccounts();

// Create a @cosmjs/stargate registry with the She proto registry
const registry = new Registry(sheProtoRegistry);
const aminoTypes = new AminoTypes(aminoConverters);

// Create a Stargate client with the registry and amino types
const stargateClient = await SigningStargateClient.connectWithSigner(
  "https://rpc-arctic-1.she-apis.com",
  offlineSigner,
  {
    aminoTypes: new AminoTypes(aminoConverters),
    registry: new Registry(sheProtoRegistry),
  },
);

// Create a MsgSend object
const msgSend = Encoder.cosmos.bank.v1beta1.MsgSend.fromPartial({
  from_address: accounts[0].address,
  to_address: "she1v6459sl87jyfkvzmy6y8a6j2fj8k5r6x2n2l9",
  amount: [{ denom: "ushe", amount: "10" }]
});

// Create a message object with the typeUrl and value. (For Stargate clients the value isn't encoded, but gRPC clients typically require it to be encoded)
const message = { typeUrl: `/${Encoder.cosmos.bank.v1beta1.MsgSend.$type}`, value: msgSend };

  
const txResponse = await stargateClient.signAndBroadcast(accounts[0].address, [message], {
  amount: [{ denom: "ushe", amount: "100000" }],
  gas: "200000",
});

console.log(txResponse.transactionHash);
```

### Interoperability with @she-js/cosmos/types

The `@she-js/cosmos/encoding` package is built to work seamlessly with the `@she-js/cosmos/types` package. You can use the types from `@she-js/cosmos/types` directly if needed. However, in most cases, you don't need to import `@she-js/cosmos/types` separately when using `@she-js/cosmos/encoding`, as the values returned from the encoding functions are already typed correctly.

#### Recommended: Using @she-js/cosmos/encoding
```typescript
import { Encoder } from '@she-js/cosmos/encoding';

// Encoder.cosmos.bank.v1beta1.MsgSend is already typed using the `MsgSend` type from the @she-js/cosmos/types package
const msgSend = Encoder.cosmos.bank.v1beta1.MsgSend.fromPartial({
  from_address: 'she1hafptm4zxy5nw8rd2pxyg83c5ls2v62tstzuv2',
  to_address: 'she1v6459sl87jyfkvzmy6y8a6j2fj8k5r6x2n2l9'
});

// Encode the message
const encoded = Encoder.cosmos.bank.v1beta1.MsgSend.encode(msgSend).finish();

// Or if you have an encoded message, you can decode it
const decoded = Encoder.cosmos.bank.v1beta1.MsgSend.decode(encoded);

// Create the proto message using the typeUrl and encoded message
const protoMsgSend = { typeUrl: `/${MsgSend.$type}`, value: encoded };
```

#### Optional: Using @she-js/cosmos/types directly
```typescript
import { MsgSend } from '@she-js/cosmos/types/cosmos/bank/v1beta1';

// This type can be used to create the proto message directly
const msgSend: MsgSend = {
  from_address: 'she1hafptm4zxy5nw8rd2pxyg83c5ls2v62tstzuv2',
  to_address: 'she1v6459sl87jyfkvzmy6y8a6j2fj8k5r6x2n2l9',
  amount: [{ denom: 'ushe', amount: '100' }]
};

// Encode the message
const encoded = Encoder.cosmos.bank.v1beta1.MsgSend.encode(msgSend).finish();

// Or if you have an encoded message, you can decode it
const decoded = Encoder.cosmos.bank.v1beta1.MsgSend.decode(encoded);

// Create the proto message using the typeUrl and encoded message
const protoMsgSend = { typeUrl: `/${MsgSend.$type}`, value: encoded };
```

### Usage with Ledger
```typescript
import {createTransportAndApp, SheLedgerOfflineAminoSigner} from "@she-js/ledger";

import { Encoder } from '@she-js/cosmos/encoding';

import { aminoConverters } from "@she-js/cosmos/encoding";

import { AminoTypes, SigningStargateClient, coin } from "@cosmjs/stargate";

const hdPath = "m/44'/60'/0'/0/0"
const validatorAddress = "shevaloper1r0tmhjhxmvwlzq5sy3z83qnyvc74uvs9ykek9l";

const { app } = await createTransportAndApp();

const cosmosAddressData = await app.getCosmosAddress(hdPath, false);

const ledgerOfflineAminoSigner = new SheLedgerOfflineAminoSigner(app, hdPath);
const aminoTypes = new AminoTypes(aminoConverters);
const signingStargateClient = await SigningStargateClient.connectWithSigner(
  rpcUrl,
  ledgerOfflineAminoSigner,
  { aminoTypes },
);

const fee = {
  amount: [{denom: "ushe", amount: "20000"}],
  gas: "200000",
};

const msgDelegate = Encoder.cosmos.staking.v1beta1.MsgDelegate.fromPartial({
  delegator_address: cosmosAddressData.address,
  validator_address: validatorAddress,
  amount: coin(2000, "ushe"),
});

const protoMessage = { typeUrl: `/${Encoder.cosmos.staking.v1beta1.MsgDelegate.$type}`, value: msgDelegate };

// This will automatically get converted to the correct amino type due to the aminoTypes registry passed to the SigningStargateClient
const result = await signingStargateClient.signAndBroadcast(cosmosAddressData.address, [protoMessage], fee, memo)

if (result.code === 0) {
  console.log("Transaction broadcast successfully:", result);
} else {
  console.error("Error broadcasting transaction:", result.rawLog);
}
```

### CosmJS Amino Converters and Registry Types
`@she-js/cosmos/encoding/amino` `@she-js/cosmos/encoding/registry` and export the necessary types and converters for usage with `@cosmjs/stargate`. These are used to set up the amino registry and types for signing clients.

```typescript
import { aminoConverters, sheProtoRegistry } from "@she-js/cosmos/encoding";
import { AminoTypes, SigningStargateClient } from "@cosmjs/stargate";
import { Registry } from "@cosmjs/proto-signing";

const offlineSigner = await window.compass.getOfflineSigner

const signingStargateClient = await SigningStargateClient.connectWithSigner(
  "https://rpc-arctic-1.she-apis.com",
  offlineSigner,
  {
    aminoTypes: new AminoTypes(aminoConverters),
    registry: new Registry(sheProtoRegistry),
  },
);
```

## `@she-js/cosmos/rest`

Provides a REST client for all She REST endpoints. It uses types from `@she-js/cosmos/types` for easy use across your stack.

> **Looking for REST endpoints?**: You can view the full list of available REST endpoints in the [She Cosmos REST docs](https://www.docs.she.io/endpoints/cosmos) if you prefer to manually make a call using fetch or another request library.


### Example Usage
Import the Querier and follow the path to the desired module and message type. Request and response types are automatically typed using `@she-js/cosmos/types`.

#### Ex.) Querying user balances
```typescript
import { Querier } from '@she-js/cosmos/rest';

// Follow the path to the desired module and message type
const { balances } = await Querier.cosmos.bank.v1beta1.AllBalances({ address: sheAddress }, { pathPrefix: chainConfig.restUrl });
```

## Local Package Development

### Pre-requisites
- Buf installed on your machine. https://buf.build/docs/installation

This package is generated using buf.build. To regenerate the types, run `yarn generate` which builds the types from proto files with the buf build `ts-proto` and `protoc-gen-grpc-gateway-ts` plugins. From there, typescript is used in a postprocessing script to extract the necessary types and perform any formatting required.

### Regenerating Packages
To regenerate the packages, run `yarn generate`. This will rebuild the libraries using the scripts in this repo.
