import axios, { AxiosInstance } from 'axios';
import {
  DashPayConfig,
  TransactionParams,
  TransactionResult,
  AccountInfo,
  ProgramInstruction,
} from '../types';
import { NetworkError, TransactionError, ValidationError } from '../utils/errors';
import { isValidAddress, isValidAmount } from '../utils/validation';
import { ProofGenerator } from '../proof';
import { SwapRouter } from '../swap';

/**
 * Main client for interacting with the DashPay system
 */
export class DashPayClient {
  private client: AxiosInstance;
  private config: DashPayConfig;
  public proofGenerator: ProofGenerator;
  public swapRouter: SwapRouter;

  constructor(config: DashPayConfig) {
    this.validateConfig(config);
    this.config = {
      ...config,
      network: config.network || 'mainnet',
      timeout: config.timeout || 30000,
    };

    this.client = axios.create({
      baseURL: config.rpcEndpoint,
      timeout: this.config.timeout,
      headers: {
        'Content-Type': 'application/json',
        ...(config.apiKey && { 'X-API-Key': config.apiKey }),
      },
    });

    this.proofGenerator = new ProofGenerator();
    this.swapRouter = new SwapRouter(config.rpcEndpoint, this.config.timeout);
  }

  /**
   * Get account information
   */
  async getAccount(address: string): Promise<AccountInfo> {
    if (!isValidAddress(address)) {
      throw new ValidationError('Invalid address');
    }

    try {
      // Simulate account fetch
      return {
        address,
        balance: '1000000000', // 1 billion units
        nonce: 0,
        initialized: true,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new NetworkError('Failed to fetch account', {
          message: error.message,
          status: error.response?.status,
        });
      }
      throw new NetworkError('Failed to fetch account', error);
    }
  }

  /**
   * Send a transaction
   */
  async sendTransaction(params: TransactionParams): Promise<TransactionResult> {
    this.validateTransactionParams(params);

    try {
      // Simulate transaction submission
      const signature = this.generateSignature();

      return {
        signature,
        status: 'pending',
        timestamp: Date.now(),
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new TransactionError('Failed to send transaction', {
          message: error.message,
          status: error.response?.status,
        });
      }
      throw new TransactionError('Failed to send transaction', error);
    }
  }

  /**
   * Get transaction status
   */
  async getTransaction(signature: string): Promise<TransactionResult> {
    if (!signature) {
      throw new ValidationError('Invalid transaction signature');
    }

    try {
      // Simulate transaction fetch
      return {
        signature,
        status: 'confirmed',
        blockHeight: 1000000,
        timestamp: Date.now() - 10000,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new NetworkError('Failed to fetch transaction', {
          message: error.message,
          status: error.response?.status,
        });
      }
      throw new NetworkError('Failed to fetch transaction', error);
    }
  }

  /**
   * Execute a program instruction
   */
  async executeInstruction(instruction: ProgramInstruction): Promise<TransactionResult> {
    if (!instruction || !instruction.programId) {
      throw new ValidationError('Invalid program instruction');
    }

    if (!isValidAddress(instruction.programId)) {
      throw new ValidationError('Invalid program ID');
    }

    try {
      // Simulate instruction execution
      const signature = this.generateSignature();

      return {
        signature,
        status: 'pending',
        timestamp: Date.now(),
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new TransactionError('Failed to execute instruction', {
          message: error.message,
          status: error.response?.status,
        });
      }
      throw new TransactionError('Failed to execute instruction', error);
    }
  }

  /**
   * Execute multiple program instructions in a single transaction
   */
  async executeInstructions(
    instructions: ProgramInstruction[]
  ): Promise<TransactionResult> {
    if (!instructions || instructions.length === 0) {
      throw new ValidationError('No instructions provided');
    }

    for (const instruction of instructions) {
      if (!instruction || !instruction.programId) {
        throw new ValidationError('Invalid program instruction');
      }
      if (!isValidAddress(instruction.programId)) {
        throw new ValidationError('Invalid program ID in instruction');
      }
    }

    try {
      // Simulate batch execution
      const signature = this.generateSignature();

      return {
        signature,
        status: 'pending',
        timestamp: Date.now(),
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new TransactionError('Failed to execute instructions', {
          message: error.message,
          status: error.response?.status,
        });
      }
      throw new TransactionError('Failed to execute instructions', error);
    }
  }

  /**
   * Get current block height
   */
  async getBlockHeight(): Promise<number> {
    try {
      // Simulate block height fetch
      return 1000000;
    } catch (error) {
      throw new NetworkError('Failed to fetch block height', error);
    }
  }

  /**
   * Get network status
   */
  async getNetworkStatus(): Promise<{
    network: string;
    blockHeight: number;
    isHealthy: boolean;
  }> {
    try {
      // Simulate network status check
      return {
        network: this.config.network || 'mainnet',
        blockHeight: await this.getBlockHeight(),
        isHealthy: true,
      };
    } catch (error) {
      throw new NetworkError('Failed to fetch network status', error);
    }
  }

  /**
   * Validate configuration
   */
  private validateConfig(config: DashPayConfig): void {
    if (!config || !config.rpcEndpoint) {
      throw new ValidationError('RPC endpoint is required');
    }
    if (typeof config.rpcEndpoint !== 'string') {
      throw new ValidationError('RPC endpoint must be a string');
    }
  }

  /**
   * Validate transaction parameters
   */
  private validateTransactionParams(params: TransactionParams): void {
    if (!isValidAddress(params.recipient)) {
      throw new ValidationError('Invalid recipient address');
    }
    if (!isValidAmount(params.amount)) {
      throw new ValidationError('Invalid amount');
    }
    if (params.fee && !isValidAmount(params.fee)) {
      throw new ValidationError('Invalid fee amount');
    }
  }

  /**
   * Generate transaction signature
   */
  private generateSignature(): string {
    return Array.from({ length: 64 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join('');
  }
}
