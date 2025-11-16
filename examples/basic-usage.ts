/**
 * Basic usage examples for DashPay SDK
 * 
 * This file demonstrates the core functionality of the SDK
 */

import { DashPayClient } from '../src';

async function main() {
  // Initialize the client
  const client = new DashPayClient({
    rpcEndpoint: 'https://api.dashpay.example.com',
    network: 'testnet',
    apiKey: 'your-api-key-here', // optional
  });

  console.log('DashPay SDK Examples\n');

  // Example 1: Get account information
  console.log('1. Fetching account information...');
  const account = await client.getAccount('a'.repeat(40));
  console.log('   Address:', account.address);
  console.log('   Balance:', account.balance);
  console.log('   Initialized:', account.initialized);
  console.log('');

  // Example 2: Send a transaction
  console.log('2. Sending a transaction...');
  const txResult = await client.sendTransaction({
    amount: '1000000',
    recipient: 'b'.repeat(40),
    memo: 'Test payment',
  });
  console.log('   Transaction signature:', txResult.signature);
  console.log('   Status:', txResult.status);
  console.log('');

  // Example 3: Execute a program instruction
  console.log('3. Executing program instruction...');
  const instructionResult = await client.executeInstruction({
    programId: 'c'.repeat(40),
    data: Buffer.from('instruction-data'),
    accounts: [
      {
        pubkey: 'd'.repeat(40),
        isSigner: true,
        isWritable: true,
      },
    ],
  });
  console.log('   Instruction signature:', instructionResult.signature);
  console.log('');

  // Example 4: Generate a Merkle proof
  console.log('4. Generating Merkle proof...');
  const merkleProof = await client.proofGenerator.generateProof({
    type: 'merkle',
    data: { value: 'my-secret-data' },
    witness: {
      root: 'merkle-root-hash',
      path: ['hash1', 'hash2', 'hash3'],
    },
  });
  console.log('   Proof type:', merkleProof.type);
  console.log('   Proof valid:', merkleProof.isValid);
  console.log('   Public inputs:', merkleProof.publicInputs);
  console.log('');

  // Example 5: Verify a proof
  console.log('5. Verifying proof...');
  const isValid = await client.proofGenerator.verifyProof(merkleProof);
  console.log('   Proof verification result:', isValid);
  console.log('');

  // Example 6: Find swap route
  console.log('6. Finding swap route...');
  const route = await client.swapRouter.findRoute({
    inputMint: 'e'.repeat(40),
    outputMint: 'f'.repeat(40),
    amount: '1000000',
    slippageTolerance: 1.0, // 1%
    userAddress: '1'.repeat(40),
  });
  console.log('   Route ID:', route.routeId);
  console.log('   Input amount:', route.inputAmount);
  console.log('   Expected output:', route.outputAmount);
  console.log('   Price impact:', route.priceImpact.toFixed(2) + '%');
  console.log('   Number of pools:', route.pools.length);
  console.log('');

  // Example 7: Execute swap
  console.log('7. Executing swap...');
  const swapResult = await client.swapRouter.executeSwap(route);
  console.log('   Swap signature:', swapResult.signature);
  console.log('   Status:', swapResult.status);
  console.log('   Actual output:', swapResult.outputAmount);
  console.log('');

  // Example 8: Get network status
  console.log('8. Getting network status...');
  const status = await client.getNetworkStatus();
  console.log('   Network:', status.network);
  console.log('   Block height:', status.blockHeight);
  console.log('   Healthy:', status.isHealthy);
  console.log('');

  console.log('All examples completed successfully!');
}

// Run the examples
if (require.main === module) {
  main().catch((error) => {
    console.error('Error running examples:', error);
    process.exit(1);
  });
}

export default main;
