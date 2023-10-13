/**
 * A semaphore to control concurrency.
 */
class Semaphore {
  /**
   * The maximum allowed concurrency level.
   */
  maxConcurrency: number;

  /**
   * The current active concurrency.
   */
  currentConcurrency = 0;

  /**
   * A queue to store pending tasks.
   */
  queue: (() => void)[] = [];

  /**
   * Creates a new Semaphore with a maximum concurrency level.
   * @param {number} maxConcurrency The maximum allowed concurrency level.
   */
  constructor(maxConcurrency: number) {
    this.maxConcurrency = maxConcurrency; // Maximum allowed concurrency
    this.currentConcurrency = 0; // Current active concurrency
    this.queue = []; // Queue to store pending tasks
  }

  /**
   * Asynchronously acquire a semaphore slot.
   * @returns {Promise<void>} A promise that resolves when a slot becomes available.
   */
  async acquire(): Promise<void> {
    return new Promise(resolve => {
      if (this.currentConcurrency < this.maxConcurrency) {
        this.currentConcurrency += 1; // Increment active concurrency
        resolve(); // Resolve the promise immediately
      } else {
        this.queue.push(resolve); // Queue the promise if max concurrency is reached
      }
    });
  }

  /**
   * Release a semaphore slot.
   */
  release(): void {
    if (this.queue.length > 0) {
      const resolve = this.queue.shift(); // Dequeue and resolve a pending task
      resolve?.();
    } else {
      this.currentConcurrency -= 1; // Reduce active concurrency if no pending tasks
    }
  }
}

/**
 * Create a rate-limited version of an async function.
 * @param {Function} asyncFunction The async function to be rate-limited.
 * @param {number} rate The maximum number of concurrent executions of the function.
 * @returns {Function} A rate-limited version of the async function.
 */
export default function rateLimit(
  asyncFunction: (...args: any[]) => Promise<any>,
  rate: number
): (...args: any[]) => Promise<any> {
  const semaphore = new Semaphore(rate); // Create a semaphore with the specified rate

  /**
   * Async function to manage concurrency based on the semaphore.
   * @param {...any} args The arguments to be passed to the async function.
   * @returns {Promise<any>} A promise that resolves to the result of the async function.
   */
  return async function process(...args: any[]): Promise<any> {
    await semaphore.acquire(); // Acquire a semaphore slot
    try {
      return await asyncFunction(...args); // Execute the async function
    } finally {
      semaphore.release(); // Release the semaphore slot when done
    }
  };
}
