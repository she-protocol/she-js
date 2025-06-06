# @she-js/cosmjs

## 1.0.11

### Patch Changes

- ed08243: Replace @she-js/proto with @she-js/cosmos for cosmjs amino and registries used in the StargateSigningClient
- Updated dependencies [f259f6c]
  - @she-js/cosmos@1.0.5

## 1.0.10

### Patch Changes

- cd65a51: Fix broken NPM publish for all packages

## 1.0.9

### Patch Changes

- d6e74ed: Update package structure and building of all @she-js packages

## 1.0.8

### Patch Changes

- f4c47e0: Updated README
- 5edb30b: Adds a helper function for deriving an address from a given private key

## 1.0.7

### Patch Changes

- a8eb844: Temporary update (downgrade) the proto files to match the proto files in the she-cosmos-sdk fork to fix broken queries
- Updated dependencies [a8eb844]
  - @she-js/proto@4.0.8

## 1.0.6

### Patch Changes

- ecc4007: Cosmjs Query Clients: Added default poll timeout interval, allow passing HttpEndpoint to getting signing CosmJS clients

## 1.0.5

### Patch Changes

- 1e05604: Fixed broken import from @she-js/proto

## 1.0.4

### Patch Changes

- de2da4b: Removed the path alias from @she-js/proto for types in favor of static path
- Updated dependencies [de2da4b]
  - @she-js/proto@4.0.5

## 1.0.3

### Patch Changes

- ed4940b: Updated dependencies to fix proto issue
- Updated dependencies [a37f7a8]
  - @she-js/proto@4.0.4

## 1.0.2

### Patch Changes

- f91e176: Replaced babel with tsc for building

## 1.0.1

### Patch Changes

- b780906: Release of She v2 packages which splits the old libraries into @she-js/evm and @she-js/cosmjs. Additionally this release updates the proto package to use newer packages and improves it's exports.
