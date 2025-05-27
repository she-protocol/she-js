<div align="center">
<img src="https://raw.githubusercontent.com/cosmos/chain-registry/master/she/images/she.png" alt="SHE Logo" width="200">
<h1 style="margin: 0">@she-js</h1>
</div>

<br><br>

**@she-js** is a collection of TypeScript libraries and CLI's designed to streamline development on She. Whether you're building decentralized applications, writing a smart contract, or working with protocol buffers, **@she-js** has you covered.

## Packages

| Package                                                           | Description                                                                                                                                                                                                                                                                                                                                  |
|-------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [evm](/@she-js/docs/modules/evm.html)                             | The `/evm` package provides utilities, functions, wrappers, and configurations for seamless interaction with She via the Ethereum Virtual Machine (EVM). If you're building smart contracts or integrating She with Ethereum-based tooling, or interacting with EVM contacts like ERC20 tokens this package contains all the configs needed. |
| [create-she](/@she-js/docs/modules/create-she.html)               | The `/create-she` package provides a CLI to quickly spin up She frontend dApps.                                                                                                                                                                                                                                                              |
| [cosmjs](/@she-js/docs/modules/cosmjs.html)                       | The `/cosmjs` package offers similar functionality to the `/evm` package but tailored for interactions with She via the Cosmos interfaces. It includes utilities, functions, wrappers, and configurations specifically designed for CosmWasm and Rust development.                                                                           |
| [cosmos](/@she-js/docs/modules/cosmos.html)                       | The `/cosmos` package contains REST client libraries, proto encoding helpers, and types generated using the official She protocol buffers. If you're working with She's protocol buffer definitions or building clients for She services, this package will be invaluable.                                                                   |
| [registry](/@she-js/docs/modules/registry.html)                   | The `/registry` package contains exports data from the [She chain-registry](https://github.com/she-protocol/chain-registry) and the [community asset list](https://github.com/she-protocol/she-assetlist) as constants in typescript.                                                                                                    |
| [ledger](/@she-js/docs/modules/ledger.html)                       | The `/ledger` package contains helpful configs and functions for connection to She using a Ledger device.                                                                                                                                                                                                                                    |
| [she-global-wallet](/@she-js/docs/modules/she-global-wallet.html) | The `/she-global-wallet` library contains exports for using the "She Global Wallet" which is an EIP-6963-compatible wallet for libraries like RainbowKit, WalletConnect, Dynamic itself and others                                                                                                                                           |

## Resources

- [She Documentation](https://docs.she.io)
- [She Developers Hub](https://www.she.io/developers)

Feel free to explore each package for detailed documentation and examples. We're excited to see what you build on She!
