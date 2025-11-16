/**
 * Configuration options for the DashPay SDK client
 */
export interface DashPayConfig {
  /** The RPC endpoint URL for the DashPay network */
  rpcEndpoint: string;
  /** Optional API key for authenticated requests */
  apiKey?: string;
  /** Network environment (mainnet, testnet, devnet) */
  network?: 'mainnet' | 'testnet' | 'devnet';
  /** Request timeout in milliseconds */
  timeout?: number;
}

/**
 * Transaction parameters for program interactions
 */
export interface TransactionParams {
  /** Transaction amount in smallest unit */
  amount: string;
  /** Recipient address */
  recipient: string;
  /** Optional transaction memo */
  memo?: string;
  /** Optional fee amount */
  fee?: string;
}

/**
 * Result of a transaction submission
 */
export interface TransactionResult {
  /** Transaction signature/hash */
  signature: string;
  /** Transaction status */
  status: 'pending' | 'confirmed' | 'failed';
  /** Block height where transaction was included */
  blockHeight?: number;
  /** Timestamp of the transaction */
  timestamp: number;
}

/**
 * Account information
 */
export interface AccountInfo {
  /** Account address */
  address: string;
  /** Account balance in smallest unit */
  balance: string;
  /** Account nonce for transactions */
  nonce: number;
  /** Whether account is initialized */
  initialized: boolean;
}

/**
 * Program instruction parameters
 */
export interface ProgramInstruction {
  /** Program ID to interact with */
  programId: string;
  /** Instruction data */
  data: Buffer | Uint8Array;
  /** Accounts involved in the instruction */
  accounts: Array<{
    pubkey: string;
    isSigner: boolean;
    isWritable: boolean;
  }>;
}

/**
 * Proof generation parameters
 */
export interface ProofParams {
  /** Type of proof to generate */
  type: 'merkle' | 'zk-snark' | 'signature';
  /** Data to generate proof for */
  data: any;
  /** Optional witness data */
  witness?: any;
}

/**
 * Generated proof
 */
export interface Proof {
  /** Type of proof */
  type: string;
  /** Proof data */
  proof: string;
  /** Public inputs used in proof */
  publicInputs: string[];
  /** Timestamp of proof generation */
  timestamp: number;
  /** Whether proof is valid */
  isValid: boolean;
}

/**
 * Swap route parameters
 */
export interface SwapParams {
  /** Input token mint address */
  inputMint: string;
  /** Output token mint address */
  outputMint: string;
  /** Amount of input tokens */
  amount: string;
  /** Maximum slippage tolerance (in percentage) */
  slippageTolerance: number;
  /** User's wallet address */
  userAddress: string;
}

/**
 * Swap route information
 */
export interface SwapRoute {
  /** Route identifier */
  routeId: string;
  /** Input token amount */
  inputAmount: string;
  /** Expected output amount */
  outputAmount: string;
  /** Minimum output amount considering slippage */
  minimumOutputAmount: string;
  /** Price impact percentage */
  priceImpact: number;
  /** Array of pools used in the route */
  pools: Array<{
    poolId: string;
    tokenIn: string;
    tokenOut: string;
    fee: number;
  }>;
  /** Estimated fee */
  fee: string;
}

/**
 * Swap execution result
 */
export interface SwapResult {
  /** Transaction signature */
  signature: string;
  /** Actual input amount */
  inputAmount: string;
  /** Actual output amount */
  outputAmount: string;
  /** Status of the swap */
  status: 'success' | 'failed' | 'pending';
  /** Timestamp of swap execution */
  timestamp: number;
}

/**
 * Error response from API
 */
export interface ApiError {
  /** Error code */
  code: string;
  /** Error message */
  message: string;
  /** Additional error details */
  details?: any;
}
