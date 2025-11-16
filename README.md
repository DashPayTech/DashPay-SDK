# DashPay SDK

A comprehensive SDK for interacting with the DashPay system. This SDK provides easy-to-use methods for program interactions, proof generation, and swap routing.

## Features

- 🔐 **Program Interactions**: Execute transactions and interact with on-chain programs
- 🔒 **Proof Generation**: Generate and verify cryptographic proofs (Merkle, zk-SNARK, signatures)
- 🔄 **Swap Routing**: Find optimal token swap routes and execute swaps
- 📦 **TypeScript Support**: Full TypeScript support with comprehensive type definitions
- ✅ **Error Handling**: Robust error handling with custom error types
- 🧪 **Well Tested**: Comprehensive test coverage

## Installation

```bash
npm install @dashpaytech/dashpay-sdk
```

## Quick Start

```typescript
import { DashPayClient } from '@dashpaytech/dashpay-sdk';

// Initialize the client
const client = new DashPayClient({
  rpcEndpoint: 'https://api.dashpay.example.com',
  network: 'mainnet',
  apiKey: 'your-api-key', // optional
});

// Get account information
const account = await client.getAccount('your-address');
console.log('Balance:', account.balance);

// Send a transaction
const result = await client.sendTransaction({
  amount: '1000000',
  recipient: 'recipient-address',
  memo: 'Payment for services',
});
console.log('Transaction signature:', result.signature);
```

## Usage Examples

### Program Interactions

```typescript
// Execute a program instruction
const instruction = {
  programId: 'program-address',
  data: Buffer.from('instruction-data'),
  accounts: [
    {
      pubkey: 'account-address',
      isSigner: true,
      isWritable: true,
    },
  ],
};

const result = await client.executeInstruction(instruction);
console.log('Instruction executed:', result.signature);

// Execute multiple instructions
const results = await client.executeInstructions([instruction1, instruction2]);
```

### Proof Generation

```typescript
// Generate a Merkle proof
const merkleProof = await client.proofGenerator.generateProof({
  type: 'merkle',
  data: { value: 'my-data' },
  witness: {
    root: 'merkle-root',
    path: ['hash1', 'hash2'],
  },
});

console.log('Proof generated:', merkleProof.proof);

// Verify a proof
const isValid = await client.proofGenerator.verifyProof(merkleProof);
console.log('Proof is valid:', isValid);

// Generate zk-SNARK proof
const zkProof = await client.proofGenerator.generateProof({
  type: 'zk-snark',
  data: { secret: 'my-secret' },
  witness: { commitment: 'commitment-value' },
});

// Generate signature proof
const sigProof = await client.proofGenerator.generateProof({
  type: 'signature',
  data: { message: 'sign this' },
  witness: { privateKey: 'private-key' },
});
```

### Swap Routing

```typescript
// Find the best swap route
const route = await client.swapRouter.findRoute({
  inputMint: 'token-a-address',
  outputMint: 'token-b-address',
  amount: '1000000',
  slippageTolerance: 1.0, // 1%
  userAddress: 'user-address',
});

console.log('Expected output:', route.outputAmount);
console.log('Price impact:', route.priceImpact);

// Find multiple routes
const routes = await client.swapRouter.findRoutes({
  inputMint: 'token-a-address',
  outputMint: 'token-b-address',
  amount: '1000000',
  slippageTolerance: 1.0,
  userAddress: 'user-address',
}, 3); // Get top 3 routes

// Execute a swap
const swapResult = await client.swapRouter.executeSwap(route);
console.log('Swap signature:', swapResult.signature);

// Check swap status
const status = await client.swapRouter.getSwapStatus(swapResult.signature);
console.log('Swap status:', status.status);
```

### Network Status

```typescript
// Get block height
const blockHeight = await client.getBlockHeight();
console.log('Current block:', blockHeight);

// Get network status
const status = await client.getNetworkStatus();
console.log('Network:', status.network);
console.log('Healthy:', status.isHealthy);

// Get transaction status
const tx = await client.getTransaction('transaction-signature');
console.log('Status:', tx.status);
console.log('Block:', tx.blockHeight);
```

## API Reference

### DashPayClient

Main client for interacting with the DashPay system.

#### Constructor

```typescript
new DashPayClient(config: DashPayConfig)
```

**Parameters:**
- `config.rpcEndpoint` (string): RPC endpoint URL
- `config.network` (string, optional): Network environment ('mainnet', 'testnet', 'devnet')
- `config.apiKey` (string, optional): API key for authenticated requests
- `config.timeout` (number, optional): Request timeout in milliseconds

#### Methods

- `getAccount(address: string): Promise<AccountInfo>`
- `sendTransaction(params: TransactionParams): Promise<TransactionResult>`
- `getTransaction(signature: string): Promise<TransactionResult>`
- `executeInstruction(instruction: ProgramInstruction): Promise<TransactionResult>`
- `executeInstructions(instructions: ProgramInstruction[]): Promise<TransactionResult>`
- `getBlockHeight(): Promise<number>`
- `getNetworkStatus(): Promise<NetworkStatus>`

### ProofGenerator

Handles cryptographic proof generation and verification.

#### Methods

- `generateProof(params: ProofParams): Promise<Proof>`
- `verifyProof(proof: Proof): Promise<boolean>`

**Supported Proof Types:**
- `merkle`: Merkle tree proofs
- `zk-snark`: Zero-knowledge succinct non-interactive argument of knowledge
- `signature`: Digital signature proofs

### SwapRouter

Handles token swap routing and execution.

#### Methods

- `findRoute(params: SwapParams): Promise<SwapRoute>`
- `findRoutes(params: SwapParams, limit?: number): Promise<SwapRoute[]>`
- `executeSwap(route: SwapRoute): Promise<SwapResult>`
- `getSwapStatus(signature: string): Promise<SwapResult>`

## Error Handling

The SDK provides custom error types for better error handling:

```typescript
import {
  DashPayError,
  ValidationError,
  NetworkError,
  TransactionError,
  ProofError,
  SwapError,
} from '@dashpaytech/dashpay-sdk';

try {
  await client.sendTransaction(params);
} catch (error) {
  if (error instanceof ValidationError) {
    console.error('Validation failed:', error.message);
  } else if (error instanceof NetworkError) {
    console.error('Network error:', error.message);
  } else if (error instanceof TransactionError) {
    console.error('Transaction failed:', error.message);
  }
}
```

## Development

### Building

```bash
npm install
npm run build
```

### Testing

```bash
npm test
```

### Linting

```bash
npm run lint
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues and questions, please open an issue on GitHub.