# @she-js/registry
This package contains TypeScript typed exports for the She registry repository as well as the community asset-list repository.

## Installation
```bash
yarn add @she-js/registry
```

## Usage
```typescript
import { TOKEN_LIST, NETWORKS, IBC_INFO, GAS_INFO } from '@she-js/registry'

const uAtom = TOKEN_LIST.find(asset => asset.denom === 'uatom')
```
