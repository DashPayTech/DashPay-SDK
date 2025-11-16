/**
 * Base error class for DashPay SDK errors
 */
export class DashPayError extends Error {
  public code: string;
  public details?: any;

  constructor(message: string, code: string, details?: any) {
    super(message);
    this.name = 'DashPayError';
    this.code = code;
    this.details = details;
    Object.setPrototypeOf(this, DashPayError.prototype);
  }
}

/**
 * Error thrown when validation fails
 */
export class ValidationError extends DashPayError {
  constructor(message: string, details?: any) {
    super(message, 'VALIDATION_ERROR', details);
    this.name = 'ValidationError';
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

/**
 * Error thrown when network request fails
 */
export class NetworkError extends DashPayError {
  constructor(message: string, details?: any) {
    super(message, 'NETWORK_ERROR', details);
    this.name = 'NetworkError';
    Object.setPrototypeOf(this, NetworkError.prototype);
  }
}

/**
 * Error thrown when transaction fails
 */
export class TransactionError extends DashPayError {
  constructor(message: string, details?: any) {
    super(message, 'TRANSACTION_ERROR', details);
    this.name = 'TransactionError';
    Object.setPrototypeOf(this, TransactionError.prototype);
  }
}

/**
 * Error thrown when proof generation/verification fails
 */
export class ProofError extends DashPayError {
  constructor(message: string, details?: any) {
    super(message, 'PROOF_ERROR', details);
    this.name = 'ProofError';
    Object.setPrototypeOf(this, ProofError.prototype);
  }
}

/**
 * Error thrown when swap routing fails
 */
export class SwapError extends DashPayError {
  constructor(message: string, details?: any) {
    super(message, 'SWAP_ERROR', details);
    this.name = 'SwapError';
    Object.setPrototypeOf(this, SwapError.prototype);
  }
}
