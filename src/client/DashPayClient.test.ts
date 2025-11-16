import { DashPayClient } from './DashPayClient';
import { ValidationError } from '../utils/errors';

describe('DashPayClient', () => {
  let client: DashPayClient;

  beforeEach(() => {
    client = new DashPayClient({
      rpcEndpoint: 'https://api.test.com',
      network: 'testnet',
    });
  });

  describe('constructor', () => {
    it('should create client with valid config', () => {
      expect(client).toBeDefined();
      expect(client.proofGenerator).toBeDefined();
      expect(client.swapRouter).toBeDefined();
    });

    it('should throw error with invalid config', () => {
      expect(() => {
        new DashPayClient({} as any);
      }).toThrow(ValidationError);
    });
  });

  describe('getAccount', () => {
    it('should get account info', async () => {
      const address = 'a'.repeat(40);
      const account = await client.getAccount(address);
      
      expect(account).toBeDefined();
      expect(account.address).toBe(address);
      expect(account.balance).toBeDefined();
      expect(account.initialized).toBe(true);
    });

    it('should throw error with invalid address', async () => {
      await expect(client.getAccount('invalid')).rejects.toThrow(ValidationError);
    });
  });

  describe('sendTransaction', () => {
    it('should send transaction', async () => {
      const result = await client.sendTransaction({
        amount: '1000',
        recipient: 'a'.repeat(40),
        memo: 'test',
      });

      expect(result).toBeDefined();
      expect(result.signature).toBeDefined();
      expect(result.status).toBe('pending');
    });

    it('should throw error with invalid recipient', async () => {
      await expect(
        client.sendTransaction({
          amount: '1000',
          recipient: 'invalid',
        })
      ).rejects.toThrow(ValidationError);
    });

    it('should throw error with invalid amount', async () => {
      await expect(
        client.sendTransaction({
          amount: 'invalid',
          recipient: 'a'.repeat(40),
        })
      ).rejects.toThrow(ValidationError);
    });
  });

  describe('getTransaction', () => {
    it('should get transaction info', async () => {
      const signature = 'a'.repeat(64);
      const tx = await client.getTransaction(signature);

      expect(tx).toBeDefined();
      expect(tx.signature).toBe(signature);
      expect(tx.status).toBe('confirmed');
    });

    it('should throw error with empty signature', async () => {
      await expect(client.getTransaction('')).rejects.toThrow(ValidationError);
    });
  });

  describe('executeInstruction', () => {
    it('should execute program instruction', async () => {
      const result = await client.executeInstruction({
        programId: 'a'.repeat(40),
        data: Buffer.from('test'),
        accounts: [
          {
            pubkey: 'b'.repeat(40),
            isSigner: true,
            isWritable: true,
          },
        ],
      });

      expect(result).toBeDefined();
      expect(result.signature).toBeDefined();
      expect(result.status).toBe('pending');
    });

    it('should throw error with invalid program ID', async () => {
      await expect(
        client.executeInstruction({
          programId: 'invalid',
          data: Buffer.from('test'),
          accounts: [],
        })
      ).rejects.toThrow(ValidationError);
    });
  });

  describe('executeInstructions', () => {
    it('should execute multiple instructions', async () => {
      const instructions = [
        {
          programId: 'a'.repeat(40),
          data: Buffer.from('test1'),
          accounts: [],
        },
        {
          programId: 'b'.repeat(40),
          data: Buffer.from('test2'),
          accounts: [],
        },
      ];

      const result = await client.executeInstructions(instructions);

      expect(result).toBeDefined();
      expect(result.signature).toBeDefined();
    });

    it('should throw error with empty instructions', async () => {
      await expect(client.executeInstructions([])).rejects.toThrow(ValidationError);
    });
  });

  describe('getBlockHeight', () => {
    it('should get block height', async () => {
      const height = await client.getBlockHeight();
      expect(typeof height).toBe('number');
      expect(height).toBeGreaterThan(0);
    });
  });

  describe('getNetworkStatus', () => {
    it('should get network status', async () => {
      const status = await client.getNetworkStatus();
      
      expect(status).toBeDefined();
      expect(status.network).toBe('testnet');
      expect(status.blockHeight).toBeGreaterThan(0);
      expect(status.isHealthy).toBe(true);
    });
  });
});
