# SheJS

SheJS is a monorepo that contains multiple NPM libraries for writing applications that interact with She.

## Documentation

Please check [our documentation](https://docs.she.io) for notes on how to get up and running. The tutorial has examples on how to connect to a She wallet, query an RPC endpoint, transfer tokens, IBC transfer, and interact with contracts.

You can also refer to the [typedoc documentation](https://she-protocol.github.io/she-js/) for reference on the contents of the @she-js/core and @she-js/react library.


## Packages

SheJS consists of smaller NPM packages within the @she-js namespace. For more detailed documentation on each package, please refer to the table below.

| Package                                                 | Description                                                                                                                     |
|---------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------|
| [@she-js/evm](packages/evm)                             | Typescript library containing helper functions for interacting with the EVM on She.                                             |
| [@she-js/create-she](packages/create-she)               | CLI Tool used to quickly spin up She Projects and dApps in either the cosmos or EVM ecosystem                                   |
| [@she-js/she-global-wallet](packages/she-global-wallet) | A global wallet conforming to EIP-6963 allowing for AA across dApps.                                                            |
| [@she-js/cosmjs](packages/cosmjs)                       | TypeScript library containing helper functions for wallet connection, transaction signing, and RPC querying using cosmjs.       |
| [@she-js/cosmos](packages/cosmos)                       | TypeScript library for She protobuf encoding and decoding, a REST query client, and Typescript types for everything She Cosmos. |
| [@she-js/ledger](packages/ledger)                       | TypeScript library transacting on She using a Ledger device.                                                                    |

## Development
To build all packages and docs, run `yarn install` then `yarn build:all`

